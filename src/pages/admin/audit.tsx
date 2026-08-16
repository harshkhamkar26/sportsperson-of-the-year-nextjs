import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import AdminLayout from "../../components/AdminLayout";

export default function AdminAudit() {
  const { data: session, status } = useSession({ required: true, onUnauthenticated() { router.push('/admin/login'); } });
  const router = useRouter();

  // State for expanded rows
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({
    1: true, // Row 1 expanded by default
  });

  const toggleRow = (index: number) => {
    setExpandedRows(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (status === "loading") {
    return <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center text-on-surface">Loading...</div>;
  }

  return (
    <AdminLayout title="Audit Logs - Admin Portal">
      <div className="flex-1 overflow-y-auto w-full">

          
          {/* Header */}
          <header className="h-24 md:h-20 flex items-center justify-between px-margin-mobile md:px-margin-desktop py-4 md:py-0 border-b border-outline-variant/20 shrink-0 relative z-10 bg-surface-container-lowest/80 backdrop-blur-md">
            <div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface tracking-tight">System Audit Logs</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">notifications</span>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-margin-mobile md:p-margin-desktop">
            <div className="max-w-container-max mx-auto flex flex-col gap-8">
              
              {/* Filters & Controls Toolbar */}
              <section className="bg-surface-container p-6 rounded-lg border border-outline-variant/30 flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center relative overflow-hidden group">
                {/* Subtle background accent */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none"></div>
                
                <div className="flex flex-col gap-1 z-10">
                  <h3 className="font-headline-md text-headline-md text-on-surface">Security & Change Tracking</h3>
                  <p className="text-on-surface-variant text-sm">Reviewing 243 events in the last 7 days.</p>
                </div>
                
                <div className="flex flex-wrap gap-4 z-10 w-full lg:w-auto">
                  {/* Date Range */}
                  <div className="flex flex-col gap-1 flex-1 lg:flex-none min-w-[150px]">
                    <label className="font-label-caps text-label-caps text-on-surface-variant text-xs">Date Range</label>
                    <div className="flex items-center bg-surface border border-outline-variant/50 rounded p-2 focus-within:border-primary transition-colors">
                      <span className="material-symbols-outlined text-outline text-sm mr-2">date_range</span>
                      <select className="bg-transparent text-on-surface text-sm outline-none w-full appearance-none cursor-pointer">
                        <option className="bg-surface">Last 7 Days</option>
                        <option className="bg-surface">Last 30 Days</option>
                        <option className="bg-surface">This Semester</option>
                        <option className="bg-surface">Custom Range...</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Admin User */}
                  <div className="flex flex-col gap-1 flex-1 lg:flex-none min-w-[150px]">
                    <label className="font-label-caps text-label-caps text-on-surface-variant text-xs">Administrator</label>
                    <div className="flex items-center bg-surface border border-outline-variant/50 rounded p-2 focus-within:border-primary transition-colors">
                      <span className="material-symbols-outlined text-outline text-sm mr-2">shield_person</span>
                      <select className="bg-transparent text-on-surface text-sm outline-none w-full appearance-none cursor-pointer">
                        <option className="bg-surface">All Admins</option>
                        <option className="bg-surface">Coach Carter</option>
                        <option className="bg-surface">System Admin</option>
                        <option className="bg-surface">Dr. Vance</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Action Type */}
                  <div className="flex flex-col gap-1 flex-1 lg:flex-none min-w-[150px]">
                    <label className="font-label-caps text-label-caps text-on-surface-variant text-xs">Action Type</label>
                    <div className="flex items-center bg-surface border border-outline-variant/50 rounded p-2 focus-within:border-primary transition-colors">
                      <span className="material-symbols-outlined text-outline text-sm mr-2">filter_alt</span>
                      <select className="bg-transparent text-on-surface text-sm outline-none w-full appearance-none cursor-pointer">
                        <option className="bg-surface">All Actions</option>
                        <option className="bg-surface">Result Overrides</option>
                        <option className="bg-surface">Point Rule Changes</option>
                        <option className="bg-surface">System Config</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Export */}
                  <div className="flex items-end gap-2 lg:ml-auto mt-4 lg:mt-0 w-full lg:w-auto">
                    <button className="h-[42px] px-4 border border-outline-variant text-on-surface rounded hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2 w-full">
                      <span className="material-symbols-outlined text-sm">download</span>
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* Data Table Section */}
              <section className="bg-surface-container border border-outline-variant/30 rounded-lg overflow-hidden flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                      <tr className="bg-surface-container-highest border-b border-outline-variant/40">
                        <th className="font-label-caps text-label-caps text-on-surface-variant py-4 px-6 w-12"></th>
                        <th className="font-label-caps text-label-caps text-on-surface-variant py-4 px-6 cursor-pointer hover:text-on-surface transition-colors group">
                          <div className="flex items-center gap-2">
                            Timestamp <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity">arrow_downward</span>
                          </div>
                        </th>
                        <th className="font-label-caps text-label-caps text-on-surface-variant py-4 px-6">Admin</th>
                        <th className="font-label-caps text-label-caps text-on-surface-variant py-4 px-6">Action</th>
                        <th className="font-label-caps text-label-caps text-on-surface-variant py-4 px-6">Target Entity</th>
                        <th className="font-label-caps text-label-caps text-on-surface-variant py-4 px-6 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="font-data-tabular text-data-tabular">
                      
                      {/* Row 1 */}
                      <tr className={`border-b border-outline-variant/10 hover:bg-surface-container-high transition-colors cursor-pointer group relative ${expandedRows[1] ? 'bg-surface-container-high/50' : ''}`} onClick={() => toggleRow(1)}>
                        <td className="py-3 px-6 text-center">
                          <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${expandedRows[1] ? 'rotate-180' : ''}`}>expand_more</span>
                        </td>
                        <td className="py-3 px-6 text-on-surface-variant text-sm">
                          2024-11-12 <br /> <span className="text-xs opacity-70">14:32:45 EST</span>
                        </td>
                        <td className="py-3 px-6">
                          <div className="flex items-center gap-3">
                            <img className="w-8 h-8 rounded-full border border-outline-variant/50 object-cover" src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop" alt="Admin" />
                            <div>
                              <div className="text-sm text-on-surface">Coach Carter</div>
                              <div className="text-xs text-on-surface-variant font-body-md">Athletics Dept</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded bg-warning/10 text-warning text-xs font-bold border border-warning/20">
                            <span className="material-symbols-outlined text-[14px]">edit_document</span>
                            Changed Result
                          </span>
                        </td>
                        <td className="py-3 px-6 text-sm text-on-surface">
                          Student <span className="text-primary">UAI00124</span><br />
                          <span className="text-xs text-on-surface-variant">100m Sprint Final</span>
                        </td>
                        <td className="py-3 px-6 text-right">
                          <span className="material-symbols-outlined text-success">check_circle</span>
                        </td>
                      </tr>
                      {/* Expanded Row 1 */}
                      {expandedRows[1] && (
                        <tr className="bg-surface-container-lowest/50 border-b border-outline-variant/30">
                          <td className="p-0" colSpan={6}>
                            <div className="p-4 md:p-6 md:pl-20 animate-[slideDown_0.3s_ease-out]">
                              <div className="flex flex-col gap-4 border-l-2 border-warning/30 pl-4 md:pl-6">
                                <h4 className="text-xs font-label-caps text-label-caps text-on-surface-variant mb-2">Change Details</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 bg-surface-container p-4 rounded border border-outline-variant/20">
                                  {/* Old Value */}
                                  <div className="flex flex-col gap-2 relative">
                                    <div className="text-xs text-on-surface-variant flex items-center gap-2">
                                      <span className="material-symbols-outlined text-error text-[16px]">remove_circle_outline</span>
                                      Previous State
                                    </div>
                                    <div className="p-3 bg-surface rounded border border-error/20 border-dashed line-through opacity-70">
                                      <div className="flex justify-between items-center">
                                        <span className="text-sm">Placement:</span>
                                        <span className="text-rank-silver font-bold">2nd Place (Silver)</span>
                                      </div>
                                      <div className="flex justify-between items-center mt-1">
                                        <span className="text-sm">Time:</span>
                                        <span>10.42s</span>
                                      </div>
                                    </div>
                                  </div>
                                  {/* New Value */}
                                  <div className="flex flex-col gap-2 relative">
                                    <div className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 text-outline-variant">
                                      <span className="material-symbols-outlined">arrow_right_alt</span>
                                    </div>
                                    <div className="text-xs text-on-surface-variant flex items-center gap-2">
                                      <span className="material-symbols-outlined text-success text-[16px]">add_circle_outline</span>
                                      New State
                                    </div>
                                    <div className="p-3 bg-surface rounded border border-success/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                                      <div className="flex justify-between items-center">
                                        <span className="text-sm">Placement:</span>
                                        <span className="text-rank-gold font-bold flex items-center gap-1">
                                          <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                                          1st Place (Gold)
                                        </span>
                                      </div>
                                      <div className="flex justify-between items-center mt-1">
                                        <span className="text-sm">Time:</span>
                                        <span className="text-success font-bold">10.38s</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-2 text-sm text-on-surface-variant bg-surface p-3 rounded border border-outline-variant/10">
                                  <strong>Reason provided:</strong> "Video review confirmed UAI00124 crossed the line ahead of UAI00492. Timing chip malfunctioned."
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}

                      {/* Row 2 */}
                      <tr className={`border-b border-outline-variant/10 hover:bg-surface-container-high transition-colors cursor-pointer group relative ${expandedRows[2] ? 'bg-surface-container-high/50' : ''}`} onClick={() => toggleRow(2)}>
                        <td className="py-3 px-6 text-center">
                          <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${expandedRows[2] ? 'rotate-180' : ''}`}>expand_more</span>
                        </td>
                        <td className="py-3 px-6 text-on-surface-variant text-sm">
                          2024-11-11 <br /> <span className="text-xs opacity-70">09:15:00 EST</span>
                        </td>
                        <td className="py-3 px-6">
                          <div className="flex items-center gap-3">
                            <img className="w-8 h-8 rounded-full border border-outline-variant/50 object-cover" src="https://images.unsplash.com/photo-1526314141639-c5ec37df32f8?q=80&w=200&auto=format&fit=crop" alt="Admin" />
                            <div>
                              <div className="text-sm text-on-surface">System Admin</div>
                              <div className="text-xs text-on-surface-variant font-body-md">Root</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded bg-primary/10 text-primary-fixed-dim text-xs font-bold border border-primary/20">
                            <span className="material-symbols-outlined text-[14px]">rule</span>
                            Updated Point Rule
                          </span>
                        </td>
                        <td className="py-3 px-6 text-sm text-on-surface">
                          Rule <span className="text-primary">PR-ACAD-01</span><br />
                          <span className="text-xs text-on-surface-variant">Dean's List Bonus</span>
                        </td>
                        <td className="py-3 px-6 text-right">
                          <span className="material-symbols-outlined text-success">check_circle</span>
                        </td>
                      </tr>
                      {/* Expanded Row 2 */}
                      {expandedRows[2] && (
                        <tr className="bg-surface-container-lowest/50 border-b border-outline-variant/30">
                          <td className="p-0" colSpan={6}>
                            <div className="p-4 md:p-6 md:pl-20 animate-[slideDown_0.3s_ease-out]">
                              <div className="flex flex-col gap-4 border-l-2 border-primary/30 pl-4 md:pl-6">
                                <h4 className="text-xs font-label-caps text-label-caps text-on-surface-variant mb-2">Configuration Changes</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 bg-surface-container p-4 rounded border border-outline-variant/20">
                                  <div className="flex flex-col gap-2">
                                    <div className="text-xs text-on-surface-variant">Previous Rule Config JSON</div>
                                    <pre className="p-3 bg-surface rounded border border-error/20 text-xs text-outline font-data-tabular overflow-x-auto">
{`{
  "condition": "gpa >= 3.5",
  "points_awarded": 50,
  "stackable": false
}`}
                                    </pre>
                                  </div>
                                  <div className="flex flex-col gap-2 relative">
                                    <div className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 text-outline-variant">
                                      <span className="material-symbols-outlined">arrow_right_alt</span>
                                    </div>
                                    <div className="text-xs text-on-surface-variant">New Rule Config JSON</div>
                                    <pre className="p-3 bg-surface rounded border border-success/30 text-xs text-primary-fixed-dim font-data-tabular overflow-x-auto shadow-[0_0_10px_rgba(173,198,255,0.05)]">
{`{
  "condition": "gpa >= 3.8",
  "points_awarded": 75,
  "stackable": false
}`}
                                    </pre>
                                  </div>
                                </div>
                                <div className="mt-2 text-sm text-on-surface-variant bg-surface p-3 rounded border border-outline-variant/10">
                                  <strong>Reason provided:</strong> "Aligning with new university academic excellence standards for Fall 2024 semester."
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}

                      {/* Row 3: Security Event (Error) */}
                      <tr className={`border-b border-outline-variant/10 hover:bg-surface-container-high transition-colors cursor-pointer group relative ${expandedRows[3] ? 'bg-surface-container-high/50' : ''}`} onClick={() => toggleRow(3)}>
                        <td className="py-3 px-6 text-center">
                          <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${expandedRows[3] ? 'rotate-180' : ''}`}>expand_more</span>
                        </td>
                        <td className="py-3 px-6 text-on-surface-variant text-sm">
                          2024-11-10 <br /> <span className="text-xs opacity-70">22:04:12 EST</span>
                        </td>
                        <td className="py-3 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center border border-outline-variant/50">
                              <span className="material-symbols-outlined text-outline-variant text-sm">question_mark</span>
                            </div>
                            <div>
                              <div className="text-sm text-on-surface">Unknown IP</div>
                              <div className="text-xs text-error font-body-md">192.168.x.x</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded bg-error/10 text-error text-xs font-bold border border-error/20">
                            <span className="material-symbols-outlined text-[14px]">gpp_bad</span>
                            Failed Access
                          </span>
                        </td>
                        <td className="py-3 px-6 text-sm text-on-surface">
                          System <span className="text-primary">Database</span><br />
                          <span className="text-xs text-on-surface-variant">Athletic Records</span>
                        </td>
                        <td className="py-3 px-6 text-right">
                          <span className="material-symbols-outlined text-error">block</span>
                        </td>
                      </tr>
                      {/* Expanded Row 3 */}
                      {expandedRows[3] && (
                        <tr className="bg-surface-container-lowest/50 border-b border-outline-variant/30">
                          <td className="p-0" colSpan={6}>
                            <div className="p-4 md:p-6 md:pl-20 animate-[slideDown_0.3s_ease-out]">
                              <div className="flex flex-col gap-4 border-l-2 border-error/30 pl-4 md:pl-6">
                                <h4 className="text-xs font-label-caps text-label-caps text-error mb-2">Security Alert Details</h4>
                                <div className="bg-surface p-4 rounded border border-error/20 flex items-start gap-4">
                                  <span className="material-symbols-outlined text-error mt-1">warning</span>
                                  <div className="text-sm text-on-surface-variant font-data-tabular">
                                    <p className="text-on-surface mb-2 font-bold">Unauthorized API request intercepted.</p>
                                    <p>Endpoint: <span className="text-primary-fixed-dim">/api/v1/records/modify</span></p>
                                    <p>Method: POST</p>
                                    <p>Payload Signature: Invalid token.</p>
                                    <p className="mt-2 text-error">Action Taken: IP temporarily blacklisted for 24 hours.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}

                    </tbody>
                  </table>
                </div>

                {/* Pagination Footer */}
                <div className="bg-surface-container-highest p-4 border-t border-outline-variant/30 flex justify-between items-center text-sm text-on-surface-variant font-data-tabular">
                  <div>Showing 1-3 of 243 events</div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container transition-colors disabled:opacity-50" disabled>
                      <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <span className="px-2 font-bold text-on-surface">1</span>
                    <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container transition-colors">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container transition-colors">3</button>
                    <span>...</span>
                    <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container transition-colors">
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              </section>

            </div>
          </div>
        
      </div>
    </AdminLayout>
  );
}
