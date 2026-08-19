import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
import { prisma } from "@/lib/prisma";

export async function getServerSideProps() {
  const [events, students] = await Promise.all([
    prisma.event.findMany({ orderBy: { date: 'desc' }, include: { sport: true } }),
    prisma.student.findMany({ orderBy: { name: 'asc' } }),
  ]);
  
  return {
    props: {
      events: JSON.parse(JSON.stringify(events)),
      students: JSON.parse(JSON.stringify(students)),
    },
  };
}

export default function ResultsManagement({ events, students }: any) {
  const { data: session, status } = useSession({ required: true, onUnauthenticated() { router.push('/admin/login'); } });
  const router = useRouter();

  const [selectedEventId, setSelectedEventId] = useState("");
  const [participants, setParticipants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    studentId: "",
    status: "REGISTERED",
    placement: "",
    points: 0,
  });

  const fetchParticipants = async (eventId: string) => {
    if (!eventId) {
      setParticipants([]);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`/api/event-participants?eventId=${eventId}`);
      if (res.ok) {
        const data = await res.json();
        setParticipants(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants(selectedEventId);
  }, [selectedEventId]);

  const handleCreate = () => {
    setEditingParticipant(null);
    setFormData({ studentId: "", status: "REGISTERED", placement: "", points: 0 });
    setIsModalOpen(true);
  };

  const handleEdit = (participant: any) => {
    setEditingParticipant(participant);
    setFormData({
      studentId: participant.studentId,
      status: participant.status || "REGISTERED",
      placement: participant.placement || "",
      points: participant.points || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this result/participant? This will undo their points.")) return;
    try {
      const res = await fetch(`/api/event-participants?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchParticipants(selectedEventId);
      } else {
        alert("Failed to delete result");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = "/api/event-participants";
      const method = editingParticipant ? "PUT" : "POST";
      const body = editingParticipant 
        ? { id: editingParticipant.id, ...formData, eventId: selectedEventId, placement: formData.placement ? parseInt(formData.placement as string) : null, points: Number(formData.points) }
        : { ...formData, eventId: selectedEventId, placement: formData.placement ? parseInt(formData.placement as string) : null, points: Number(formData.points) };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchParticipants(selectedEventId);
      } else {
        const error = await res.json();
        alert(`Failed to save: ${error.error}`);
      }
    } catch (e) {
      console.error(e);
      alert("Error saving result");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading") {
    return <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">Loading...</div>;
  }

  const selectedEvent = events.find((e: any) => e.id === selectedEventId);

  return (
    <AdminLayout title="Results Management - Sports Command Center">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0D0E12]">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          
          <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">Results & Participants</h1>
              <p className="text-white/60 mt-1">Record match results and automatically update championship points.</p>
            </div>
            {selectedEventId && (
              <button 
                onClick={handleCreate}
                className="px-6 py-2 bg-[#D4AF37] text-black font-bold rounded-lg shadow-lg hover:bg-white transition-colors"
              >
                + Add Result
              </button>
            )}
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Selector */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              <div className="bg-[#1A1C23] border border-white/5 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-4">1. Select Event</h3>
                <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-2">
                  {events.map((event: any) => (
                    <button
                      key={event.id}
                      onClick={() => setSelectedEventId(event.id)}
                      className={`text-left p-4 rounded-xl border transition-all ${selectedEventId === event.id ? 'bg-[#D4AF37]/10 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'bg-black/20 border-white/5 hover:border-white/20'}`}
                    >
                      <div className="text-xs font-bold text-white/40 tracking-widest uppercase mb-1">{new Date(event.date).toLocaleDateString()}</div>
                      <div className={`font-bold ${selectedEventId === event.id ? 'text-[#D4AF37]' : 'text-white'}`}>{event.name}</div>
                      <div className="text-sm text-white/60 mt-1">{event.category || 'Open Category'}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="lg:col-span-2">
              <div className="bg-[#1A1C23] border border-white/5 rounded-2xl overflow-hidden shadow-xl min-h-[400px] flex flex-col">
                {!selectedEventId ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-white/30 p-12">
                    <span className="material-symbols-outlined text-6xl mb-4 opacity-50">emoji_events</span>
                    <p className="text-lg font-bold">Select an event to view or add results</p>
                  </div>
                ) : (
                  <>
                    <div className="p-6 border-b border-white/5 bg-black/20">
                      <div className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase mb-1">{selectedEvent?.sport?.name}</div>
                      <h2 className="text-2xl font-bold text-white">{selectedEvent?.name} Results</h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-black/40 text-[10px] font-bold tracking-widest text-white/50 uppercase border-b border-white/10">
                            <th className="py-4 px-6">Athlete</th>
                            <th className="py-4 px-6">Status</th>
                            <th className="py-4 px-6 text-center">Placement</th>
                            <th className="py-4 px-6 text-right">Points</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {isLoading ? (
                            <tr><td colSpan={5} className="py-12 text-center text-white/40">Loading participants...</td></tr>
                          ) : participants.length === 0 ? (
                            <tr><td colSpan={5} className="py-12 text-center text-white/40">No participants recorded yet.</td></tr>
                          ) : (
                            participants.map(p => (
                              <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                                <td className="py-4 px-6">
                                  <div className="font-bold text-white">{p.student?.name}</div>
                                  <div className="text-xs text-white/50 font-data-tabular">{p.student?.rollNumber}</div>
                                </td>
                                <td className="py-4 px-6">
                                  <span className={`text-xs px-2 py-1 rounded font-bold ${p.status === 'WINNER' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : p.status === 'PARTICIPATED' ? 'bg-blue-500/20 text-blue-400' : p.status === 'DISQUALIFIED' ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white/60'}`}>
                                    {p.status}
                                  </span>
                                </td>
                                <td className="py-4 px-6 text-center font-bold text-white">
                                  {p.placement ? `#${p.placement}` : '-'}
                                </td>
                                <td className="py-4 px-6 text-right font-data-tabular font-bold text-[#D4AF37]">
                                  {p.points > 0 ? `+${p.points}` : '0'}
                                </td>
                                <td className="py-4 px-6 text-right">
                                  <button onClick={() => handleEdit(p)} className="text-blue-400 hover:text-blue-300 text-sm font-bold mr-4">Edit</button>
                                  <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300 text-sm font-bold">Undo</button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1A1C23] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h2 className="text-xl font-bold text-white">{editingParticipant ? "Edit Result" : "Add Result"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white">✕</button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Athlete</label>
                <select 
                  required 
                  disabled={!!editingParticipant}
                  value={formData.studentId} 
                  onChange={e => setFormData({...formData, studentId: e.target.value})} 
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none disabled:opacity-50"
                >
                  <option value="">Select Athlete</option>
                  {students.map((s: any) => (
                    <option key={s.id} value={s.id}>{s.name} ({s.rollNumber})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Status</label>
                <select 
                  required 
                  value={formData.status} 
                  onChange={e => setFormData({...formData, status: e.target.value})} 
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="REGISTERED">Registered</option>
                  <option value="PARTICIPATED">Participated</option>
                  <option value="WINNER">Winner</option>
                  <option value="DISQUALIFIED">Disqualified</option>
                  <option value="WITHDRAWN">Withdrawn</option>
                  <option value="ABSENT">Absent</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Placement (Optional)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 1" 
                    value={formData.placement} 
                    onChange={e => setFormData({...formData, placement: e.target.value})} 
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Championship Points</label>
                  <input 
                    type="number" 
                    required
                    placeholder="0" 
                    value={formData.points} 
                    onChange={e => setFormData({...formData, points: parseFloat(e.target.value) || 0})} 
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none font-bold text-[#D4AF37]" 
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border border-white/20 rounded-lg text-white hover:bg-white/10 font-bold">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-6 py-2 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-white disabled:opacity-50">
                  {isSaving ? "Saving..." : "Save Result"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
