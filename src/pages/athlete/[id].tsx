import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { prisma } from '@/lib/prisma';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import CinematicBackground from '@/components/cinema/CinematicBackground';
import Reveal from '@/components/cinema/Reveal';
import { staggerContainer, heroItem } from '@/components/cinema/variants';

export async function getServerSideProps({ params }: any) {
  const { id } = params;
  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      pointEntries: {
        include: { event: true },
        orderBy: { event: { date: 'asc' } },
      },
    },
  });

  if (!student) {
    return { notFound: true };
  }

  // Calculate medals
  const medals = { gold: 0, silver: 0, bronze: 0 };
  student.pointEntries.forEach((entry: any) => {
    if (entry.position === 1) medals.gold++;
    if (entry.position === 2) medals.silver++;
    if (entry.position === 3) medals.bronze++;
  });

  // Calculate cumulative points over time for chart
  let cumulative = 0;
  const chartData = student.pointEntries.map((entry: any) => {
    cumulative += entry.points;
    return {
      name: new Date(entry.event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      points: cumulative,
      event: entry.event.name,
      earned: entry.points,
      position: entry.position
    };
  });
  
  if (chartData.length > 0) {
    chartData.unshift({ name: 'Start', points: 0, event: 'Season Start', earned: 0, position: 0 });
  }

  return {
    props: {
      student: JSON.parse(JSON.stringify(student)),
      medals,
      chartData,
      totalPoints: cumulative
    },
  };
}

export default function AthleteProfile({ student, medals, chartData, totalPoints }: any) {
  // Parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) * 2 - 1);
    mouseY.set((clientY / innerHeight) * 2 - 1);
  };

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const bgX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const bgY = useTransform(smoothY, [-1, 1], [-20, 20]);
  const imgX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const imgY = useTransform(smoothY, [-1, 1], [-10, 10]);
  const textX = useTransform(smoothX, [-1, 1], [15, -15]);
  const textY = useTransform(smoothY, [-1, 1], [15, -15]);

  return (
    <Layout title={`${student.name} | The Athlete Story`}>
      <CinematicBackground tone="story" />
      
      <div className="relative z-10 w-full min-h-screen" onMouseMove={handleMouseMove}>
        
        {/* HERO SECTION */}
        <section className="relative w-full h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
          {/* Background Parallax */}
          <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 z-0 opacity-40">
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)]" />
          </motion.div>

          <div className="relative z-10 max-w-[1400px] w-full px-5 md:px-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            
            {/* Athlete Text */}
            <motion.div style={{ x: textX, y: textY }} className="flex-1 text-center md:text-left z-20">
              <Reveal>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.5em] text-[#D4AF37] mb-4">
                  The Athlete Story
                </p>
                <h1 className="font-display text-5xl md:text-8xl font-black uppercase tracking-tight text-white drop-shadow-2xl mb-6">
                  {student.name}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/60 font-sans text-sm tracking-widest uppercase">
                  <span>{student.className}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>{student.house} House</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Season 2025-26</span>
                </div>
              </Reveal>
            </motion.div>

            {/* Athlete Image */}
            <div className="flex-1 relative z-10 h-[400px] md:h-[600px] w-full max-w-md">
              <motion.div 
                style={{ x: imgX, y: imgY }} 
                className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.15)] bg-[#111]"
              >
                {student.photoUrl ? (
                  <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover grayscale mix-blend-luminosity hover:grayscale-0 transition-all duration-700" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#333] to-[#111] flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/20 text-[10rem]">person</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
              </motion.div>
            </div>

          </div>
        </section>

        {/* PERFORMANCE STATS */}
        <section className="relative z-20 w-full bg-black/40 backdrop-blur-xl border-y border-white/10 py-16">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10">
            <Reveal>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
                <StatCard value={totalPoints} label="Total Points" accent />
                <StatCard value={student.pointEntries.length} label="Events" />
                <StatCard value={medals.gold} label="Gold Medals" />
                <StatCard value={medals.silver} label="Silver Medals" />
                <StatCard value={medals.bronze} label="Bronze Medals" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* PERFORMANCE JOURNEY (TIMELINE) */}
        <section className="relative z-10 w-full py-24 md:py-32">
          <div className="max-w-[1000px] mx-auto px-5 md:px-10">
            <Reveal className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-white tracking-wide">
                Performance Journey
              </h2>
            </Reveal>

            <div className="relative border-l border-white/10 pl-8 md:pl-12 ml-4 md:ml-0 space-y-16">
              {student.pointEntries.map((entry: any, i: number) => (
                <Reveal key={entry.id} delay={i * 0.1}>
                  <div className="relative group">
                    {/* Timeline Node */}
                    <div className={`absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full border-2 border-black ${entry.position === 1 ? 'bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.6)]' : entry.position === 2 ? 'bg-[#e2e8f0]' : entry.position === 3 ? 'bg-[#b45309]' : 'bg-white/30'}`} />
                    
                    <div className="bg-[#111]/60 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm group-hover:border-white/20 group-hover:bg-[#111] transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <p className="font-sans text-[10px] uppercase tracking-widest text-white/40 mb-1">
                            {new Date(entry.event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                          <h3 className="font-display text-2xl font-bold uppercase text-white">{entry.event.name}</h3>
                        </div>
                        <div className="flex items-center gap-6">
                          {entry.position && (
                            <div className="text-right">
                              <div className="font-display text-xl font-bold text-white">#{entry.position}</div>
                              <div className="font-sans text-[9px] uppercase tracking-widest text-white/40">Finish</div>
                            </div>
                          )}
                          <div className="text-right">
                            <div className="font-display text-xl font-bold text-[#D4AF37]">+{entry.points}</div>
                            <div className="font-sans text-[9px] uppercase tracking-widest text-[#D4AF37]/50">Points</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}

              {student.pointEntries.length === 0 && (
                <div className="text-white/40 font-sans text-sm uppercase tracking-widest py-10">
                  No event history available for this season.
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}

function StatCard({ value, label, accent = false }: { value: number; label: string; accent?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <span className={`font-display text-5xl md:text-6xl font-bold mb-2 ${accent ? 'text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'text-white'}`}>
        {value}
      </span>
      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
        {label}
      </span>
    </div>
  );
}
