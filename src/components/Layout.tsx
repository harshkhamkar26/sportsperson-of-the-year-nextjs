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
        <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <Link href="/" className="flex items-center gap-4 cursor-pointer hover:opacity-90 active:scale-95 transition-all">
            <div className="flex items-center gap-3">
              <img alt="Universal AI University" className="h-10 w-auto object-contain drop-shadow-md" src="/images/uaiu-logo.png" />
              <div className="h-8 w-px bg-white/20 hidden sm:block"></div>
              <span className="font-headline-md text-on-surface font-bold text-lg hidden sm:block tracking-tight">Athletics</span>
            </div>
          </Link>
            
            <div className="hidden md:flex gap-6 items-center">
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
            
            <div className="flex items-center gap-4 text-primary dark:text-primary-fixed-dim">
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
        <main className="flex-grow w-full">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest border-t border-outline-variant/20 full-width bottom">
          <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-margin-desktop max-w-container-max mx-auto gap-base">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <img src="/images/uaiu-logo.png" alt="UAIU Logo" className="h-8 w-auto object-contain opacity-70 grayscale" />
              <span className="font-label-caps text-label-caps text-on-surface-variant">© 2024 Universal AI University Athletics. All Rights Reserved.</span>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="/privacy" className="text-on-surface-variant hover:text-primary transition-colors hover:underline">Privacy Policy</Link>
              <Link href="/terms" className="text-on-surface-variant hover:text-primary transition-colors hover:underline">Terms of Service</Link>
              <Link href="/directory" className="text-on-surface-variant hover:text-primary transition-colors hover:underline">Campus Directory</Link>
              <a href="mailto:admin@uaiu.edu" className="text-on-surface-variant hover:text-primary transition-colors hover:underline">Contact Coach</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
