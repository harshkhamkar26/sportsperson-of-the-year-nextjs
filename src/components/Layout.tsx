import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useReducedMotion } from 'framer-motion';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/schools', label: 'Schools' },
  { href: '/broadcast', label: 'Broadcast' },
  { href: '/athletes', label: 'Athletes' },
];

/**
 * SPOTY OS shell — global navigation + "final frame" footer.
 * When on /spoty the header retreats to a minimal hairline so the award
 * ceremony owns the screen.
 */
export default function Layout({ children, title = 'Universal AI University Athletics' }: { children: React.ReactNode; title?: string }) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const onSpoty = router.pathname === '/spoty';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="theme-color" content="#0a0a0a" />
      </Head>
      <div className="relative min-h-screen bg-[#070707] font-sans text-white antialiased">
        {/* Header */}
        <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${onSpoty ? 'bg-transparent' : 'bg-[#070707]/85 backdrop-blur-md border-b border-white/[0.06]'}`}>
          <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img alt="Universal AI University Sports Club" className="h-10 w-auto object-contain drop-shadow-lg" src="/images/sports-club-logo.png" />
                {!onSpoty && (
                  <motion.span
                    initial={reducedMotion ? undefined : { opacity: 0, letterSpacing: '0.5em' }}
                    animate={{ opacity: 1, letterSpacing: '0.12em' }}
                    transition={{ duration: 1 }}
                    className="hidden font-display text-sm font-semibold uppercase text-white/80 xl:block"
                  >
                    Sports Club
                  </motion.span>
                )}
              </div>
            </Link>

            {!onSpoty && (
              <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
                {NAV_LINKS.map((l) => {
                  const active = router.pathname === l.href || (l.href === '/sports' && router.pathname.startsWith('/sports'));
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`font-sans text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                        active ? 'text-[#D4AF37]' : 'text-white/55 hover:text-white'
                      }`}
                    >
                      {l.label}
                    </Link>
                  );
                })}
                <Link href="/spoty" className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-colors hover:text-white">
                  Person of the Year
                </Link>
              </nav>
            )}

            {!onSpoty && (
              <div className="flex items-center gap-2">
                <Link href="/broadcast" className="hidden items-center gap-2 rounded-full border border-[#ef4444]/40 bg-[#ef4444]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#ef4444]/20 xl:flex">
                  <span className="h-2 w-2 rounded-full bg-[#ef4444]">
                    <motion.span
                      className="block h-2 w-2 rounded-full bg-[#ef4444]"
                      animate={reducedMotion ? undefined : { opacity: [1, 0.2, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    />
                  </span>
                  Live
                </Link>
                <Link href="/search" className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/5 hover:text-white" aria-label="Search">
                  <span className="material-symbols-outlined text-lg">search</span>
                </Link>
                <Link href="/admin/login" className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/5 hover:text-white" aria-label="Admin">
                  <span className="material-symbols-outlined text-lg">account_circle</span>
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer The final frame */}
        <footer className="relative z-10 mt-24 overflow-hidden border-t border-white/[0.06] bg-[#050505]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:grid-cols-4 md:px-10">
            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <img alt="UAI Sports Club" src="/images/sports-club-logo.png" className="h-16 w-auto object-contain mb-6 drop-shadow-xl opacity-90" />
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4AF37]">Universal AI University</p>
                <h2 className="mt-2 font-display text-2xl md:text-3xl font-black uppercase leading-none text-white">Sports Club</h2>
                <p className="mt-4 max-w-sm font-sans text-sm font-light text-white/50 leading-relaxed">
                  The season continues. Every point, every podium, every champion writes the story. Performance becomes legacy.
                </p>
              </div>
            </div>

            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-white/40 mb-6">Explore</p>
              <div className="flex flex-col gap-4">
                <Link href="/" className="font-sans text-sm text-white/70 transition-colors hover:text-[#D4AF37]">Home</Link>
                <Link href="/leaderboard" className="font-sans text-sm text-white/70 transition-colors hover:text-[#D4AF37]">Leaderboard</Link>
                <Link href="/broadcast" className="font-sans text-sm text-white/70 transition-colors hover:text-[#D4AF37]">Broadcast</Link>
                <Link href="/schools" className="font-sans text-sm text-white/70 transition-colors hover:text-[#D4AF37]">Schools</Link>
                <Link href="/spoty" className="font-sans text-sm font-semibold text-[#D4AF37] transition-colors hover:text-white">SPOTY</Link>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end text-left md:text-right">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-white/40 mb-6">Connect</p>
              <a 
                href="https://www.instagram.com/sportsclub_uai" 
                target="_blank" 
                rel="noreferrer"
                className="group flex flex-col items-start md:items-end gap-4 transition-transform hover:-translate-y-1"
              >
                <div className="bg-white p-2 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-shadow">
                  <img src="/images/insta-qr.png" alt="Instagram QR" className="w-24 h-24 object-contain rounded-lg" />
                </div>
                <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                  <span className="font-sans text-xs font-semibold tracking-wider">@SPORTSCLUB_UAI</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </div>
              </a>
            </div>
          </div>
          <div className="border-t border-white/[0.05] py-6 text-center bg-black/40">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/30">
              © {new Date().getFullYear()} Universal AI University — Sports Club OS
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

