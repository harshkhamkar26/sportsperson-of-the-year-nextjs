import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { getRankings } from '@/lib/rankings';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';

export async function getStaticProps() {
  const rankings = await getRankings();
  const topAthlete = rankings[0] || null;
  const secondAthlete = rankings[1] || null;
  return {
    props: { topAthlete, secondAthlete },
    revalidate: 60,
  };
}

export default function SportsPersonOfTheYear({ topAthlete, secondAthlete }: { topAthlete: any, secondAthlete: any }) {
  const [revealPhase, setRevealPhase] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      // Phase 1: Titles (0-2s)
      await new Promise(r => setTimeout(r, 2000));
      setRevealPhase(1);
      // Phase 2: Sportsman title (2-3.5s)
      await new Promise(r => setTimeout(r, 1500));
      setRevealPhase(2);
      // Phase 3: Sportsman reveal (3.5-5s)
      await new Promise(r => setTimeout(r, 1500));
      setRevealPhase(3);
      // Phase 4: Sportswoman title (5-6.5s)
      await new Promise(r => setTimeout(r, 1500));
      setRevealPhase(4);
    };
    sequence();
  }, []);

  const sportsman = {
    name: topAthlete?.name || "Placeholder Name",
    school: topAthlete?.className || "School of Engineering",
    sport: "Tennis Men's Singles",
    events: topAthlete?.eventsCount || 12,
    podiums: (topAthlete?.medals?.gold || 0) + (topAthlete?.medals?.silver || 0) + (topAthlete?.medals?.bronze || 0) || 8,
    golds: topAthlete?.medals?.gold || 3,
    championships: 1,
    photoUrl: topAthlete?.photoUrl || "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop"
  };

  const sportswoman = {
    name: secondAthlete?.name || "Placeholder Name",
    school: secondAthlete?.className || "School of Business",
    sport: "Athletics 100m Sprint",
    events: secondAthlete?.eventsCount || 10,
    podiums: (secondAthlete?.medals?.gold || 0) + (secondAthlete?.medals?.silver || 0) + (secondAthlete?.medals?.bronze || 0) || 7,
    golds: secondAthlete?.medals?.gold || 4,
    championships: 1,
    photoUrl: secondAthlete?.photoUrl || "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop"
  };

  return (
    <Layout title="Sports Person of the Year - UAIU">
      <Head>
        <meta name="theme-color" content="#0a0a0a" />
      </Head>
      <main className="relative min-h-screen bg-[#0a0a0a] overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        {/* Cinematic Stadium Background */}
        <div className="absolute inset-0 z-0 pointer-events-none flex justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#0a0a0a] to-[#0a0a0a] opacity-80"></div>
          {/* Subtle light beams */}
          <div className="absolute top-0 w-full h-[600px] bg-gradient-to-b from-white/[0.03] to-transparent" style={{ transform: 'perspective(1000px) rotateX(60deg)' }}></div>
          <div className="absolute top-0 left-[20%] w-[100px] h-full bg-gradient-to-b from-[#D4AF37]/[0.05] to-transparent blur-3xl transform -rotate-12"></div>
          <div className="absolute top-0 right-[20%] w-[100px] h-full bg-gradient-to-b from-[#3B82F6]/[0.05] to-transparent blur-3xl transform rotate-12"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-16 lg:py-24 flex flex-col items-center">
          
          {/* HEADER */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16 lg:mb-24"
          >
            <h3 className="font-label-caps text-label-caps text-white/60 tracking-[0.3em] uppercase mb-4">Sports Club Presents</h3>
            <h1 className="font-headline-xl text-4xl md:text-6xl lg:text-[5rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Sports Person<br className="md:hidden" /> of the Year
            </h1>
            <div className="flex flex-col items-center gap-4">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
              <p className="font-headline-md text-xl md:text-2xl text-[#D4AF37] font-light tracking-wide">2025 — 26</p>
              <p className="font-body-lg text-white/50 tracking-widest uppercase text-sm mt-2">Celebrating Excellence Beyond the Game</p>
            </div>
          </motion.div>

          {/* MAIN WINNER SECTION */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-24">
            
            {/* SPORTSMAN CARD */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: revealPhase >= 1 ? 1 : 0, x: revealPhase >= 1 ? 0 : -50 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative group rounded-2xl overflow-hidden bg-[#111] border border-white/10 hover:border-[#D4AF37]/50 transition-colors duration-500 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a] z-10"></div>
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                
                {revealPhase >= 1 && revealPhase < 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center z-30 bg-[#0a0a0a]/80 backdrop-blur-md">
                    <h2 className="text-3xl text-white font-bold tracking-widest uppercase">Sportsman of the Year</h2>
                  </motion.div>
                )}
                
                {revealPhase >= 2 && revealPhase < 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center z-30 bg-[#0a0a0a]/80 backdrop-blur-md">
                    <h2 className="text-2xl text-[#D4AF37] font-light tracking-[0.2em] uppercase">The Winner Is...</h2>
                  </motion.div>
                )}

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: revealPhase >= 3 ? 1 : 0, y: revealPhase >= 3 ? 0 : 20 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#D4AF37] text-2xl">🏆</span>
                    <span className="font-label-caps text-xs tracking-[0.2em] text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full uppercase border border-[#D4AF37]/20">Official Winner</span>
                  </div>
                  
                  <h3 className="text-white/60 text-sm tracking-[0.2em] uppercase mb-1">Sportsman of the Year</h3>
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-2 drop-shadow-md">{sportsman.name}</h2>
                  <p className="text-white/80 text-lg font-light mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                    {sportsman.sport} <span className="text-white/30">•</span> {sportsman.school}
                  </p>

                  <div className="grid grid-cols-4 gap-2 md:gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                    <div className="flex flex-col items-center justify-center text-center">
                      <span className="text-2xl md:text-3xl font-bold text-white mb-1"><AnimatedCounter value={sportsman.events} /></span>
                      <span className="text-[10px] text-white/50 tracking-wider uppercase">Events</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center border-l border-white/10">
                      <span className="text-2xl md:text-3xl font-bold text-white mb-1"><AnimatedCounter value={sportsman.podiums} /></span>
                      <span className="text-[10px] text-white/50 tracking-wider uppercase">Podiums</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center border-l border-white/10">
                      <span className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-1"><AnimatedCounter value={sportsman.golds} /></span>
                      <span className="text-[10px] text-white/50 tracking-wider uppercase">Golds</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center border-l border-white/10">
                      <span className="text-2xl md:text-3xl font-bold text-white mb-1"><AnimatedCounter value={sportsman.championships} /></span>
                      <span className="text-[10px] text-white/50 tracking-wider uppercase">Champ.</span>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <motion.img 
                src={sportsman.photoUrl} 
                alt={sportsman.name}
                className="w-full h-[600px] object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105"
              />
            </motion.div>

            {/* SPORTSWOMAN CARD */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: revealPhase >= 3 ? 1 : 0, x: revealPhase >= 3 ? 0 : 50 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative group rounded-2xl overflow-hidden bg-[#111] border border-white/10 hover:border-[#D4AF37]/50 transition-colors duration-500 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a] z-10"></div>
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                
                {revealPhase >= 3 && revealPhase < 4 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center z-30 bg-[#0a0a0a]/80 backdrop-blur-md">
                    <h2 className="text-3xl text-white font-bold tracking-widest uppercase">Sportswoman of the Year</h2>
                  </motion.div>
                )}
                
                {revealPhase >= 4 && revealPhase < 5 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center z-30 bg-[#0a0a0a]/80 backdrop-blur-md">
                    <h2 className="text-2xl text-[#D4AF37] font-light tracking-[0.2em] uppercase">The Winner Is...</h2>
                  </motion.div>
                )}

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: revealPhase >= 4 ? 1 : 0, y: revealPhase >= 4 ? 0 : 20 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#D4AF37] text-2xl">🏆</span>
                    <span className="font-label-caps text-xs tracking-[0.2em] text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full uppercase border border-[#D4AF37]/20">Official Winner</span>
                  </div>
                  
                  <h3 className="text-white/60 text-sm tracking-[0.2em] uppercase mb-1">Sportswoman of the Year</h3>
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-2 drop-shadow-md">{sportswoman.name}</h2>
                  <p className="text-white/80 text-lg font-light mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></span>
                    {sportswoman.sport} <span className="text-white/30">•</span> {sportswoman.school}
                  </p>

                  <div className="grid grid-cols-4 gap-2 md:gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                    <div className="flex flex-col items-center justify-center text-center">
                      <span className="text-2xl md:text-3xl font-bold text-white mb-1"><AnimatedCounter value={sportswoman.events} /></span>
                      <span className="text-[10px] text-white/50 tracking-wider uppercase">Events</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center border-l border-white/10">
                      <span className="text-2xl md:text-3xl font-bold text-white mb-1"><AnimatedCounter value={sportswoman.podiums} /></span>
                      <span className="text-[10px] text-white/50 tracking-wider uppercase">Podiums</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center border-l border-white/10">
                      <span className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-1"><AnimatedCounter value={sportswoman.golds} /></span>
                      <span className="text-[10px] text-white/50 tracking-wider uppercase">Golds</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center border-l border-white/10">
                      <span className="text-2xl md:text-3xl font-bold text-white mb-1"><AnimatedCounter value={sportswoman.championships} /></span>
                      <span className="text-[10px] text-white/50 tracking-wider uppercase">Champ.</span>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <motion.img 
                src={sportswoman.photoUrl} 
                alt={sportswoman.name}
                className="w-full h-[600px] object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105"
              />
            </motion.div>

          </div>

          {/* BOTTOM SECTION */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: revealPhase >= 4 ? 1 : 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-center w-full max-w-2xl border-t border-white/10 pt-12"
          >
            <h4 className="text-[#D4AF37] font-label-caps tracking-[0.3em] uppercase mb-4 text-sm">Celebrating Champions</h4>
            <p className="text-white/40 font-light tracking-[0.2em] uppercase text-sm">Excellence • Dedication • Leadership</p>
          </motion.div>

        </div>
      </main>
    </Layout>
  );
}
