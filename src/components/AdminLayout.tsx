import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

export default function AdminLayout({ children, title = "Admin Portal - UAIU Athletics" }: { children: React.ReactNode, title?: string }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
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
            <Link href="/admin/students" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${router.pathname === '/admin/students' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface hover:translate-x-1'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: router.pathname === '/admin/students' ? "'FILL' 1" : "'FILL' 0" }}>group</span>
              <span className="font-body-md text-body-md">Students</span>
            </Link>
            
            <Link href="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${router.pathname === '/admin/dashboard' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface hover:translate-x-1'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: router.pathname === '/admin/dashboard' ? "'FILL' 1" : "'FILL' 0" }}>analytics</span>
              <span className="font-body-md text-body-md">Data Import</span>
            </Link>
            
            <Link href="/admin/results" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${router.pathname === '/admin/results' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface hover:translate-x-1'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: router.pathname === '/admin/results' ? "'FILL' 1" : "'FILL' 0" }}>emoji_events</span>
              <span className="font-body-md text-body-md">Results</span>
            </Link>
            
            <Link href="/admin/rules" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${router.pathname === '/admin/rules' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface hover:translate-x-1'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: router.pathname === '/admin/rules' ? "'FILL' 1" : "'FILL' 0" }}>rule</span>
              <span className="font-body-md text-body-md">Point Rules</span>
            </Link>
            
            <Link href="/admin/audit" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${router.pathname === '/admin/audit' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface hover:translate-x-1'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: router.pathname === '/admin/audit' ? "'FILL' 1" : "'FILL' 0" }}>history</span>
              <span className="font-body-md text-body-md">Audit Logs</span>
            </Link>

            <Link href="/admin/roles" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${router.pathname === '/admin/roles' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface hover:translate-x-1'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: router.pathname === '/admin/roles' ? "'FILL' 1" : "'FILL' 0" }}>admin_panel_settings</span>
              <span className="font-body-md text-body-md">Roles & Permissions</span>
            </Link>
          </div>
          
          <div className="mt-auto pt-4 border-t border-outline-variant/20 flex flex-col gap-1">
            <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="flex items-center gap-3 px-4 py-3 text-error hover:bg-error/10 rounded-lg transition-all duration-200 hover:translate-x-1 w-full text-left">
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
            {children}
        </main>
      </div>
    </>
  );
}
