import React, { useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import Papa from "papaparse";
import { useRouter } from "next/router";
import AdminLayout from "../../components/AdminLayout";

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
      setError("Please specify an Event ID.");
      return;
    }
    if (!file) {
      setError("Please select a CSV file.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setValidationErrors([]);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const res = await fetch("/api/points/bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              eventId,
              rows: results.data,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            setError(data.error || "Upload failed.");
            if (data.details) {
              setValidationErrors(data.details);
            }
          } else {
            setSuccess(data.message || "Upload successful!");
            setFile(null);
            setEventId("");
            if (fileInputRef.current) fileInputRef.current.value = "";
          }
        } catch (err) {
          setError("Network error occurred during upload.");
        } finally {
          setLoading(false);
        }
      },
      error: (err: any) => {
        setError(`CSV Parse Error: ${err.message}`);
        setLoading(false);
      }
    });
  };

  if (status === "loading") {
    return <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center text-on-surface">Loading...</div>;
  }

  return (
    <AdminLayout title="Admin Dashboard - UAIU Athletics">
      <header className="w-full px-margin-mobile md:px-margin-desktop py-6 flex justify-between items-center border-b border-outline-variant/20 bg-surface-container-lowest/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold">Dashboard &amp; Import</h2>
        </div>
        <div className="flex items-center gap-4 text-on-surface-variant">
          <span className="text-sm font-label-caps">{session?.user?.email}</span>
          <button className="hover:text-primary transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
          </button>
        </div>
      </header>

          <div className="p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto w-full flex flex-col gap-8">
            
            {/* Stats Overview Grid (Hardcoded for Visual Identity as per Stitch) */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/20 relative overflow-hidden group hover:shadow-[4px_4px_0_0_rgba(173,198,255,1)] transition-all duration-300 hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 text-surface-container-highest/50 group-hover:text-primary/10 transition-colors">
                  <span className="material-symbols-outlined !text-7xl">group</span>
                </div>
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-2 relative z-10">Total Students</p>
                <div className="flex items-end gap-3 relative z-10">
                  <h3 className="font-headline-xl text-headline-xl text-on-surface">1,240</h3>
                </div>
              </div>
              <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/20 relative overflow-hidden group hover:shadow-[4px_4px_0_0_rgba(173,198,255,1)] transition-all duration-300 hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 text-surface-container-highest/50 group-hover:text-primary/10 transition-colors">
                  <span className="material-symbols-outlined !text-7xl">sports_kabaddi</span>
                </div>
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-2 relative z-10">Total Sports</p>
                <div className="flex items-end gap-3 relative z-10">
                  <h3 className="font-headline-xl text-headline-xl text-on-surface">15</h3>
                </div>
              </div>
              <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/20 relative overflow-hidden group hover:shadow-[4px_4px_0_0_rgba(173,198,255,1)] transition-all duration-300 hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 text-surface-container-highest/50 group-hover:text-primary/10 transition-colors">
                  <span className="material-symbols-outlined !text-7xl">event</span>
                </div>
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-2 relative z-10">Total Events</p>
                <div className="flex items-end gap-3 relative z-10">
                  <h3 className="font-headline-xl text-headline-xl text-on-surface">84</h3>
                </div>
              </div>
              <div className="bg-surface-container rounded-xl p-6 border border-primary/40 relative overflow-hidden group hover:shadow-[4px_4px_0_0_rgba(173,198,255,1)] transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-surface-container to-primary/5">
                <div className="absolute -right-4 -top-4 text-primary/20 group-hover:text-primary/30 transition-colors">
                  <span className="material-symbols-outlined !text-7xl">emoji_events</span>
                </div>
                <p className="font-label-caps text-label-caps text-primary mb-2 relative z-10">Total Points Awarded</p>
                <div className="flex items-end gap-3 relative z-10">
                  <h3 className="font-headline-xl text-headline-xl text-on-surface">42k</h3>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Data Import Form */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="bg-surface-container rounded-xl border border-outline-variant/20 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-headline-md text-headline-md text-on-surface">Import Event Results</h3>
                  </div>

                  <div className="flex flex-col gap-2 mb-6">
                    <label className="font-label-caps text-on-surface-variant text-xs">Target Event ID</label>
                    <input
                      type="text"
                      value={eventId}
                      onChange={(e) => setEventId(e.target.value)}
                      className="w-full h-12 pl-4 pr-4 rounded-lg bg-surface border border-outline/30 text-on-surface focus:ring-primary focus:border-primary focus:outline-none font-body-md"
                      placeholder="e.g. event-uuid-here"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label className="font-label-caps text-on-surface-variant text-xs">Select CSV File</label>
                    <div className="border-2 border-dashed border-outline-variant/50 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer relative bg-surface">
                      <input 
                        type="file" 
                        accept=".csv" 
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">upload_file</span>
                      <p className="text-on-surface font-semibold">{file ? file.name : "Click or drag to select CSV"}</p>
                      <p className="text-sm text-on-surface-variant mt-1">Headers required: rollNumber, points, position</p>
                    </div>
                    
                    <button 
                      onClick={handleUpload}
                      disabled={loading || !file || !eventId}
                      className="mt-4 h-12 w-full rounded-lg bg-primary text-on-primary font-headline-md font-bold hover:bg-primary-fixed transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_4px_0_0_rgba(173,198,255,1)] active:scale-95"
                    >
                      {loading && <span className="material-symbols-outlined animate-spin text-sm">sync</span>}
                      {loading ? "Processing..." : "Validate & Import"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Validation Status */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="bg-surface-container rounded-xl border border-outline-variant/20 p-6 flex flex-col h-full min-h-[400px]">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Validation Status</h4>
                    <span className="material-symbols-outlined text-on-surface-variant">fact_check</span>
                  </div>

                  {success && (
                    <div className="p-4 rounded-lg bg-success/10 border border-success/30 flex items-start gap-3 mb-6">
                      <span className="material-symbols-outlined text-success mt-0.5">check_circle</span>
                      <div>
                        <h3 className="font-bold text-success">Import Successful</h3>
                        <p className="text-sm text-on-surface mt-1">{success}</p>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="p-4 rounded-lg bg-error/10 border border-error/30 flex items-start gap-3 mb-6">
                      <span className="material-symbols-outlined text-error mt-0.5">error</span>
                      <div>
                        <h3 className="font-bold text-error">Import Failed</h3>
                        <p className="text-sm text-on-surface mt-1">{error}</p>
                      </div>
                    </div>
                  )}

                  {validationErrors.length > 0 && (
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-label-caps text-on-surface-variant mb-3">Row-level Errors ({validationErrors.length})</h3>
                      <div className="overflow-y-auto flex-1 border border-outline-variant/20 rounded-lg">
                        <table className="w-full text-left border-collapse bg-surface-container-lowest/50">
                          <thead>
                            <tr className="font-label-caps text-on-surface-variant border-b border-outline-variant/20 text-xs bg-surface-container-lowest">
                              <th className="py-2 px-4 font-semibold sticky top-0">Row</th>
                              <th className="py-2 px-4 font-semibold sticky top-0">Error Description</th>
                            </tr>
                          </thead>
                          <tbody className="font-data-tabular text-sm">
                            {validationErrors.map((err: {row: number, error: string}, i: number) => (
                              <tr key={i} className="border-b border-outline-variant/10">
                                <td className="py-2 px-4 text-on-surface-variant">{err.row}</td>
                                <td className="py-2 px-4 text-error">{err.error}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {!error && !success && validationErrors.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full flex-1 text-on-surface-variant opacity-50 mt-10">
                      <span className="material-symbols-outlined text-5xl mb-4">fact_check</span>
                      <p className="text-center font-body-md">Upload a file to see validation results.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
    </AdminLayout>
  );
}
