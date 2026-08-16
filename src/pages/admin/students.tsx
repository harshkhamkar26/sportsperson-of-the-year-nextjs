import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function StudentManagement() {
  const { data: session, status } = useSession({ required: true, onUnauthenticated() { router.push('/admin/login'); } });
  const router = useRouter();

  if (status === "loading") {
    return <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center text-on-surface">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Student Management - Admin Portal</title>
      </Head>
      
      <div className="bg-surface-container-lowest text-on-surface font-body-md h-screen flex overflow-hidden">
        {/* SideNavBar */}
        <nav className="bg-surface-container border-r border-outline-variant/30 w-64 h-full flex flex-col p-gutter gap-base shrink-0 z-10 hidden md:flex">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high border-2 border-primary shrink-0 flex items-center justify-center font-headline-md font-bold text-on-surface">
              U
            </div>
            <div>
              <h1 className="text-headline-md font-headline-md font-bold text-on-surface">Admin Portal</h1>
              <p className="font-label-caps text-label-caps text-on-surface-variant">Manage Athletics</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 flex-1">
            <a className="bg-primary-container text-on-primary-container rounded-lg font-bold flex items-center gap-3 px-4 py-3 scale-95 duration-150" href="/admin/students">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
              <span className="font-body-md text-body-md">Students</span>
            </a>
            <a className="text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface rounded-lg flex items-center gap-3 px-4 py-3 hover:translate-x-1 transition-transform duration-200" href="/admin/dashboard">
              <span className="material-symbols-outlined">analytics</span>
              <span className="font-body-md text-body-md">Data Import</span>
            </a>
            <a className="text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface rounded-lg flex items-center gap-3 px-4 py-3 hover:translate-x-1 transition-transform duration-200" href="/">
              <span className="material-symbols-outlined">leaderboard</span>
              <span className="font-body-md text-body-md">View Leaderboard</span>
            </a>
          </div>

          <div className="flex flex-col gap-2 pt-6 border-t border-outline-variant/30">
            <button onClick={() => signOut()} className="text-error hover:bg-error/10 rounded-lg flex items-center gap-3 px-4 py-2 hover:translate-x-1 transition-all duration-200 text-left">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-body-md text-body-md">Sign Out</span>
            </button>
          </div>
        </nav>

        {/* Mobile Top Nav Placeholder */}
        <nav className="md:hidden flex items-center justify-between p-4 bg-surface-container border-b border-outline-variant/30 sticky top-0 z-50">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold">Admin</h1>
          <button><span className="material-symbols-outlined">menu</span></button>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 p-margin-mobile md:p-margin-desktop w-full max-w-container-max mx-auto h-screen flex flex-col overflow-y-auto">
          {/* Header Section */}
          <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="font-headline-xl text-headline-xl font-extrabold text-on-surface tracking-tighter mb-2">Student Directory</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Manage 1,024 active student-athletes across all disciplines.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-72">
                <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant">search</span>
                <input className="w-full bg-surface-container border border-outline-variant rounded-lg py-2 pl-10 pr-4 text-on-surface font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Search ID, Name, School..." type="text"/>
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
              
              {/* Row 1 */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 items-center border-b border-outline-variant/10 hover:bg-surface-container-highest transition-colors group border border-transparent hover:border-primary/50 hover:shadow-[4px_4px_0_0_rgba(173,198,255,1)] hover:-translate-y-[2px] rounded-lg m-1 cursor-pointer">
                <div className="col-span-1 hidden sm:block">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30 relative">
                    <img className="w-full h-full object-cover" alt="Student portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAchvp0U6_RqVbsuVuVn8z4EZNckMuuZjLJdwt1PpYMpWluKYg8ljUw4-K_cAt4S_THAoxuojTcrNYjb1j3_0HYO1YDsz1arXqixyz7_ii-6czN2k_MP-U3--L9fiuyh_PU2IA3243Ss_HNlS_rmmWnW3SXJJCgIgA9sedPBC7OqXrUc7qsG7GagatmCyn9F1FReton5szf7hUNiPBW14qgNl-MPwj76tKHODO0Fa1SJd805YNGNGQ"/>
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-4 flex flex-col justify-center">
                  <span className="font-body-lg text-body-lg font-semibold text-on-surface group-hover:text-primary transition-colors">Marcus Vance</span>
                  <span className="font-data-tabular text-data-tabular text-sm text-on-surface-variant">ID: UAI-2024-001</span>
                </div>
                <div className="col-span-2 hidden md:flex items-center">
                  <span className="font-body-md text-body-md text-on-surface-variant">Engineering</span>
                </div>
                <div className="col-span-2 hidden lg:flex items-center">
                  <div className="inline-flex items-center gap-2 bg-rank-gold/10 border border-rank-gold/30 px-3 py-1 rounded-full text-rank-gold shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                    <span className="material-symbols-outlined text-sm">workspace_premium</span>
                    <span className="font-label-caps text-label-caps text-[10px]">1st Overall</span>
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-2 text-right flex items-center justify-end">
                  <span className="font-data-tabular text-data-tabular text-primary font-bold">12,450</span>
                </div>
                <div className="col-span-3 sm:col-span-2 lg:col-span-1 text-right flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-md hover:bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 items-center border-b border-outline-variant/10 hover:bg-surface-container-highest transition-colors group border border-transparent hover:border-primary/50 hover:shadow-[4px_4px_0_0_rgba(173,198,255,1)] hover:-translate-y-[2px] rounded-lg m-1 cursor-pointer">
                <div className="col-span-1 hidden sm:block">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30 relative">
                    <img className="w-full h-full object-cover" alt="Student portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYnd9M_4J-HZKlQ6icq1WLN4ggtFqg-z8EzW0Pqtn9tG3k7PD8mNFl-HA0bjTR9X7oU-TaUuG-oXdBkkicwrHQVZ2Ch2j5cjnQvs2qoCauLD24pgGawA4O4gGXGJF2mm5d54QymsEEKcIepO44GbcQqW_0x0ZjVda6cxXJUK93YYhPLMQ7OVXNT_trLO5lWC3AC8tBSZZ2XgJOMMHXLZ2mTeMmw1HMNXt5_A8_0jwkcIPp3k4KDx0"/>
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-4 flex flex-col justify-center">
                  <span className="font-body-lg text-body-lg font-semibold text-on-surface group-hover:text-primary transition-colors">Elena Rodriguez</span>
                  <span className="font-data-tabular text-data-tabular text-sm text-on-surface-variant">ID: UAI-2024-042</span>
                </div>
                <div className="col-span-2 hidden md:flex items-center">
                  <span className="font-body-md text-body-md text-on-surface-variant">Data Science</span>
                </div>
                <div className="col-span-2 hidden lg:flex items-center">
                  <div className="inline-flex items-center gap-2 bg-rank-silver/10 border border-rank-silver/30 px-3 py-1 rounded-full text-rank-silver">
                    <span className="material-symbols-outlined text-sm">workspace_premium</span>
                    <span className="font-label-caps text-label-caps text-[10px]">2nd Overall</span>
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-2 text-right flex items-center justify-end">
                  <span className="font-data-tabular text-data-tabular text-on-surface">11,920</span>
                </div>
                <div className="col-span-3 sm:col-span-2 lg:col-span-1 text-right flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-md hover:bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 items-center border-b border-outline-variant/10 hover:bg-surface-container-highest transition-colors group border border-transparent hover:border-primary/50 hover:shadow-[4px_4px_0_0_rgba(173,198,255,1)] hover:-translate-y-[2px] rounded-lg m-1 cursor-pointer">
                <div className="col-span-1 hidden sm:block">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30 relative">
                    <div className="w-full h-full bg-surface-container-high flex items-center justify-center text-on-surface-variant font-label-caps">
                        TS
                    </div>
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-4 flex flex-col justify-center">
                  <span className="font-body-lg text-body-lg font-semibold text-on-surface group-hover:text-primary transition-colors">Tyler Smith</span>
                  <span className="font-data-tabular text-data-tabular text-sm text-on-surface-variant">ID: UAI-2023-891</span>
                </div>
                <div className="col-span-2 hidden md:flex items-center">
                  <span className="font-body-md text-body-md text-on-surface-variant">Business</span>
                </div>
                <div className="col-span-2 hidden lg:flex items-center">
                  <div className="inline-flex items-center gap-2 border border-outline-variant px-3 py-1 rounded-full text-on-surface-variant">
                    <span className="font-label-caps text-label-caps text-[10px]">Rank #45</span>
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-2 text-right flex items-center justify-end">
                  <span className="font-data-tabular text-data-tabular text-on-surface">4,200</span>
                </div>
                <div className="col-span-3 sm:col-span-2 lg:col-span-1 text-right flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-md hover:bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
              </div>

            </div>
            
            {/* Pagination Footer */}
            <div className="px-6 py-4 bg-surface-container-high border-t border-outline-variant/30 flex justify-between items-center mt-auto">
              <span className="font-body-md text-body-md text-on-surface-variant">Showing 1-3 of 1,024</span>
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
        </main>
      </div>
    </>
  );
}
