import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import CinematicBackground from '@/components/cinema/CinematicBackground';
import { getRankings } from '@/lib/rankings';

export async function getStaticProps() {
  const rankings = await getRankings();
  return {
    props: { rankings },
    revalidate: 60,
  };
}

export default function LiveBroadcast({ rankings }: { rankings: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 8 seconds
  useEffect(() => {
    if (rankings.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rankings.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [rankings.length]);

  const athlete = rankings[currentIndex];
  
  if (!athlete) return <div className="bg-black min-h-screen" />;

  return (
    <>
      <Head>
        <title>Live Broadcast | UAIU Sports Club</title>
        <meta name="theme-color" content="#0a0a0a" />
      </Head>
      
      <main className="relative min-h-screen bg-[#060606] overflow-hidden flex flex-col justify-between">
        <CinematicBackground tone="live" />

        {/* HEADER */}
        <header className="relative z-20 w-full flex justify-between items-start p-8 md:p-12">
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-2">
              <span className="flex items-center gap-2 rounded-full bg-[#ef4444]/20 border border-[#ef4444]/40 px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-widest text-[#ef4444]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef4444] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ef4444]"></span>
                </span>
                LIVE
              </span>
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                Season 2025–26
              </span>
            </div>
            <h1 className="font-display text-2xl md:text-4xl font-black uppercase tracking-wide text-white">
              Current Standings
            </h1>
          </div>
          <img src="/images/sports-club-logo.png" alt="UAI Sports Club" className="h-12 w-auto object-contain opacity-50" />
        </header>

        {/* SPOTLIGHT ATHLETE */}
        <div className="relative z-10 flex-1 flex items-center justify-center w-full px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={athlete.id}
              initial={{ opacity: 0, x: 100, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col md:flex-row items-center gap-12 max-w-6xl w-full"
            >
              
              {/* Photo Area */}
              <div className="relative w-64 h-64 md:w-96 md:h-96 shrink-0">
                <div className="absolute inset-0 rounded-full border-2 border-white/5 bg-[#111] overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)] flex items-center justify-center">
                   {athlete.photoUrl ? (
                     <motion.img 
                        src={athlete.photoUrl} 
                        className="w-full h-full object-cover grayscale mix-blend-luminosity" 
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                     />
                   ) : (
                     <span className="material-symbols-outlined text-white/20 text-7xl">person</span>
                   )}
                </div>
                {/* Rank Badge */}
                <div className="absolute -bottom-6 -right-6 md:bottom-0 md:right-0 bg-black border border-white/10 w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center z-10 shadow-2xl backdrop-blur-md">
                  <span className="font-display text-5xl md:text-6xl font-black text-[#60a5fa]">
                    {String(athlete.rank).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Data Area */}
              <div className="flex flex-col text-center md:text-left">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.4em] text-[#22d3ee] mb-2">
                  {athlete.className} • {athlete.house}
                </p>
                <h2 className="font-display text-6xl md:text-8xl font-black uppercase tracking-tight text-white mb-8 drop-shadow-lg">
                  {athlete.name}
                </h2>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12">
                  <div className="flex flex-col">
                    <span className="font-display text-5xl md:text-6xl font-bold text-white drop-shadow-md">{athlete.totalPoints}</span>
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">Total Points</span>
                  </div>
                  <div className="w-px bg-white/10 hidden md:block" />
                  <div className="flex flex-col">
                    <span className="font-display text-5xl md:text-6xl font-bold text-white drop-shadow-md">{athlete.eventsCount}</span>
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">Events</span>
                  </div>
                  <div className="w-px bg-white/10 hidden md:block" />
                  <div className="flex flex-col">
                    <span className="font-display text-5xl md:text-6xl font-bold text-[#D4AF37] drop-shadow-md">{athlete.medals.gold}</span>
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">Gold</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* TICKER */}
        <div className="relative z-20 w-full bg-black/80 backdrop-blur-xl border-t border-white/10 overflow-hidden py-4 flex items-center">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          <motion.div
            initial={{ x: '0%' }}
            animate={{ x: '-50%' }}
            transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
            className="flex whitespace-nowrap items-center font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/70"
          >
            {[...rankings, ...rankings].map((r, i) => (
              <React.Fragment key={`${r.id}-${i}`}>
                <span className="mx-6 text-[#22d3ee]">///</span>
                <span>{r.name}</span>
                <span className="mx-3 text-white/30">•</span>
                <span>{r.totalPoints} PTS</span>
                <span className="mx-3 text-white/30">•</span>
                <span className={`${r.rank === 1 ? 'text-[#D4AF37]' : 'text-white/50'}`}>RANK {r.rank}</span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </main>
    </>
  );
}
