import React from "react";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function AdminRules() {
  const { data: session, status } = useSession({ required: true, onUnauthenticated() { router.push('/admin/login'); } });
  const router = useRouter();

  if (status === "loading") {
    return <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center text-on-surface">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Point Rules Configuration - Admin Portal</title>
      </Head>
      
      <div className="flex h-screen overflow-hidden font-body-md text-body-md bg-background text-on-background">
        
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
            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">add_chart</span>
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
            <a className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-lg font-bold transition-all duration-200" href="/admin/rules">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>rule</span>
              <span className="font-body-md text-body-md">Point Rules</span>
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
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-background relative pt-[72px] md:pt-0">
          
          <div className="flex-1 overflow-y-auto p-margin-mobile md:p-margin-desktop">
            <div className="max-w-container-max mx-auto flex flex-col gap-8">
              
              {/* Header & Warning */}
              <header className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                  <div>
                    <h1 className="font-headline-xl text-[32px] md:text-headline-xl text-on-surface mb-2 tracking-tighter">Point Rules Configuration</h1>
                    <p className="text-on-surface-variant font-body-lg text-sm md:text-body-lg">Adjust the weighting system for global leaderboard calculations.</p>
                  </div>
                  <button className="bg-primary text-on-primary font-headline-md text-body-md font-bold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2 w-full md:w-auto justify-center">
                    <span className="material-symbols-outlined">save</span> Save Changes
                  </button>
                </div>

                {/* Warning Banner */}
                <div className="bg-warning/10 border-l-4 border-warning p-4 rounded-r-lg flex items-start gap-4">
                  <span className="material-symbols-outlined text-warning mt-1">warning</span>
                  <div>
                    <h4 className="font-headline-md text-body-md font-bold text-warning mb-1">System Impact Warning</h4>
                    <p className="text-on-surface-variant text-sm">Changing rules will trigger a background recalculation of all leaderboards. This process may take several minutes and affect live rankings.</p>
                  </div>
                </div>
              </header>

              {/* Grid Layout for Config */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
                
                {/* Left Column: Point Categories */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  
                  {/* Base Points */}
                  <div className="bg-[#162A45] rounded-xl p-4 md:p-6 border border-blue-500/20">
                    <h2 className="font-headline-lg text-[24px] md:text-headline-lg text-on-surface mb-6 border-b border-white/10 pb-4">Base Points</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Participation */}
                      <div className="flex flex-col gap-2">
                        <label className="font-label-caps text-[12px] md:text-label-caps text-on-surface-variant flex items-center justify-between">
                          Participation Points
                          <span className="material-symbols-outlined text-outline text-sm cursor-help" title="Awarded to all competing athletes regardless of placement.">info</span>
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none material-symbols-outlined text-outline">group_add</span>
                          <input className="w-full bg-surface-container-high border border-outline-variant pl-10 pr-4 py-3 rounded-lg font-data-tabular text-data-tabular text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" type="number" defaultValue="10" />
                        </div>
                      </div>
                      
                      {/* Bonus */}
                      <div className="flex flex-col gap-2">
                        <label className="font-label-caps text-[12px] md:text-label-caps text-on-surface-variant flex items-center justify-between">
                          Performance Bonus
                          <span className="material-symbols-outlined text-outline text-sm cursor-help" title="Discretionary multiplier based on historical performance metric breaks.">info</span>
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none material-symbols-outlined text-outline">star</span>
                          <input className="w-full bg-surface-container-high border border-outline-variant pl-10 pr-4 py-3 rounded-lg font-data-tabular text-data-tabular text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" type="number" defaultValue="10" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rank Multipliers */}
                  <div className="bg-[#162A45] rounded-xl p-4 md:p-6 border border-blue-500/20">
                    <h2 className="font-headline-lg text-[24px] md:text-headline-lg text-on-surface mb-6 border-b border-white/10 pb-4">Rank Multipliers</h2>
                    <div className="flex flex-col gap-4">
                      
                      {/* Gold */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-surface-container/50 p-4 rounded-lg border border-rank-gold/30">
                        <div className="w-12 h-12 rounded-full bg-rank-gold/20 flex items-center justify-center shrink-0 border border-rank-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                          <span className="font-headline-md text-rank-gold font-bold">1</span>
                        </div>
                        <div className="flex-1">
                          <label className="font-label-caps text-label-caps text-rank-gold block mb-1">Gold Rank Value</label>
                          <p className="text-sm text-on-surface-variant">Awarded for 1st place finishes.</p>
                        </div>
                        <div className="w-full sm:w-32 mt-2 sm:mt-0">
                          <input className="w-full bg-surface-container-high border border-outline-variant px-4 py-2 rounded-lg font-data-tabular text-data-tabular text-on-surface text-right focus:border-rank-gold focus:ring-1 focus:ring-rank-gold/50 outline-none transition-all" type="number" defaultValue="50" />
                        </div>
                      </div>

                      {/* Silver */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-surface-container/50 p-4 rounded-lg border border-rank-silver/30">
                        <div className="w-12 h-12 rounded-full bg-rank-silver/20 flex items-center justify-center shrink-0 border border-rank-silver shadow-[0_0_15px_rgba(192,192,192,0.2)]">
                          <span className="font-headline-md text-rank-silver font-bold">2</span>
                        </div>
                        <div className="flex-1">
                          <label className="font-label-caps text-label-caps text-rank-silver block mb-1">Silver Rank Value</label>
                          <p className="text-sm text-on-surface-variant">Awarded for 2nd place finishes.</p>
                        </div>
                        <div className="w-full sm:w-32 mt-2 sm:mt-0">
                          <input className="w-full bg-surface-container-high border border-outline-variant px-4 py-2 rounded-lg font-data-tabular text-data-tabular text-on-surface text-right focus:border-rank-silver focus:ring-1 focus:ring-rank-silver/50 outline-none transition-all" type="number" defaultValue="30" />
                        </div>
                      </div>

                      {/* Bronze */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-surface-container/50 p-4 rounded-lg border border-rank-bronze/30">
                        <div className="w-12 h-12 rounded-full bg-rank-bronze/20 flex items-center justify-center shrink-0 border border-rank-bronze shadow-[0_0_15px_rgba(205,127,50,0.2)]">
                          <span className="font-headline-md text-rank-bronze font-bold">3</span>
                        </div>
                        <div className="flex-1">
                          <label className="font-label-caps text-label-caps text-rank-bronze block mb-1">Bronze Rank Value</label>
                          <p className="text-sm text-on-surface-variant">Awarded for 3rd place finishes.</p>
                        </div>
                        <div className="w-full sm:w-32 mt-2 sm:mt-0">
                          <input className="w-full bg-surface-container-high border border-outline-variant px-4 py-2 rounded-lg font-data-tabular text-data-tabular text-on-surface text-right focus:border-rank-bronze focus:ring-1 focus:ring-rank-bronze/50 outline-none transition-all" type="number" defaultValue="15" />
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Right Column: Logic Explanation */}
                <div className="flex flex-col gap-6">
                  <div className="bg-[#162A45] rounded-xl p-6 border border-blue-500/20 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="material-symbols-outlined text-primary text-[28px] md:text-3xl">functions</span>
                      <h2 className="font-headline-lg text-[24px] md:text-headline-lg text-on-surface">Scoring Logic</h2>
                    </div>
                    
                    <p className="text-on-surface-variant font-body-md text-sm md:text-body-md mb-8">
                      The total score for an athlete in a given event is calculated dynamically based on the current ruleset.
                    </p>
                    
                    <div className="bg-surface-container-lowest rounded-lg p-5 border border-white/5 font-data-tabular text-[12px] md:text-sm flex flex-col gap-4 flex-1">
                      <div className="text-on-surface-variant font-label-caps">Current Formula Example (1st Place):</div>
                      
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-outline">Base Participation</span>
                        <span className="text-primary font-bold">10</span>
                      </div>
                      
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-outline">+ Rank Multiplier (Gold)</span>
                        <span className="text-rank-gold font-bold">50</span>
                      </div>
                      
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-outline">+ Performance Bonus</span>
                        <span className="text-tertiary font-bold">10</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 mt-auto">
                        <span className="text-on-surface font-headline-md text-[16px] md:text-headline-md">Total Points</span>
                        <span className="text-success font-headline-xl text-[28px] md:text-headline-xl">70</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
