import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children, title = "Universal AI University Athletics" }: { children: React.ReactNode, title?: string }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="bg-surface-container-lowest text-on-surface font-body-md antialiased min-h-screen flex flex-col">
        {/* TopNavBar */}
        <header className="bg-background/90 dark:bg-background/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-white/10 shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto gap-4 lg:gap-8">
          <Link href="/" className="flex items-center gap-4 cursor-pointer hover:opacity-90 active:scale-95 transition-all shrink-0">
            <div className="flex items-center gap-3">
              <img alt="Universal AI University" className="h-10 w-auto object-contain drop-shadow-md" src="/images/uaiu-logo.png" />
              <div className="h-8 w-px bg-white/20 hidden xl:block"></div>
              <span className="font-headline-md text-on-surface font-bold text-lg hidden xl:block tracking-tight">Athletics</span>
            </div>
          </Link>
            
            <div className="hidden md:flex gap-3 lg:gap-6 items-center shrink-0">
              <Link href="/" className={`font-label-caps text-label-caps font-medium transition-colors ${router.pathname === '/' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'}`}>
                Home
              </Link>
              <Link href="/leaderboard" className={`font-label-caps text-label-caps font-medium transition-colors ${router.pathname === '/leaderboard' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'}`}>
                Leaderboard
              </Link>
              <Link href="/sports" className={`font-label-caps text-label-caps font-medium transition-colors ${router.pathname.startsWith('/sports') ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'}`}>
                Sports
              </Link>
              <Link href="/teams" className={`font-label-caps text-label-caps font-medium transition-colors ${router.pathname.startsWith('/teams') ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'}`}>
                Teams
              </Link>
              <Link href="/spoty" className={`font-label-caps text-label-caps font-medium transition-colors ${router.pathname === '/spoty' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'}`}>
                Person of the Year
              </Link>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-4 text-primary dark:text-primary-fixed-dim shrink-0">
              {/* Live Broadcast Button */}
              <Link href="/live" className="hidden xl:flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-colors border border-red-500/50">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                Live Broadcast
              </Link>

              {/* TV Mode Button */}
              <Link href="/tv" className="hidden xl:flex items-center gap-2 bg-surface-container hover:bg-surface-container-high px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-colors border border-outline-variant/30 text-on-surface">
                <span className="material-symbols-outlined text-[16px]">tv</span>
                TV Mode
              </Link>

              <Link href="/search" className="material-symbols-outlined hover:bg-surface-container-high/50 transition-all duration-200 p-2 rounded-full cursor-pointer scale-98 active:opacity-80">
                search
              </Link>
              <Link href="/admin/login" className="material-symbols-outlined hover:bg-surface-container-high/50 transition-all duration-200 p-2 rounded-full cursor-pointer scale-98 active:opacity-80">
                account_circle
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Canvas */}
        <main className="flex-grow w-full pt-20">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-surface-container-lowest dark:bg-[#0F1219] border-t border-outline-variant/20 full-width bottom mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-8 max-w-container-max mx-auto gap-base">
            
            <div className="flex flex-col">
              <span className="font-bold text-white mb-1">Universal AI University — Sports Club OS</span>
              <span className="text-sm text-white/50">Empowering Student Athletes & Promoting Equal Athletic Excellence</span>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4 mt-6 md:mt-0">
              <div className="flex items-center gap-6">
                <Link href="/live" className="text-white/80 hover:text-white font-bold text-sm transition-colors">
                  Live Broadcast
                </Link>
                <span className="text-white/20"> </span>
                <Link href="/admin/login" className="flex items-center gap-2 bg-transparent border border-white/20 hover:border-white/40 text-white/80 hover:text-white px-4 py-2 rounded-full font-bold text-sm transition-colors">
                  <span className="material-symbols-outlined text-sm">security</span>
                  Admin Portal
                </Link>
              </div>
              <div className="flex items-center gap-4 text-xs font-label-caps tracking-widest text-white/40">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <span>|</span>
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                <span>|</span>
                <Link href="/directory" className="hover:text-white transition-colors">Campus Directory</Link>
                <span>|</span>
                <a href="mailto:coach@uaiu.edu" className="hover:text-white transition-colors">Contact Coach</a>
              </div>
            </div>

          </div>
        </footer>
      </div>
    </>
  );
}
