import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import AdminLayout from "../../components/AdminLayout";

export default function AdminRoles() {
  const { data: session, status } = useSession({ required: true, onUnauthenticated() { router.push('/admin/login'); } });
  const router = useRouter();

  // State for toggles
  const [permissions, setPermissions] = useState({
    students: true,
    sports: true,
    events: true,
    results: true,
  });

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (status === "loading") {
    return <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center text-on-surface">Loading...</div>;
  }

  return (
    <AdminLayout title="Role & Permissions - Admin Portal">
      <div className="flex-1 overflow-y-auto w-full">

          
          {/* Header Section */}
          <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/30 pb-6">
            <div>
              <h1 className="font-headline-xl text-[32px] md:text-headline-xl text-on-surface">Role & Permissions</h1>
              <p className="font-body-lg text-sm md:text-body-lg text-on-surface-variant mt-2 max-w-2xl">
                Manage administrative access levels and module permissions across the Universal AI University Athletics ecosystem.
              </p>
            </div>
            <button className="bg-primary hover:bg-primary/90 px-6 py-3 rounded-lg text-on-primary font-headline-md text-[16px] font-bold transition-all flex items-center gap-2 w-full md:w-auto justify-center">
              <span className="material-symbols-outlined">person_add</span>
              Invite Admin
            </button>
          </header>

          <div className="max-w-container-max mx-auto space-y-16">
            
            {/* Bento Grid Layout for Roles & Admins */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
              
              {/* Role Hierarchy Overview (Left Column) */}
              <section className="lg:col-span-4 space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary">security</span>
                  <h2 className="font-headline-lg text-[24px] md:text-headline-md text-on-surface">System Roles</h2>
                </div>
                
                {/* Super Admin Card */}
                <div className="bg-[#162A45] rounded-xl p-6 border border-primary/20 relative overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-rank-gold/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <h3 className="font-headline-md text-[20px] text-on-surface flex items-center gap-2">
                        Super Admin
                        <span className="material-symbols-outlined text-rank-gold text-[20px]">verified</span>
                      </h3>
                      <p className="font-label-caps text-[12px] md:text-label-caps text-rank-gold mt-1">FULL ACCESS</p>
                    </div>
                  </div>
                  <p className="font-body-md text-sm md:text-body-md text-on-surface-variant relative z-10">
                    Unrestricted access to all modules, including user management, system configurations, and audit logs.
                  </p>
                  <div className="mt-4 flex -space-x-3 relative z-10">
                    <img className="w-8 h-8 rounded-full border-2 border-[#162A45] object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" alt="Admin" />
                    <img className="w-8 h-8 rounded-full border-2 border-[#162A45] object-cover" src="https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=200&auto=format&fit=crop" alt="Admin" />
                    <div className="w-8 h-8 rounded-full border-2 border-[#162A45] bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">+2</div>
                  </div>
                </div>

                {/* Sports Admin Card */}
                <div className="bg-[#162A45] rounded-xl p-6 border border-outline-variant/30 relative overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <h3 className="font-headline-md text-[20px] text-on-surface flex items-center gap-2">
                        Sports Admin
                      </h3>
                      <p className="font-label-caps text-[12px] md:text-label-caps text-primary mt-1">OPERATIONAL</p>
                    </div>
                  </div>
                  <p className="font-body-md text-sm md:text-body-md text-on-surface-variant relative z-10">
                    Manage day-to-day operations: Students, Sports, Results, and Data Imports. Cannot modify roles or audit logs.
                  </p>
                  <div className="mt-4 flex -space-x-3 relative z-10">
                    <img className="w-8 h-8 rounded-full border-2 border-[#162A45] object-cover" src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop" alt="Admin" />
                    <img className="w-8 h-8 rounded-full border-2 border-[#162A45] object-cover" src="https://images.unsplash.com/photo-1526314141639-c5ec37df32f8?q=80&w=200&auto=format&fit=crop" alt="Admin" />
                    <img className="w-8 h-8 rounded-full border-2 border-[#162A45] object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" alt="Admin" />
                    <div className="w-8 h-8 rounded-full border-2 border-[#162A45] bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">+12</div>
                  </div>
                </div>

                {/* Viewer Card */}
                <div className="bg-[#162A45]/50 rounded-xl p-6 border border-outline-variant/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-headline-md text-[20px] text-on-surface-variant flex items-center gap-2">
                        Viewer
                      </h3>
                      <p className="font-label-caps text-[12px] md:text-label-caps text-on-surface-variant mt-1">READ-ONLY</p>
                    </div>
                  </div>
                  <p className="font-body-md text-sm md:text-body-md text-on-surface-variant">
                    Can view statistics, leaderboards, and basic reports. No modification permissions.
                  </p>
                </div>
              </section>

              {/* Active Administrators List (Right Column) */}
              <section className="lg:col-span-8 bg-[#162A45] rounded-xl border border-outline-variant/30 flex flex-col overflow-hidden">
                <div className="p-4 md:p-6 border-b border-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-container-low/50">
                  <h2 className="font-headline-md text-[20px] md:text-headline-md text-on-surface">Active Administrators</h2>
                  <div className="relative w-full sm:w-auto">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
                    <input className="bg-surface-container-highest border-none rounded-lg pl-10 pr-4 py-2 text-on-surface font-body-md text-[14px] focus:ring-1 focus:ring-primary w-full sm:w-64 outline-none" placeholder="Search admins..." type="text" />
                  </div>
                </div>
                
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-surface-container-low border-b border-outline-variant/20">
                        <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase">Administrator</th>
                        <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase">Role</th>
                        <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase">Last Active</th>
                        <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                      
                      {/* Admin Row 1 */}
                      <tr className="hover:bg-surface-container-highest/30 transition-colors group">
                        <td className="py-3 px-6">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <img className="w-10 h-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=200&auto=format&fit=crop" alt="Admin" />
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-[#162A45]"></div>
                            </div>
                            <div>
                              <p className="font-body-md font-bold text-on-surface">Dr. Evelyn Sterling</p>
                              <p className="font-label-caps text-[12px] text-on-surface-variant">evelyn.s@univ.edu</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rank-gold/10 text-rank-gold font-label-caps text-[11px] border border-rank-gold/20">
                            <span className="material-symbols-outlined text-[14px]">shield_person</span> SUPER ADMIN
                          </span>
                        </td>
                        <td className="py-3 px-6 font-data-tabular text-data-tabular text-on-surface-variant text-[14px]">
                          Just now
                        </td>
                        <td className="py-3 px-6 text-right">
                          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </td>
                      </tr>

                      {/* Admin Row 2 */}
                      <tr className="hover:bg-surface-container-highest/30 transition-colors group">
                        <td className="py-3 px-6">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <img className="w-10 h-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop" alt="Admin" />
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-surface-container-highest rounded-full border-2 border-[#162A45]"></div>
                            </div>
                            <div>
                              <p className="font-body-md font-bold text-on-surface">Marcus Vance</p>
                              <p className="font-label-caps text-[12px] text-on-surface-variant">m.vance@univ.edu</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary font-label-caps text-[11px] border border-primary/20">
                            SPORTS ADMIN
                          </span>
                        </td>
                        <td className="py-3 px-6 font-data-tabular text-data-tabular text-on-surface-variant text-[14px]">
                          2 hours ago
                        </td>
                        <td className="py-3 px-6 text-right">
                          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </td>
                      </tr>

                      {/* Admin Row 3 */}
                      <tr className="hover:bg-surface-container-highest/30 transition-colors group">
                        <td className="py-3 px-6">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-headline-md text-[16px]">
                                SJ
                              </div>
                            </div>
                            <div>
                              <p className="font-body-md font-bold text-on-surface">Sarah Jenkins</p>
                              <p className="font-label-caps text-[12px] text-on-surface-variant">s.jenkins@univ.edu</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-highest text-on-surface-variant font-label-caps text-[11px] border border-outline-variant/30">
                            VIEWER
                          </span>
                        </td>
                        <td className="py-3 px-6 font-data-tabular text-data-tabular text-on-surface-variant text-[14px]">
                          1 day ago
                        </td>
                        <td className="py-3 px-6 text-right">
                          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </section>

            </div>

            {/* Permission Matrix Section */}
            <section className="space-y-8 pb-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-outline-variant/20 pb-4">
                <div>
                  <h2 className="font-headline-lg text-[24px] md:text-headline-lg text-on-surface">Module Permissions Configuration</h2>
                  <p className="font-body-md text-sm md:text-body-md text-on-surface-variant mt-2">Fine-tune specific access rights for the 'Sports Admin' role.</p>
                </div>
                
                {/* Role Selector Dropdown */}
                <div className="relative w-full md:w-auto min-w-[200px]">
                  <select className="appearance-none w-full bg-[#162A45] border border-outline-variant/50 text-on-surface font-body-md rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
                    <option disabled value="super">Super Admin (Fixed)</option>
                    <option defaultValue="sports">Sports Admin</option>
                    <option disabled value="viewer">Viewer (Fixed)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Glassmorphism Card for Matrix */}
              <div className="bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl border border-outline-variant/30 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                
                {/* Module Group 1 */}
                <div className="border-b border-outline-variant/20 p-4 md:p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-[18px]">sports_martial_arts</span>
                    </div>
                    <h3 className="font-headline-md text-[20px] text-on-surface">Core Athletics Data</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    
                    {/* Toggle Item */}
                    <div className="bg-[#162A45] p-4 rounded-xl flex items-center justify-between border border-transparent hover:border-outline-variant/30 transition-colors">
                      <div>
                        <p className="font-body-md font-bold text-on-surface">Students</p>
                        <p className="font-label-caps text-[10px] text-on-surface-variant mt-1">READ / WRITE</p>
                      </div>
                      <button 
                        className={`relative inline-block w-11 h-6 align-middle select-none rounded-full transition-colors ${permissions.students ? 'bg-primary' : 'bg-surface-container-highest'}`}
                        onClick={() => togglePermission('students')}
                      >
                        <span className={`absolute block w-5 h-5 rounded-full bg-white top-0.5 transition-transform shadow-[0_2px_4px_rgba(0,0,0,0.2)] ${permissions.students ? 'translate-x-5.5 left-0.5' : 'translate-x-0 left-0.5'}`} style={{ transform: permissions.students ? 'translateX(20px)' : 'translateX(0px)' }}></span>
                      </button>
                    </div>

                    {/* Toggle Item */}
                    <div className="bg-[#162A45] p-4 rounded-xl flex items-center justify-between border border-transparent hover:border-outline-variant/30 transition-colors">
                      <div>
                        <p className="font-body-md font-bold text-on-surface">Sports</p>
                        <p className="font-label-caps text-[10px] text-on-surface-variant mt-1">READ / WRITE</p>
                      </div>
                      <button 
                        className={`relative inline-block w-11 h-6 align-middle select-none rounded-full transition-colors ${permissions.sports ? 'bg-primary' : 'bg-surface-container-highest'}`}
                        onClick={() => togglePermission('sports')}
                      >
                        <span className={`absolute block w-5 h-5 rounded-full bg-white top-0.5 transition-transform shadow-[0_2px_4px_rgba(0,0,0,0.2)] ${permissions.sports ? 'translate-x-5.5 left-0.5' : 'translate-x-0 left-0.5'}`} style={{ transform: permissions.sports ? 'translateX(20px)' : 'translateX(0px)' }}></span>
                      </button>
                    </div>

                    {/* Toggle Item */}
                    <div className="bg-[#162A45] p-4 rounded-xl flex items-center justify-between border border-transparent hover:border-outline-variant/30 transition-colors">
                      <div>
                        <p className="font-body-md font-bold text-on-surface">Events</p>
                        <p className="font-label-caps text-[10px] text-on-surface-variant mt-1">READ / WRITE</p>
                      </div>
                      <button 
                        className={`relative inline-block w-11 h-6 align-middle select-none rounded-full transition-colors ${permissions.events ? 'bg-primary' : 'bg-surface-container-highest'}`}
                        onClick={() => togglePermission('events')}
                      >
                        <span className={`absolute block w-5 h-5 rounded-full bg-white top-0.5 transition-transform shadow-[0_2px_4px_rgba(0,0,0,0.2)] ${permissions.events ? 'translate-x-5.5 left-0.5' : 'translate-x-0 left-0.5'}`} style={{ transform: permissions.events ? 'translateX(20px)' : 'translateX(0px)' }}></span>
                      </button>
                    </div>

                    {/* Toggle Item */}
                    <div className="bg-[#162A45] p-4 rounded-xl flex items-center justify-between border border-transparent hover:border-outline-variant/30 transition-colors">
                      <div>
                        <p className="font-body-md font-bold text-on-surface">Results</p>
                        <p className="font-label-caps text-[10px] text-on-surface-variant mt-1">APPROVER</p>
                      </div>
                      <button 
                        className={`relative inline-block w-11 h-6 align-middle select-none rounded-full transition-colors ${permissions.results ? 'bg-primary' : 'bg-surface-container-highest'}`}
                        onClick={() => togglePermission('results')}
                      >
                        <span className={`absolute block w-5 h-5 rounded-full bg-white top-0.5 transition-transform shadow-[0_2px_4px_rgba(0,0,0,0.2)] ${permissions.results ? 'translate-x-5.5 left-0.5' : 'translate-x-0 left-0.5'}`} style={{ transform: permissions.results ? 'translateX(20px)' : 'translateX(0px)' }}></span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Module Group 2 */}
                <div className="p-4 md:p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-error/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-error text-[18px]">admin_panel_settings</span>
                    </div>
                    <h3 className="font-headline-md text-[20px] text-on-surface">System & Rules</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* Toggle Item - Disabled */}
                    <div className="bg-[#162A45]/50 p-4 rounded-xl flex items-center justify-between border border-outline-variant/10 opacity-70">
                      <div>
                        <p className="font-body-md font-bold text-on-surface">Point Rules</p>
                        <p className="font-label-caps text-[10px] text-on-surface-variant mt-1">READ-ONLY</p>
                      </div>
                      <button disabled className="relative inline-block w-11 h-6 align-middle select-none rounded-full bg-surface-container-highest cursor-not-allowed opacity-50">
                        <span className="absolute block w-5 h-5 rounded-full bg-white top-0.5 left-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.2)]"></span>
                      </button>
                    </div>

                    {/* Toggle Item - Disabled */}
                    <div className="bg-[#162A45]/50 p-4 rounded-xl flex items-center justify-between border border-outline-variant/10 opacity-70">
                      <div>
                        <p className="font-body-md font-bold text-on-surface">Audit Logs</p>
                        <p className="font-label-caps text-[10px] text-error mt-1">NO ACCESS</p>
                      </div>
                      <button disabled className="relative inline-block w-11 h-6 align-middle select-none rounded-full bg-surface-container-highest cursor-not-allowed opacity-50">
                        <span className="absolute block w-5 h-5 rounded-full bg-white top-0.5 left-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.2)]"></span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Save Actions */}
                <div className="bg-surface-container-highest/20 p-4 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-end gap-4">
                  <button className="px-6 py-2 rounded-lg text-on-surface-variant font-headline-md text-[14px] font-bold hover:bg-surface-container-high transition-colors w-full sm:w-auto">
                    Discard Changes
                  </button>
                  <button className="bg-primary hover:bg-primary/90 px-6 py-2 rounded-lg text-on-primary font-headline-md text-[14px] font-bold transition-all w-full sm:w-auto">
                    Save Configuration
                  </button>
                </div>
              </div>
            </section>

          </div>
        
      </div>
    </AdminLayout>
  );
}
