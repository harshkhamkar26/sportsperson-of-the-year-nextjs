import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
import { motion, AnimatePresence } from "framer-motion";

interface Event {
  id: string;
  name: string;
  date: string;
  sport: { name: string } | null;
  category: string | null;
  venue: string | null;
  startTime: string | null;
  endTime: string | null;
  status: string;
  broadcastUrl: string | null;
  thumbnail: string | null;
  commentary: string | null;
  broadcasts: { id: string; status: string }[];
}

interface Broadcast {
  id: string;
  title: string;
  description: string | null;
  streamUrl: string | null;
  thumbnail: string | null;
  status: string;
  startedAt: string | null;
  endedAt: string | null;
  viewerCount: number;
  chatEnabled: boolean;
  cheerEnabled: boolean;
  instagramGateEnabled: boolean;
  event: { id: string; name: string } | null;
}

export default function AdminEvents() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/admin/login");
    },
  });

  const [events, setEvents] = useState<Event[]>([]);
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingBroadcast, setEditingBroadcast] = useState<Broadcast | null>(null);
  const [eventForm, setEventForm] = useState<any>({});
  const [broadcastForm, setBroadcastForm] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [eventsRes, broadcastsRes] = await Promise.all([
        fetch("/api/events"),
        fetch("/api/broadcasts"),
      ]);
      const eventsData = await eventsRes.json();
      const broadcastsData = await broadcastsRes.json();
      setEvents(eventsData.data || []);
      setBroadcasts(broadcastsData.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingEvent ? "PUT" : "POST";
      const body = editingEvent ? { id: editingEvent.id, ...eventForm } : eventForm;

      const res = await fetch("/api/events", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setShowEventModal(false);
        setEditingEvent(null);
        setEventForm({});
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleBroadcastSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingBroadcast ? "PUT" : "POST";
      const body = editingBroadcast
        ? { id: editingBroadcast.id, ...broadcastForm }
        : broadcastForm;

      const res = await fetch("/api/broadcasts", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setShowBroadcastModal(false);
        setEditingBroadcast(null);
        setBroadcastForm({});
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Delete this event? This cannot be undone.")) return;
    await fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchData();
  };

  const handleDeleteBroadcast = async (id: string) => {
    if (!confirm("Delete this broadcast? This cannot be undone.")) return;
    await fetch("/api/broadcasts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchData();
  };

  const handleStatusChange = async (broadcastId: string, status: string) => {
    await fetch("/api/broadcasts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: broadcastId,
        status,
        startedAt: status === "LIVE" ? new Date().toISOString() : undefined,
        endedAt: status === "ENDED" ? new Date().toISOString() : undefined,
      }),
    });
    fetchData();
  };

  if (status === "loading") {
    return (
      <AdminLayout title="Events | Sports Command Center">
        <div className="flex items-center justify-center py-20 text-white/50">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Events | Sports Command Center">
      <div className="flex flex-col gap-8 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <h1 className="font-display text-4xl font-black uppercase text-white tracking-wide mb-2">
              Event Management
            </h1>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-white/40">
              Create, schedule, and manage live events and broadcasts
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setEditingEvent(null);
                setEventForm({});
                setShowEventModal(true);
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-black font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition-colors shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Event
            </button>
            <button
              onClick={() => {
                setEditingBroadcast(null);
                setBroadcastForm({});
                setShowBroadcastModal(true);
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#3B82F6] hover:bg-[#3B82F6]/80 text-white font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">live_tv</span>
              New Broadcast
            </button>
          </div>
        </div>

        {/* Events Table */}
        <div className="rounded-2xl border border-white/10 bg-[#111]/60 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="font-display text-xl font-bold uppercase text-white">
              Events ({events.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 font-sans text-[10px] uppercase tracking-widest text-white/40">
                  <th className="px-6 py-3">Event</th>
                  <th className="px-6 py-3">Sport</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Broadcast</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-display text-sm font-bold text-white">
                        {event.name}
                      </div>
                      <div className="font-sans text-xs text-white/40">
                        {event.category}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-sans text-sm text-white/70">
                        {event.sport?.name || "General"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-sans text-sm text-white/70">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-bold ${
                          event.status === "LIVE"
                            ? "bg-[#ef4444]/20 text-[#ef4444]"
                            : event.status === "ENDED"
                            ? "bg-white/10 text-white/50"
                            : "bg-[#3B82F6]/20 text-[#3B82F6]"
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {event.broadcasts && event.broadcasts.length > 0 ? (
                        <span className="font-sans text-xs text-white/70">
                          {event.broadcasts.length} broadcast
                          {event.broadcasts.length > 1 ? "es" : ""}
                        </span>
                      ) : (
                        <span className="font-sans text-xs text-white/40">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingEvent(event);
                            setEventForm({
                              name: event.name,
                              date: new Date(event.date).toISOString().split("T")[0],
                              sportId: event.sport ? "" : "",
                              category: event.category || "",
                              venue: event.venue || "",
                              startTime: event.startTime
                                ? new Date(event.startTime).toISOString().slice(0, 16)
                                : "",
                              endTime: event.endTime
                                ? new Date(event.endTime).toISOString().slice(0, 16)
                                : "",
                              status: event.status,
                              broadcastUrl: event.broadcastUrl || "",
                              thumbnail: event.thumbnail || "",
                              commentary: event.commentary || "",
                            });
                            setShowEventModal(true);
                          }}
                          className="p-2 rounded-md hover:bg-white/5 text-white/60 hover:text-white transition-colors"
                          title="Edit Event"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="p-2 rounded-md hover:bg-red-500/10 text-white/60 hover:text-red-400 transition-colors"
                          title="Delete Event"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Broadcasts Table */}
        <div className="rounded-2xl border border-white/10 bg-[#111]/60 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="font-display text-xl font-bold uppercase text-white">
              Broadcasts ({broadcasts.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 font-sans text-[10px] uppercase tracking-widest text-white/40">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Event</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Viewers</th>
                  <th className="px-6 py-3">Cheer</th>
                  <th className="px-6 py-3">IG Gate</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {broadcasts.map((broadcast) => (
                  <tr
                    key={broadcast.id}
                    className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-display text-sm font-bold text-white">
                        {broadcast.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-sans text-sm text-white/70">
                        {broadcast.event?.name || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={broadcast.status}
                        onChange={(e) =>
                          handleStatusChange(broadcast.id, e.target.value)
                        }
                        className="bg-black/40 border border-white/10 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50"
                      >
                        <option value="DRAFT">Draft</option>
                        <option value="SCHEDULED">Scheduled</option>
                        <option value="LIVE">Live</option>
                        <option value="PAUSED">Paused</option>
                        <option value="ENDED">Ended</option>
                        <option value="ARCHIVED">Archived</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-display text-lg font-bold text-[#60a5fa]">
                        {broadcast.viewerCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-sans text-xs ${
                          broadcast.cheerEnabled
                            ? "text-[#10B981]"
                            : "text-white/40"
                        }`}
                      >
                        {broadcast.cheerEnabled ? "ON" : "OFF"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-sans text-xs ${
                          broadcast.instagramGateEnabled
                            ? "text-[#833AB8]"
                            : "text-white/40"
                        }`}
                      >
                        {broadcast.instagramGateEnabled ? "ON" : "OFF"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingBroadcast(broadcast);
                            setBroadcastForm({
                              title: broadcast.title,
                              description: broadcast.description || "",
                              streamUrl: broadcast.streamUrl || "",
                              thumbnail: broadcast.thumbnail || "",
                              status: broadcast.status,
                              startedAt: broadcast.startedAt
                                ? new Date(broadcast.startedAt).toISOString().slice(0, 16)
                                : "",
                              endedAt: broadcast.endedAt
                                ? new Date(broadcast.endedAt).toISOString().slice(0, 16)
                                : "",
                              chatEnabled: broadcast.chatEnabled,
                              cheerEnabled: broadcast.cheerEnabled,
                              instagramGateEnabled: broadcast.instagramGateEnabled,
                              eventId: broadcast.event?.id || "",
                            });
                            setShowBroadcastModal(true);
                          }}
                          className="p-2 rounded-md hover:bg-white/5 text-white/60 hover:text-white transition-colors"
                          title="Edit Broadcast"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteBroadcast(broadcast.id)}
                          className="p-2 rounded-md hover:bg-red-500/10 text-white/60 hover:text-red-400 transition-colors"
                          title="Delete Broadcast"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {showEventModal && (
          <EventModal
            editingEvent={editingEvent}
            eventForm={eventForm}
            setEventForm={setEventForm}
            onSubmit={handleEventSubmit}
            onClose={() => {
              setShowEventModal(false);
              setEditingEvent(null);
              setEventForm({});
            }}
          />
        )}
      </AnimatePresence>

      {/* Broadcast Modal */}
      <AnimatePresence>
        {showBroadcastModal && (
          <BroadcastModal
            editingBroadcast={editingBroadcast}
            broadcastForm={broadcastForm}
            setBroadcastForm={setBroadcastForm}
            events={events}
            onSubmit={handleBroadcastSubmit}
            onClose={() => {
              setShowBroadcastModal(false);
              setEditingBroadcast(null);
              setBroadcastForm({});
            }}
          />
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}

// Event Modal
function EventModal({
  editingEvent,
  eventForm,
  setEventForm,
  onSubmit,
  onClose,
}: {
  editingEvent: Event | null;
  eventForm: any;
  setEventForm: (form: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#111] border border-white/10 rounded-2xl max-w-2xl w-full mx-4 p-8 max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <h2 className="font-display text-2xl font-black uppercase text-white mb-6">
          {editingEvent ? "Edit Event" : "New Event"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-white/40">
              Event Name
            </label>
            <input
              type="text"
              required
              value={eventForm.name || ""}
              onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50"
            />
          </div>
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-white/40">
              Date
            </label>
            <input
              type="date"
              required
              value={eventForm.date || ""}
              onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50"
            />
          </div>
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-white/40">
              Category
            </label>
            <input
              type="text"
              value={eventForm.category || ""}
              onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50"
              placeholder="e.g. Men's Singles"
            />
          </div>
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-white/40">
              Venue
            </label>
            <input
              type="text"
              value={eventForm.venue || ""}
              onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50"
            />
          </div>
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-white/40">
              Status
            </label>
            <select
              value={eventForm.status || "DRAFT"}
              onChange={(e) => setEventForm({ ...eventForm, status: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50"
            >
              <option value="DRAFT">Draft</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="LIVE">Live</option>
              <option value="ENDED">Ended</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 font-sans text-xs font-bold uppercase text-white/50 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#D4AF37] text-black font-sans text-xs font-bold uppercase rounded-xl hover:bg-[#D4AF37]/80 transition-colors"
            >
              {editingEvent ? "Update" : "Create"} Event
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// Broadcast Modal
function BroadcastModal({
  editingBroadcast,
  broadcastForm,
  setBroadcastForm,
  events,
  onSubmit,
  onClose,
}: {
  editingBroadcast: Broadcast | null;
  broadcastForm: any;
  setBroadcastForm: (form: any) => void;
  events: Event[];
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#111] border border-white/10 rounded-2xl max-w-2xl w-full mx-4 p-8 max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <h2 className="font-display text-2xl font-black uppercase text-white mb-6">
          {editingBroadcast ? "Edit Broadcast" : "New Broadcast"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-white/40">
              Title
            </label>
            <input
              type="text"
              required
              value={broadcastForm.title || ""}
              onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50"
            />
          </div>
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-white/40">
              Description
            </label>
            <textarea
              value={broadcastForm.description || ""}
              onChange={(e) => setBroadcastForm({ ...broadcastForm, description: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50"
              rows={3}
            />
          </div>
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-white/40">
              Stream URL (HLS / Embed)
            </label>
            <input
              type="url"
              value={broadcastForm.streamUrl || ""}
              onChange={(e) => setBroadcastForm({ ...broadcastForm, streamUrl: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50"
              placeholder="https://iframe.videodelivery.com/..."
            />
          </div>
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-white/40">
              Event
            </label>
            <select
              value={broadcastForm.eventId || ""}
              onChange={(e) => setBroadcastForm({ ...broadcastForm, eventId: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50"
            >
              <option value="">None</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-white/40">
              Status
            </label>
            <select
              value={broadcastForm.status || "DRAFT"}
              onChange={(e) => setBroadcastForm({ ...broadcastForm, status: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50"
            >
              <option value="DRAFT">Draft</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="LIVE">Live</option>
              <option value="PAUSED">Paused</option>
              <option value="ENDED">Ended</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-sans text-xs uppercase tracking-widest text-white/40">
                Chat Enabled
              </label>
              <select
                value={broadcastForm.chatEnabled ? "true" : "false"}
                onChange={(e) =>
                  setBroadcastForm({ ...broadcastForm, chatEnabled: e.target.value === "true" })
                }
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="font-sans text-xs uppercase tracking-widest text-white/40">
                Cheer Enabled
              </label>
              <select
                value={broadcastForm.cheerEnabled ? "true" : "false"}
                onChange={(e) =>
                  setBroadcastForm({ ...broadcastForm, cheerEnabled: e.target.value === "true" })
                }
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-white/40">
              Instagram Gate
            </label>
            <select
              value={broadcastForm.instagramGateEnabled ? "true" : "false"}
              onChange={(e) =>
                setBroadcastForm({
                  ...broadcastForm,
                  instagramGateEnabled: e.target.value === "true",
                })
              }
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50"
            >
              <option value="true">Enabled</option>
              <option value="false">Disabled</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 font-sans text-xs font-bold uppercase text-white/50 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#3B82F6] text-white font-sans text-xs font-bold uppercase rounded-xl hover:bg-[#3B82F6]/80 transition-colors"
            >
              {editingBroadcast ? "Update" : "Create"} Broadcast
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
