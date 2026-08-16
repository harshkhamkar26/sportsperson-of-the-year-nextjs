import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getRankings } from '@/lib/rankings';
import { motion, AnimatePresence } from 'framer-motion';

export async function getServerSideProps() {
  const students = await getRankings();
  // Group by house to show school standings
  const houses: Record<string, any> = {};
  students.forEach(s => {
    if (!houses[s.house]) {
      houses[s.house] = {
        name: s.house,
        gold: 0,
        silver: 0,
        bronze: 0,
        totalPoints: 0,
        eventsPlayed: new Set(),
      };
    }
    s.history.forEach((h: any) => {
      houses[s.house].eventsPlayed.add(h.event);
      if (h.position === 1) houses[s.house].gold += 1;
      if (h.position === 2) houses[s.house].silver += 1;
      if (h.position === 3) houses[s.house].bronze += 1;
    });
    houses[s.house].totalPoints += s.totalPoints;
  });

  const rankings = Object.values(houses).map(h => ({
    ...h,
    totalMedals: h.gold + h.silver + h.bronze,
    eventsPlayedCount: h.eventsPlayed.size,
    avgScore: h.eventsPlayed.size > 0 ? Math.round(h.totalPoints / h.eventsPlayed.size) : 0,
  })).sort((a, b) => b.totalPoints - a.totalPoints);

  return { props: { rankings } };
}

export default function TVMode({ rankings }: { rankings: any[] }) {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState<'standby' | 'leaderboard'>('standby');
  const [time, setTime] = useState(new Date());

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 5s Rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScreen(prev => prev === 'standby' ? 'leaderboard' : 'standby');
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.push('/');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  // Enter Fullscreen on mount if supported
  useEffect(() => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>TV Feed | Universal AI University</title>
      </Head>
      
      <main className="min-h-screen bg-[#07090F] text-white font-body-md flex flex-col overflow-hidden selection:bg-transparent cursor-none">
        {/* Header */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 shrink-0 bg-[#07090F] z-20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-lg border border-white/10 flex items-center justify-center p-2">
              <img src="/images/uaiu-logo.png" alt="UAIU" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h1 className="font-headline-lg text-2xl font-black tracking-tight">SPORTS PERSON OF THE YEAR</h1>
                <span className="bg-[#D32F2F] text-white text-xs font-bold px-2 py-0.5 rounded-full tracking-wider animate-pulse">LIVE BROADCAST</span>
              </div>
              <span className="text-[#FFC107] text-xs font-semibold tracking-wide">UAI Championship Leaderboard TV Feed • 5s Rotation</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-white/70 text-sm border border-white/10 px-4 py-2 rounded-full bg-white/5">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span className="font-data-tabular font-bold">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <div className="w-px h-4 bg-white/20"></div>
              <span className="font-medium">
                {time.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' })}
              </span>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="bg-[#D32F2F] text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-red-700 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">close</span>
              Exit Fullscreen (ESC)
            </button>
          </div>
        </header>

        {/* Content Area - Rotates */}
        <div className="flex-grow relative flex items-center justify-center p-12 overflow-hidden">
          <AnimatePresence mode="wait">
            {currentScreen === 'standby' ? (
              <motion.div 
                key="standby"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="bg-[#1A1C23] border border-white/5 rounded-3xl p-16 w-full max-w-4xl flex flex-col items-center text-center shadow-2xl"
              >
                <span className="material-symbols-outlined text-[#FFC107] text-7xl mb-6">emoji_events</span>
                <h2 className="font-headline-xl text-4xl font-extrabold text-white mb-4">Championship Standby</h2>
                <p className="text-white/60 font-body-lg max-w-lg mx-auto">
                  Tournament results will automatically calculate the overall Division Leaders here.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="leaderboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full max-w-7xl mx-auto flex flex-col gap-6"
              >
                {/* Top Widget */}
                <div className="bg-[#1A1C23] border border-white/5 rounded-3xl p-8 flex justify-between items-center shadow-lg">
                  <div>
                    <div className="flex items-center gap-2 text-[#FFC107] text-xs font-bold tracking-widest mb-2 uppercase">
                      <span className="material-symbols-outlined text-sm">emoji_events</span>
                      Official Championship Standings
                    </div>
                    <h2 className="font-headline-xl text-4xl font-extrabold text-white mb-2">School Championship Points Table</h2>
                    <p className="text-white/60 text-sm">Dynamic real-time matrix automatically aggregated after every event result and Excel import.</p>
                  </div>
                  {rankings.length > 0 && (
                    <div className="bg-black/50 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                      <div className="bg-[#FFC107] text-black w-14 h-14 rounded-xl flex flex-col items-center justify-center font-bold">
                        <span className="text-[10px]">👑</span>
                        #1
                      </div>
                      <div>
                        <div className="text-[10px] text-[#FFC107] font-bold tracking-widest uppercase mb-1">Championship Leader</div>
                        <div className="text-xl font-bold text-white leading-tight">{rankings[0].name}</div>
                        <div className="text-white/60 text-sm font-data-tabular"><span className="text-[#FFC107] font-bold">{rankings[0].totalPoints}</span> pts</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Table */}
                <div className="bg-[#1A1C23] border border-white/5 rounded-3xl flex-grow overflow-hidden flex flex-col shadow-lg">
                  <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-2 text-white font-bold text-lg mb-1">
                      <span className="material-symbols-outlined text-blue-400">domain</span>
                      UAI Schools Standings Table
                    </div>
                    <p className="text-white/40 text-xs">Live aggregated statistics across all disciplines.</p>
                  </div>
                  
                  <div className="flex-grow overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-black/40 text-[10px] font-bold tracking-widest text-white/50 uppercase border-b border-white/10">
                          <th className="py-4 px-6 w-16">Rank</th>
                          <th className="py-4 px-6">School & Logo</th>
                          <th className="py-4 px-6 text-center">🥇 Gold</th>
                          <th className="py-4 px-6 text-center">🥈 Silver</th>
                          <th className="py-4 px-6 text-center">🥉 Bronze</th>
                          <th className="py-4 px-6 text-center">Total Medals</th>
                          <th className="py-4 px-6 text-center">Avg Score</th>
                          <th className="py-4 px-6 text-right text-[#FFC107]">Total Pts</th>
                        </tr>
                      </thead>
                      <tbody className="font-data-tabular text-sm">
                        {rankings.map((school, idx) => (
                          <tr key={idx} className="border-b border-white/5 bg-black/20">
                            <td className="py-4 px-6">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${idx === 0 ? 'bg-[#FFC107] text-black' : idx === 1 ? 'bg-slate-300 text-black' : idx === 2 ? 'bg-orange-400 text-black' : 'bg-white/10 text-white'}`}>
                                #{idx + 1}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-[10px] font-bold">
                                  {school.name.split(' ').map((w: string) => w[0]).join('').substring(0,2)}
                                </div>
                                <span className="font-bold text-white">{school.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-center font-bold text-white/80">{school.gold}</td>
                            <td className="py-4 px-6 text-center font-bold text-white/80">{school.silver}</td>
                            <td className="py-4 px-6 text-center font-bold text-white/80">{school.bronze}</td>
                            <td className="py-4 px-6 text-center font-bold text-white/50">{school.totalMedals}</td>
                            <td className="py-4 px-6 text-center font-bold text-blue-400">{school.avgScore}</td>
                            <td className="py-4 px-6 text-right font-black text-lg text-[#FFC107]">{school.totalPoints}</td>
                          </tr>
                        ))}
                        {rankings.length === 0 && (
                          <tr>
                            <td colSpan={8} className="py-12 text-center text-white/40">No event data available yet.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Ticker */}
        <footer className="h-12 bg-[#1A1C23] border-t border-white/10 flex items-center overflow-hidden shrink-0">
          <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap flex items-center gap-12 font-bold text-sm tracking-wide text-white/80">
            <span className="flex items-center gap-2"><span className="text-red-500">🔴 LIVE</span> Welcome to Sports Person of the Year – Universal AI University</span>
            <span className="flex items-center gap-2"><span className="text-[#FFC107]">📢</span> Tournament registrations opening soon for Badminton & Table Tennis</span>
            <span className="flex items-center gap-2"><span className="text-blue-400">📱</span> Scan QR to Follow @uai_sports_club on Instagram</span>
            <span className="flex items-center gap-2"><span className="text-red-500">🔴 LIVE</span> Welcome to Sports Person of the Year – Universal AI University</span>
            <span className="flex items-center gap-2"><span className="text-[#FFC107]">📢</span> Tournament registrations opening soon for Badminton & Table Tennis</span>
          </div>
        </footer>
      </main>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}
