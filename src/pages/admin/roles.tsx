import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

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
    <>
      <Head>
        <title>Role & Permissions - Admin Portal</title>
      </Head>
      
      <div className="flex h-screen overflow-hidden font-body-md text-body-md bg-background text-on-surface">
        
        {/* SideNavBar */}
        <nav className="hidden md:flex flex-col h-full bg-surface-container border-r border-outline-variant/30 w-64 p-gutter gap-base z-10 shrink-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 shrink-0 flex items-center justify-center bg-surface-container-high">
              <span className="font-headline-md font-bold text-on-surface">U</span>
            </div>
            <div>
              <h2 className="text-headline-md font-headline-md font-bold text-on-surface leading-tight">Admin Portal</h2>
              <span className="font-label-caps text-label-caps text-on-surface-variant block mt-1">Manage Athletics</span>
            </div>
          </div>
          
          <button className="w-full py-3 bg-primary text-on-primary rounded-lg font-headline-md text-[14px] font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mb-4 group">
            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">summarize</span>
            Generate Report
          </button>
          
          <div className="flex flex-col gap-1 flex-1 overflow-y-auto">
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface rounded-lg transition-all duration-200 hover:translate-x-1" href="/admin/students">
              <span className="material-symbols-outlined">group</span>
              <span className="font-body-md text-body-md">Students</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface rounded-lg transition-all duration-200 hover:translate-x-1" href="/admin/dashboard">
              <span className="material-symbols-outlined">analytics</span>
              <span className="font-body-md text-body-md">Data Import</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface rounded-lg transition-all duration-200 hover:translate-x-1" href="/admin/results">
              <span className="material-symbols-outlined">emoji_events</span>
              <span className="font-body-md text-body-md">Results</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface rounded-lg transition-all duration-200 hover:translate-x-1" href="/admin/rules">
              <span className="material-symbols-outlined">rule</span>
              <span className="font-body-md text-body-md">Point Rules</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface rounded-lg transition-all duration-200 hover:translate-x-1" href="/admin/audit">
              <span className="material-symbols-outlined">history</span>
              <span className="font-body-md text-body-md">Audit Logs</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-lg font-bold transition-all duration-200" href="/admin/roles">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
              <span className="font-body-md text-body-md">Roles & Permissions</span>
            </a>
          </div>
          
          <div className="mt-auto pt-4 border-t border-outline-variant/20 flex flex-col gap-1">
            <button onClick={() => signOut()} className="flex items-center gap-3 px-4 py-3 text-error hover:bg-error/10 rounded-lg transition-all duration-200 hover:translate-x-1 w-full text-left">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-body-md text-body-md">Sign Out</span>
            </button>
          </div>
        </nav>

        {/* Mobile Top Nav Placeholder */}
        <nav className="md:hidden flex items-center justify-between p-4 bg-surface-container border-b border-outline-variant/30 sticky top-0 z-50 absolute w-full">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-on-surface">Admin</h1>
          <button className="text-on-surface"><span className="material-symbols-outlined">menu</span></button>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-margin-mobile md:p-margin-desktop relative pt-[72px] md:pt-margin-desktop bg-background text-on-surface">
          
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
                    <img className="w-8 h-8 rounded-full border-2 border-[#162A45] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4rfrcCq6Hf9fCDWJPQsMBL9VDz3oVxs71UtFjv2_ojjWs85a2oAt6LyunP1Y4qbJZ9uV_xRs6QJ5gbyjNwZWuDX4J0zMlUZ-TDkhT-nyc7Ck6HWK7vTC-hdkOLzM5K5ggIqs1VKcvt1PdBsFYZYtexwz45xkbVtoS4yWPzWJDgS4-hEpxjQRpKh9iPEEVCJ87SQeXDkmzhUbStKubqkHTtDyXIeW7E9jPqABJDC4JweHaXdmB3eM" alt="Admin" />
                    <img className="w-8 h-8 rounded-full border-2 border-[#162A45] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6TbBRCZQLlCB64IOeKxYhoJ72pTCw1Gnz7GQkKWAag9K-NPx0Q2hkutuGRzxqH8EqC6CWZrmoJRspHrmlG_GzcT4MyptKjkhqDQsby9daMGiHdut2IdgO2DhVmiUjSl41X1o6C_WfZT7N_dDxChBbkCdzf4So6igwvpBjfotIlcFwMz6Ju4gYdo4VQqpi_n0TIP9t7dxbGTGoTn91HYh3F5YllRv3IwOw41hrWTchLsb3jPf0Wf0" alt="Admin" />
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
                    <img className="w-8 h-8 rounded-full border-2 border-[#162A45] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1i42W6Bd-Pn1Y-TpdaPr8hkKudI6VPVhJHBdOhjUP9OhYKkb75St8YTzT_W_udnXcVbkkDAbN5axdAEnUIfsqhDzcEhZNFtHwq_vIRVBj1NzCCUliZsbb7T6jSrFxMuVPdE1ETcMYJWTJg7nvW8ElIKZK_mYQU-vzeGTaBir5oRCXiCf2fRYZfzekDUjxXXPY-gjF2DoNZYAoxA-hoq-kcs0GtjcelE7ZdONGGreemCvd02XHcqQ" alt="Admin" />
                    <img className="w-8 h-8 rounded-full border-2 border-[#162A45] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxQUOhUNAArPCqbF-uHKbqJXWL74K2vnuUzP7h15PTW0QqzDrkU21Tm7JhoObdeDovmk_yDvUTLkmn-9e4qyrUTvGSCmIqSRVU0a5j846MNog-JkcWTOvyxakF3uucCTHNBm4cGbB2Usq6D_s2rXroFTVIDsMIy2dKRbVquCuCeKj8t4k_CkQUua0kctB2PIQM3q-rh-GNikQC9ndOy9dypFaZ3F9Z1CiDYM3xDqFjUQO6oWWmkL4" alt="Admin" />
                    <img className="w-8 h-8 rounded-full border-2 border-[#162A45] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC8HP_eE8bRWCLWe-Yh6jUEZyFtNt00WJgh-ZM53uKrWVPufg5okAYzf07yW7oOKmi-Pkcm5JIxmHMlOE9_5VoWWvSuHk00-tepSh0qbu5vvrEqlDo7-DgOFUhqqb2qgNiyUaGnch6SPadzSTThtmBURqrvvxXa0LsIUwZejrVqf4v4t77xfokCsN5R5-Sao5J4FampiNgJXQrbV7IAFWTiDnhO6FpXmHOgG9h2bGNQY535amCtM4" alt="Admin" />
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
                              <img className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI2I507rw4NgVDqmuSVTwBUGqfaCIVcAkh34bXec1XIg3ydWdMhYwJPDrm-1lztyrtU5lYKsfsx2aS3qWQwPsFw-xaEiPg6hppV2XUJgxDb9mFXsP5mczuR2V0LkrDEjuaBXNGxaxGcJCta2vEfHKwk2-125NpaDDiuqpIodRVdjbz1NVlcKblMp6gelJfRTLuWArs-NvTt7CEtZv0TF4L42q1QZc8rKBM-y9d_kJsNdc1Nn6DtHU" alt="Admin" />
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
                              <img className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4so7Th3FOkdHjx8yyRF8Pdi6fAAdpSexg-HfOTewjpr_Dl760PFPbltKjdDa0Rz_pBNdF1rA3FF4kwPrBNC1IM8DxPmgjQYS8QxFXoFuiZEf9h8FJUFd2WHk2vGuaC7baKERZkm-5_UeRrBfwhvzQSG37z1Rn6xq_CkDl3VU6WZJ1YvYRaUbRBVVAAk3VbRW84TQAZKCvhGI4z5SGyfvZxy_Nk6v-L23Q6cbH2OB9feEMy_Y0RjA" alt="Admin" />
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
        </main>
      </div>
    </>
  );
}
