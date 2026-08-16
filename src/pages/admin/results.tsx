import React from "react";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import AdminLayout from "../../components/AdminLayout";

export default function AdminResults() {
  const { data: session, status } = useSession({ required: true, onUnauthenticated() { router.push('/admin/login'); } });
  const router = useRouter();

  if (status === "loading") {
    return <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center text-on-surface">Loading...</div>;
  }

  return (
    <AdminLayout title="Record New Result - Admin Portal">
      <div className="flex-1 overflow-y-auto w-full">

          
          {/* Header */}
          <header className="h-24 md:h-20 flex flex-col md:flex-row items-start md:items-center justify-between px-margin-mobile md:px-margin-desktop py-4 md:py-0 border-b border-outline-variant/20 shrink-0 relative z-10 bg-surface-container-lowest/80 backdrop-blur-md">
            <div className="mb-4 md:mb-0">
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface tracking-tight">Record New Result</h1>
              <p className="font-body-md text-sm md:text-body-md text-on-surface-variant mt-1">Select event and assign points accurately.</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface-variant font-headline-md text-[14px] hover:text-on-surface hover:bg-surface-container-high transition-colors w-1/2 md:w-auto">Cancel</button>
              <button className="px-6 py-2 rounded-lg bg-primary text-on-primary font-headline-md text-[14px] shadow-[0_4px_0_0_#004395] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#004395] transition-all active:translate-y-[4px] active:shadow-none font-bold w-1/2 md:w-auto">Save Result</button>
            </div>
          </header>

          {/* Form Canvas */}
          <div className="flex-1 overflow-y-auto p-margin-mobile md:p-margin-desktop">
            <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Multi-step Form (8 cols) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                
                {/* Progress Tracker */}
                <div className="flex items-center justify-between px-4 py-2 bg-surface-container rounded-full border border-outline-variant/30 mb-2 overflow-x-auto hide-scrollbar">
                  <div className="flex items-center gap-2 text-primary shrink-0">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 font-label-caps text-[12px]">1</span>
                    <span className="font-label-caps text-label-caps hidden sm:inline">Event</span>
                  </div>
                  <div className="h-px bg-outline-variant/50 flex-1 mx-4 min-w-[20px]"></div>
                  <div className="flex items-center gap-2 text-primary shrink-0">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 font-label-caps text-[12px]">2</span>
                    <span className="font-label-caps text-label-caps hidden sm:inline">Athletes</span>
                  </div>
                  <div className="h-px bg-outline-variant/50 flex-1 mx-4 min-w-[20px]"></div>
                  <div className="flex items-center gap-2 text-primary shrink-0">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary font-bold text-on-primary font-label-caps text-[12px]">3</span>
                    <span className="font-label-caps text-label-caps text-on-surface font-bold">Results</span>
                  </div>
                </div>

                {/* Step 3: Enter Results (Currently Active View) */}
                <section className="bg-surface-container/50 backdrop-blur-md rounded-xl p-4 md:p-6 border-l-4 border-l-primary border border-outline-variant/20 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                    <span className="material-symbols-outlined text-[120px]">emoji_events</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 relative z-10 gap-4">
                    <div>
                      <h3 className="font-headline-md text-[20px] md:text-headline-md text-on-surface">Assign Positions</h3>
                      <p className="text-on-surface-variant font-body-md mt-1">100m Sprint - Men's Final</p>
                    </div>
                    <div className="bg-surface-container-high px-3 py-1 rounded border border-outline-variant/30 w-fit">
                      <span className="font-label-caps text-[12px] md:text-label-caps text-primary">8 Athletes Selected</span>
                    </div>
                  </div>

                  {/* Data Table for Results Input */}
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="border-b border-white/10 font-label-caps text-[12px] md:text-label-caps text-on-surface-variant">
                          <th className="py-3 px-2 w-16">Rank</th>
                          <th className="py-3 px-4">Athlete</th>
                          <th className="py-3 px-4 w-32">Time/Score</th>
                          <th className="py-3 px-4 w-16 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Row 1: Gold */}
                        <tr className="border-b border-white/5 hover:bg-surface-container-high/30 transition-colors group">
                          <td className="py-3 px-2">
                            <div className="w-8 h-8 rounded-full bg-rank-gold flex items-center justify-center text-[#000] font-data-tabular font-bold shadow-[0_0_8px_rgba(212,175,55,0.4)]">1</div>
                          </td>
                          <td className="py-3 px-4 flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-outline-variant/30 shrink-0">
                              <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=800&auto=format&fit=crop" alt="Marcus Johnson" />
                            </div>
                            <div>
                              <div className="font-headline-md text-[14px] md:text-[16px] text-on-surface">Marcus Johnson</div>
                              <div className="font-label-caps text-[10px] md:text-[12px] text-on-surface-variant">Computer Science</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <input className="w-full bg-surface-container border border-outline-variant/50 rounded px-2 py-1 text-on-surface font-data-tabular text-data-tabular focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" type="text" defaultValue="9.85s"/>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button className="text-outline hover:text-error transition-colors p-1"><span className="material-symbols-outlined text-[20px]">close</span></button>
                          </td>
                        </tr>
                        
                        {/* Row 2: Silver */}
                        <tr className="border-b border-white/5 hover:bg-surface-container-high/30 transition-colors group">
                          <td className="py-3 px-2">
                            <div className="w-8 h-8 rounded-full bg-rank-silver flex items-center justify-center text-[#000] font-data-tabular font-bold shadow-[0_0_8px_rgba(192,192,192,0.4)]">2</div>
                          </td>
                          <td className="py-3 px-4 flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-outline-variant/30 shrink-0">
                              <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop" alt="David Chen" />
                            </div>
                            <div>
                              <div className="font-headline-md text-[14px] md:text-[16px] text-on-surface">David Chen</div>
                              <div className="font-label-caps text-[10px] md:text-[12px] text-on-surface-variant">Engineering</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <input className="w-full bg-surface-container border border-outline-variant/50 rounded px-2 py-1 text-on-surface font-data-tabular text-data-tabular focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" type="text" defaultValue="9.92s"/>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button className="text-outline hover:text-error transition-colors p-1"><span className="material-symbols-outlined text-[20px]">close</span></button>
                          </td>
                        </tr>

                        {/* Row 3: Bronze */}
                        <tr className="border-b border-white/5 hover:bg-surface-container-high/30 transition-colors group">
                          <td className="py-3 px-2">
                            <div className="w-8 h-8 rounded-full bg-rank-bronze flex items-center justify-center text-[#fff] font-data-tabular font-bold shadow-[0_0_8px_rgba(205,127,50,0.4)]">3</div>
                          </td>
                          <td className="py-3 px-4 flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-outline-variant/30 shrink-0">
                              <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop" alt="Elijah Williams" />
                            </div>
                            <div>
                              <div className="font-headline-md text-[14px] md:text-[16px] text-on-surface">Elijah Williams</div>
                              <div className="font-label-caps text-[10px] md:text-[12px] text-on-surface-variant">Business</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <input className="w-full bg-surface-container border border-outline-variant/50 rounded px-2 py-1 text-on-surface font-data-tabular text-data-tabular focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" type="text" defaultValue="10.05s"/>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button className="text-outline hover:text-error transition-colors p-1"><span className="material-symbols-outlined text-[20px]">close</span></button>
                          </td>
                        </tr>

                        {/* Row 4: Unassigned */}
                        <tr className="hover:bg-surface-container-high/30 transition-colors group">
                          <td className="py-3 px-2">
                            <div className="w-8 h-8 rounded-full border border-primary text-primary flex items-center justify-center font-data-tabular font-bold">4</div>
                          </td>
                          <td className="py-3 px-4 flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-outline-variant/30 bg-surface-container-high flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-outline">person</span>
                            </div>
                            <div>
                              <div className="font-headline-md text-[14px] md:text-[16px] text-on-surface-variant italic">Select Athlete...</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <input className="w-full bg-surface-container/50 border border-outline-variant/30 rounded px-2 py-1 text-on-surface-variant font-data-tabular text-data-tabular focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="--.--" type="text"/>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button className="text-primary hover:text-primary-fixed-dim transition-colors flex items-center justify-center gap-1 font-label-caps text-[12px] mx-auto">
                              <span className="material-symbols-outlined text-[16px]">add_circle</span> Add
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-center">
                    <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-label-caps text-[12px] md:text-label-caps">
                      <span className="material-symbols-outlined">expand_more</span> Show 4 Remaining Athletes
                    </button>
                  </div>
                </section>
              </div>
              
              {/* Right Column: Points Preview Card (4 cols) */}
              <div className="lg:col-span-4 lg:sticky lg:top-4 pb-8">
                <div className="bg-surface-container/50 backdrop-blur-md rounded-xl border border-primary/30 overflow-hidden flex flex-col shadow-[0_8px_32px_rgba(0,90,194,0.15)]">
                  {/* Card Header */}
                  <div className="bg-primary-container/20 p-5 border-b border-primary/20">
                    <h3 className="font-headline-md text-[18px] md:text-[20px] font-bold text-primary flex items-center gap-2">
                      <span className="material-symbols-outlined">calculate</span>
                      Points Preview
                    </h3>
                    <p className="font-body-md text-[12px] md:text-[14px] text-on-surface-variant mt-1">Live calculation based on current positions.</p>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-5 flex flex-col gap-4">
                    {/* Marcus preview */}
                    <div className="bg-surface-container rounded-lg p-4 border border-outline-variant/20 hover:border-rank-gold/50 transition-colors">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-rank-gold shadow-[0_0_4px_#D4AF37]"></div>
                          <span className="font-headline-md text-[14px] font-bold text-on-surface">M. Johnson</span>
                        </div>
                        <span className="font-data-tabular text-[14px] text-rank-gold font-bold">1st</span>
                      </div>
                      <div className="flex flex-col gap-1 font-data-tabular text-[12px] text-on-surface-variant">
                        <div className="flex justify-between"><span>Participation</span> <span>+10</span></div>
                        <div className="flex justify-between"><span>Rank (Gold)</span> <span>+50</span></div>
                        <div className="flex justify-between text-success"><span>Record Bonus</span> <span>+5</span></div>
                        <div className="h-px bg-outline-variant/30 my-1"></div>
                        <div className="flex justify-between font-bold text-[14px] text-on-surface"><span>Total</span> <span>65 pts</span></div>
                      </div>
                    </div>
                    
                    {/* David preview */}
                    <div className="bg-surface-container rounded-lg p-4 border border-outline-variant/20 hover:border-rank-silver/50 transition-colors">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-rank-silver shadow-[0_0_4px_#C0C0C0]"></div>
                          <span className="font-headline-md text-[14px] font-bold text-on-surface">D. Chen</span>
                        </div>
                        <span className="font-data-tabular text-[14px] text-rank-silver font-bold">2nd</span>
                      </div>
                      <div className="flex flex-col gap-1 font-data-tabular text-[12px] text-on-surface-variant">
                        <div className="flex justify-between"><span>Participation</span> <span>+10</span></div>
                        <div className="flex justify-between"><span>Rank (Silver)</span> <span>+30</span></div>
                        <div className="h-px bg-outline-variant/30 my-1"></div>
                        <div className="flex justify-between font-bold text-[14px] text-on-surface"><span>Total</span> <span>40 pts</span></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Footer */}
                  <div className="bg-surface-container-low p-4 border-t border-outline-variant/20 mt-auto">
                    <div className="flex justify-between items-center font-label-caps text-[12px]">
                      <span className="text-on-surface-variant">Rule Applied:</span>
                      <span className="text-primary font-bold">Standard Track</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        
      </div>
    </AdminLayout>
  );
}
