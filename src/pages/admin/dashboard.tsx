import React, { useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import Papa from "papaparse";
import { useRouter } from "next/router";
import AdminLayout from "../../components/AdminLayout";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const { data: session, status } = useSession({ required: true, onUnauthenticated() { router.push('/admin/login'); } });
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [eventId, setEventId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationErrors, setValidationErrors] = useState<{row: number, error: string}[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError("");
      setSuccess("");
      setValidationErrors([]);
    }
  };

  const handleUpload = async () => {
    if (!eventId) {
      setError("Please specify a target Event ID.");
      return;
    }
    setLoading(true);
    // Simulation of parsing the new CSV format
    setTimeout(() => {
      setLoading(false);
      setSuccess("Successfully processed 150 rows. Data synchronized with Leaderboard.");
    }, 2000);
  };

  return (
    <AdminLayout title="Data Center | Operations">
      <div className="flex flex-col gap-8 pb-20">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <h1 className="font-display text-4xl font-black uppercase text-white tracking-wide mb-2">Data Center</h1>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-white/40">
              Bulk Data Ingestion & Validation
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-black font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition-colors">
            <span className="material-symbols-outlined text-[18px]">cloud_download</span>
            Export All Data
          </button>
        </div>

        {/* QUICK STATS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
            <div className="absolute -right-4 -top-4 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors">
              <span className="material-symbols-outlined !text-[8rem]">dns</span>
            </div>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 relative z-10">Database Status</p>
            <div className="flex items-center gap-3 relative z-10">
              <h3 className="font-display text-4xl font-bold text-emerald-500">OPTIMAL</h3>
            </div>
          </div>
          <div className="bg-[#111] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors">
            <div className="absolute -right-4 -top-4 text-[#D4AF37]/10 group-hover:text-[#D4AF37]/20 transition-colors">
              <span className="material-symbols-outlined !text-[8rem]">event</span>
            </div>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 relative z-10">Total Events</p>
            <div className="flex items-end gap-3 relative z-10">
              <h3 className="font-display text-4xl font-bold text-white">84</h3>
            </div>
          </div>
          <div className="bg-[#111] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-[#3B82F6]/50 transition-colors">
            <div className="absolute -right-4 -top-4 text-[#3B82F6]/10 group-hover:text-[#3B82F6]/20 transition-colors">
              <span className="material-symbols-outlined !text-[8rem]">emoji_events</span>
            </div>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 relative z-10">Points Awarded</p>
            <div className="flex items-end gap-3 relative z-10">
              <h3 className="font-display text-4xl font-bold text-white">42k</h3>
            </div>
          </div>
        </section>

        {/* UPLOAD & VALIDATION AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* UPLOAD FORM */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-[#111]/80 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl">
              <h3 className="font-display text-2xl font-bold uppercase text-white mb-6">Import Results File</h3>
              
              <div className="flex flex-col gap-2 mb-6">
                <label className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Target Event ID</label>
                <input
                  type="text"
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-black/50 border border-white/10 text-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] focus:outline-none font-sans text-sm transition-all"
                  placeholder="e.g. EVENT-2026-FINALS"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Upload CSV Document</label>
                <div className="border-2 border-dashed border-white/20 rounded-2xl p-10 text-center hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all cursor-pointer relative bg-black/30 group">
                  <input 
                    type="file" 
                    accept=".csv" 
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center pointer-events-none">
                    <span className="material-symbols-outlined text-4xl text-white/40 group-hover:text-[#D4AF37] mb-3 transition-colors">upload_file</span>
                    <p className="text-white font-sans text-sm font-bold uppercase tracking-wider">
                      {file ? file.name : "Click or drag to select CSV"}
                    </p>
                    <p className="text-[10px] text-white/40 font-sans tracking-widest uppercase mt-2">
                      Required Headers: Student ID, Student Name, School, Program, Year, Gender, Sport, Event, Participation Status, Gold, Silver, Bronze, Participation Points, Bonus Points, Total Points, Remarks
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={handleUpload}
                  disabled={loading || !file || !eventId}
                  className="mt-4 h-14 w-full rounded-xl bg-[#D4AF37] text-black font-sans text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:shadow-none"
                >
                  {loading && <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>}
                  {loading ? "Processing..." : "Validate & Import"}
                </button>
              </div>
            </div>
          </div>

          {/* VALIDATION STATUS */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#111]/80 backdrop-blur-md rounded-2xl border border-white/10 p-8 flex flex-col h-full min-h-[450px] shadow-2xl">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/5">
                <h4 className="font-sans text-xs font-bold text-white/60 uppercase tracking-[0.3em]">Validation Status</h4>
                <span className="material-symbols-outlined text-white/40">fact_check</span>
              </div>

              <AnimatePresence mode="wait">
                {success && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col gap-2 mb-6">
                    <div className="flex items-center gap-3 text-emerald-500">
                      <span className="material-symbols-outlined">check_circle</span>
                      <h3 className="font-bold uppercase tracking-widest text-sm">Import Successful</h3>
                    </div>
                    <p className="text-xs text-white/70">{success}</p>
                  </motion.div>
                )}

                {error && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-red-500/10 border border-red-500/30 flex flex-col gap-2 mb-6">
                    <div className="flex items-center gap-3 text-red-500">
                      <span className="material-symbols-outlined">error</span>
                      <h3 className="font-bold uppercase tracking-widest text-sm">Import Failed</h3>
                    </div>
                    <p className="text-xs text-white/70">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {!error && !success && validationErrors.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full flex-1 text-white/20">
                  <span className="material-symbols-outlined text-[4rem] mb-6">analytics</span>
                  <p className="text-center font-sans text-xs uppercase tracking-widest max-w-[200px]">System ready for file validation.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
