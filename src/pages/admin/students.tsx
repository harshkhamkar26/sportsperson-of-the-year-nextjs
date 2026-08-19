import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
import { prisma } from "@/lib/prisma";

export async function getServerSideProps() {
  const [schools, departments, sports] = await Promise.all([
    prisma.school.findMany({ orderBy: { name: 'asc' } }),
    prisma.department.findMany({ orderBy: { name: 'asc' } }),
    prisma.sport.findMany({ orderBy: { name: 'asc' } }),
  ]);
  
  return {
    props: {
      schools: JSON.parse(JSON.stringify(schools)),
      departments: JSON.parse(JSON.stringify(departments)),
      sports: JSON.parse(JSON.stringify(sports)),
    },
  };
}

export default function StudentManagement({ schools, departments, sports }: any) {
  const { data: session, status } = useSession({ required: true, onUnauthenticated() { router.push('/admin/login'); } });
  const router = useRouter();

  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    rollNumber: "",
    name: "",
    className: "",
    gender: "",
    schoolId: "",
    departmentId: "",
    sportId: "",
  });

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/students?search=${encodeURIComponent(search)}&limit=100`);
      if (res.ok) {
        const data = await res.json();
        setStudents(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search]);

  const handleCreate = () => {
    setEditingStudent(null);
    setFormData({ rollNumber: "", name: "", className: "", gender: "", schoolId: "", departmentId: "", sportId: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (student: any) => {
    setEditingStudent(student);
    setFormData({
      rollNumber: student.rollNumber || "",
      name: student.name || "",
      className: student.className || "",
      gender: student.gender || "",
      schoolId: student.schoolId || "",
      departmentId: student.departmentId || "",
      sportId: student.sportId || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    try {
      const res = await fetch(`/api/students?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchStudents();
      } else {
        alert("Failed to delete student");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = "/api/students";
      const method = editingStudent ? "PUT" : "POST";
      const body = editingStudent ? { id: editingStudent.id, ...formData } : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchStudents();
      } else {
        const error = await res.json();
        alert(`Failed to save: ${error.error}`);
      }
    } catch (e) {
      console.error(e);
      alert("Error saving student");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading") {
    return <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <AdminLayout title="Student Management - Sports Command Center">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0D0E12]">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          
          <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">Student Management</h1>
              <p className="text-white/60 mt-1">Add, edit, or remove athletes from the system.</p>
            </div>
            <button 
              onClick={handleCreate}
              className="px-6 py-2 bg-[#D4AF37] text-black font-bold rounded-lg shadow-lg hover:bg-white transition-colors"
            >
              + Add Student
            </button>
          </header>

          <div className="bg-[#1A1C23] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-white/5 bg-black/20 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <input
                type="text"
                placeholder="Search by name or roll number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:max-w-md bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]"
              />
              <div className="text-sm text-white/50">{students.length} students found</div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/40 text-[10px] font-bold tracking-widest text-white/50 uppercase border-b border-white/10">
                    <th className="py-4 px-6">Roll No</th>
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Class/Gender</th>
                    <th className="py-4 px-6">School & Dept</th>
                    <th className="py-4 px-6">Primary Sport</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {isLoading ? (
                    <tr><td colSpan={6} className="py-12 text-center text-white/40">Loading students...</td></tr>
                  ) : students.length === 0 ? (
                    <tr><td colSpan={6} className="py-12 text-center text-white/40">No students found.</td></tr>
                  ) : (
                    students.map(student => (
                      <tr key={student.id} className="border-b border-white/5 bg-[#1A1C23] hover:bg-white/[0.02]">
                        <td className="py-4 px-6 font-data-tabular font-bold text-white/80">{student.rollNumber}</td>
                        <td className="py-4 px-6 font-bold text-white">{student.name}</td>
                        <td className="py-4 px-6 text-white/60">
                          {student.className}
                          {student.gender && <span className="ml-2 text-xs bg-white/10 px-2 py-0.5 rounded">{student.gender}</span>}
                        </td>
                        <td className="py-4 px-6 text-white/60">
                          {student.school?.name || "-"}
                          {student.department && <div className="text-xs text-white/40">{student.department.name}</div>}
                        </td>
                        <td className="py-4 px-6 text-[#D4AF37] font-medium">{student.sport?.name || "-"}</td>
                        <td className="py-4 px-6 text-right">
                          <button onClick={() => handleEdit(student)} className="text-blue-400 hover:text-blue-300 text-sm font-bold mr-4">Edit</button>
                          <button onClick={() => handleDelete(student.id)} className="text-red-400 hover:text-red-300 text-sm font-bold">Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1A1C23] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h2 className="text-2xl font-bold text-white">{editingStudent ? "Edit Student" : "New Student"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white">✕</button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Roll Number</label>
                  <input required type="text" value={formData.rollNumber} onChange={e => setFormData({...formData, rollNumber: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#D4AF37] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Full Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#D4AF37] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Class/Batch</label>
                  <input required type="text" value={formData.className} onChange={e => setFormData({...formData, className: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#D4AF37] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Gender</label>
                  <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#D4AF37] focus:outline-none">
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1">School</label>
                  <select value={formData.schoolId} onChange={e => setFormData({...formData, schoolId: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#D4AF37] focus:outline-none">
                    <option value="">Select School</option>
                    {schools.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Department</label>
                  <select value={formData.departmentId} onChange={e => setFormData({...formData, departmentId: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#D4AF37] focus:outline-none">
                    <option value="">Select Department</option>
                    {departments.filter((d: any) => !formData.schoolId || d.schoolId === formData.schoolId).map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Primary Sport</label>
                  <select value={formData.sportId} onChange={e => setFormData({...formData, sportId: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#D4AF37] focus:outline-none">
                    <option value="">Select Sport</option>
                    {sports.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border border-white/20 rounded-lg text-white hover:bg-white/10">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-6 py-2 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-white disabled:opacity-50">
                  {isSaving ? "Saving..." : "Save Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
