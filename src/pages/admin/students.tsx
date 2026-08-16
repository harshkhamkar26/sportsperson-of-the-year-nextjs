import React, { useState } from "react";
import Avatar from "../../components/Avatar";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import AdminLayout from "../../components/AdminLayout";
import { getRankings } from "@/lib/rankings";

export async function getServerSideProps() {
  const students = await getRankings();
  return { props: { students } };
}

export default function StudentManagement({ students }: { students: any[] }) {
  const { data: session, status } = useSession({ required: true, onUnauthenticated() { router.push('/admin/login'); } });
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (student: any) => {
    setEditingStudent(student);
    setPhotoUrl(student.photoUrl || "");
  };

  const handleSave = async () => {
    if (!editingStudent) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/students", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingStudent.id, photoUrl }),
      });
      if (res.ok) {
        // Just reload the page for simplicity to see the update
        window.location.reload();
      } else {
        alert("Failed to update student");
      }
    } catch (e) {
      console.error(e);
      alert("Error updating student");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
    s.className.toLowerCase().includes(search.toLowerCase())
  );

  if (status === "loading") {
    return <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center text-on-surface">Loading...</div>;
  }

  return (
    <AdminLayout title="Student Management - Admin Portal">
      <div className="flex-1 overflow-y-auto w-full">

          {/* Header Section */}
          <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="font-headline-xl text-headline-xl font-extrabold text-on-surface tracking-tighter mb-2">Student Directory</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Manage 1,024 active student-athletes across all disciplines.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-72">
                <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant">search</span>
                <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant rounded-lg py-2 pl-10 pr-4 text-on-surface font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" 
                  placeholder="Search ID, Name, School..." 
                  type="text"
                />
              </div>
              <button className="bg-surface-container border border-outline-variant text-on-surface px-4 py-2 rounded-lg font-label-caps text-label-caps flex items-center gap-2 hover:bg-surface-container-highest transition-colors whitespace-nowrap">
                <span className="material-symbols-outlined">filter_list</span>
                Filter
              </button>
            </div>
          </header>

          {/* Data Table Container */}
          <div className="bg-surface-container rounded-xl border border-outline-variant/30 overflow-hidden flex-1 flex flex-col min-h-[500px]">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-surface-container-high border-b border-outline-variant/30 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
              <div className="col-span-1 hidden sm:block">Photo</div>
              <div className="col-span-6 sm:col-span-4">Student Info</div>
              <div className="col-span-2 hidden md:block">School</div>
              <div className="col-span-2 hidden lg:block">Current Rank</div>
              <div className="col-span-3 sm:col-span-2 text-right">Points</div>
              <div className="col-span-3 sm:col-span-2 lg:col-span-1 text-right">Actions</div>
            </div>
            
            {/* Table Body */}
            <div className="flex-1 overflow-y-auto">
              
              {filteredStudents.map((student) => {
                let rankColorClass = "text-on-surface-variant bg-surface border-outline-variant";
                let rankIcon = "";
                let rankText = `Rank #${student.rank}`;
                
                if (student.rank === 1) {
                  rankColorClass = "text-rank-gold bg-rank-gold/10 border-rank-gold/30 shadow-[0_0_10px_rgba(212,175,55,0.2)]";
                  rankIcon = "workspace_premium";
                  rankText = "1st Overall";
                } else if (student.rank === 2) {
                  rankColorClass = "text-rank-silver bg-rank-silver/10 border-rank-silver/30";
                  rankIcon = "workspace_premium";
                  rankText = "2nd Overall";
                } else if (student.rank === 3) {
                  rankColorClass = "text-rank-bronze bg-rank-bronze/10 border-rank-bronze/30";
                  rankIcon = "military_tech";
                  rankText = "3rd Overall";
                }

                return (
                  <div key={student.id} className="grid grid-cols-12 gap-4 px-6 py-3 items-center border-b border-outline-variant/10 hover:bg-surface-container-highest transition-colors group border border-transparent hover:border-primary/50 hover:shadow-[4px_4px_0_0_rgba(173,198,255,1)] hover:-translate-y-[2px] rounded-lg m-1 cursor-pointer">
                    <div className="col-span-1 hidden sm:block">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30 relative flex items-center justify-center bg-surface-container-high">
                        <Avatar photoUrl={student.photoUrl} name={student.name} className="w-full h-full object-cover text-sm" />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-4 flex flex-col justify-center">
                      <span className="font-body-lg text-body-lg font-semibold text-on-surface group-hover:text-primary transition-colors">{student.name}</span>
                      <span className="font-data-tabular text-data-tabular text-sm text-on-surface-variant">ID: {student.rollNumber}</span>
                    </div>
                    <div className="col-span-2 hidden md:flex items-center">
                      <span className="font-body-md text-body-md text-on-surface-variant truncate pr-2">{student.className}</span>
                    </div>
                    <div className="col-span-2 hidden lg:flex items-center">
                      <div className={`inline-flex items-center gap-2 border px-3 py-1 rounded-full ${rankColorClass}`}>
                        {rankIcon && <span className="material-symbols-outlined text-sm">{rankIcon}</span>}
                        <span className="font-label-caps text-label-caps text-[10px]">{rankText}</span>
                      </div>
                    </div>
                    <div className="col-span-3 sm:col-span-2 text-right flex items-center justify-end">
                      <span className="font-data-tabular text-data-tabular text-primary font-bold">{student.totalPoints}</span>
                    </div>
                    <div className="col-span-3 sm:col-span-2 lg:col-span-1 text-right flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(student)} className="p-2 rounded-md hover:bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-colors" title="Edit Photo">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                    </div>
                  </div>
                );
              })}

            </div>
            
            {/* Pagination Footer */}
            <div className="px-6 py-4 bg-surface-container-high border-t border-outline-variant/30 flex justify-between items-center mt-auto">
              <span className="font-body-md text-body-md text-on-surface-variant">Showing {filteredStudents.length} of {students.length}</span>
              <div className="flex gap-2">
                <button className="p-2 rounded-md bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="p-2 rounded-md bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        
      </div>
      
      {/* Edit Photo Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-outline-variant/30">
              <h2 className="font-headline-md text-headline-md text-on-surface">Edit Athlete Photo</h2>
              <p className="font-body-md text-on-surface-variant mt-1">Update the profile picture for {editingStudent.name}</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg">
                  <Avatar photoUrl={photoUrl} name={editingStudent.name} className="w-full h-full object-cover text-3xl" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant">Photo URL</label>
                <input 
                  type="url" 
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-3 text-on-surface focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                />
              </div>
            </div>
            
            <div className="p-4 bg-surface-container flex justify-end gap-3 border-t border-outline-variant/30">
              <button 
                onClick={() => setEditingStudent(null)}
                className="px-4 py-2 font-label-caps text-label-caps font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-md transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 font-label-caps text-label-caps font-bold bg-primary text-on-primary hover:bg-primary-fixed-dim rounded-md transition-colors shadow-lg disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
