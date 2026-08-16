import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { prisma } from '@/lib/prisma';
import { motion } from 'framer-motion';
import Avatar from '@/components/Avatar';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import AnimatedCounter from '@/components/AnimatedCounter';

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
      event: entry.event.name
    };
  });
  
  // Start with 0 at the beginning if needed, but let's just use the entries.
  if (chartData.length > 0) {
    chartData.unshift({ name: 'Start', points: 0, event: 'Season Start' });
  }

  return {
    props: {
      athlete: {
        ...student,
        totalPoints: student.pointEntries.reduce((sum: number, e: any) => sum + e.points, 0),
        medals,
        chartData,
        history: student.pointEntries.map((e: any) => ({
          sport: 'Athletics', // Generic since we don't have sport model
          event: e.event.name,
          result: e.position ? `${e.position}${e.position === 1 ? 'st' : e.position === 2 ? 'nd' : e.position === 3 ? 'rd' : 'th'} Place` : 'Participant',
          points: e.points,
          rankClass: e.position === 1 ? 'text-rank-gold' : e.position === 2 ? 'text-rank-silver' : e.position === 3 ? 'text-rank-bronze' : 'text-on-surface'
        }))
      },
    },
  };
}

export default function AthleteProfile({ athlete }: { athlete: any }) {
  return (
    <Layout title={`Athlete Profile - ${athlete.name} | UAIU Athletics`}>
      <div className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-[80px] grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Athlete Header & Profile Card (Cols 1-4) */}
        <section className="md:col-span-4 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#162A45] rounded-lg overflow-hidden border border-outline-variant/30 relative transition-transform duration-300 hover:scale-[1.02] hover:shadow-[4px_4px_0px_0px_#adc6ff] hover:border-[#adc6ff] group"
          >
            <div className="aspect-[4/5] relative">
              <Avatar 
                photoUrl={athlete.photoUrl} 
                name={athlete.name} 
                className="w-full h-full object-cover text-6xl"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/50 to-transparent flex flex-col justify-end p-6">
                <h1 className="font-headline-xl text-headline-xl text-on-surface mb-1">{athlete.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-rank-gold text-surface-container-lowest font-label-caps text-label-caps px-3 py-1 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">military_tech</span> Rank #{athlete.rank}
                  </span>
                  <span className="text-on-surface-variant font-data-tabular text-data-tabular">ID: {athlete.id}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-outline-variant/10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-on-surface-variant font-label-caps text-label-caps text-[12px]">School</span>
                  <p className="font-body-md text-body-md text-on-surface">{athlete.school}</p>
                </div>
                <div>
                  <span className="text-on-surface-variant font-label-caps text-label-caps text-[12px]">Program</span>
                  <p className="font-body-md text-body-md text-on-surface">{athlete.program}</p>
                </div>
                <div>
                  <span className="text-on-surface-variant font-label-caps text-label-caps text-[12px]">Year</span>
                  <p className="font-body-md text-body-md text-on-surface">{athlete.year}</p>
                </div>
                <div>
                  <span className="text-on-surface-variant font-label-caps text-label-caps text-[12px]">Total Points</span>
                  <p className="font-headline-md text-headline-md text-primary">
                    <AnimatedCounter value={athlete.totalPoints} />
                    <span className="text-[14px] text-on-surface-variant ml-1">pts</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Details & Stats (Cols 5-12) */}
        <section className="md:col-span-8 flex flex-col gap-10">
          {/* Bento Grid Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            
            {/* Section 1: Sports Participation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#162A45] rounded-lg border border-outline-variant/30 p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[4px_4px_0px_0px_#adc6ff] hover:border-[#adc6ff] flex flex-col"
            >
              <h2 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-outline-variant/20 pb-2">Sports Participation</h2>
              <div className="grid grid-cols-2 gap-4 flex-grow">
                <div className="flex items-center gap-3 bg-surface-container/50 p-3 rounded border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-2xl">sports_basketball</span>
                  <span className="font-body-md text-body-md text-on-surface">Basketball</span>
                </div>
                <div className="flex items-center gap-3 bg-surface-container/50 p-3 rounded border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-2xl">sports_soccer</span>
                  <span className="font-body-md text-body-md text-on-surface">Football</span>
                </div>
                <div className="flex items-center gap-3 bg-surface-container/50 p-3 rounded border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-2xl">sports_tennis</span>
                  <span className="font-body-md text-body-md text-on-surface">Badminton</span>
                </div>
                <div className="flex items-center gap-3 bg-surface-container/50 p-3 rounded border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-2xl">sprint</span>
                  <span className="font-body-md text-body-md text-on-surface">Athletics</span>
                </div>
              </div>
            </motion.div>

            {/* Section 2: Achievement Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#162A45] rounded-lg border border-outline-variant/30 p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[4px_4px_0px_0px_#adc6ff] hover:border-[#adc6ff] flex flex-col"
            >
              <h2 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-outline-variant/20 pb-2">Achievements</h2>
              <div className="flex justify-between items-center flex-grow px-2">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full border-2 border-rank-gold flex items-center justify-center bg-rank-gold/10">
                    <span className="font-headline-lg text-headline-lg text-rank-gold font-bold">{athlete.medals.gold}</span>
                  </div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">Gold</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full border-2 border-rank-silver flex items-center justify-center bg-rank-silver/10">
                    <span className="font-headline-lg text-headline-lg text-rank-silver font-bold">{athlete.medals.silver}</span>
                  </div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">Silver</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full border-2 border-rank-bronze flex items-center justify-center bg-rank-bronze/10">
                    <span className="font-headline-lg text-headline-lg text-rank-bronze font-bold">{athlete.medals.bronze}</span>
                  </div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">Bronze</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Section 4: Point Breakdown Visual - Converted to Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#162A45] rounded-lg border border-outline-variant/30 p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[4px_4px_0px_0px_#adc6ff] hover:border-[#adc6ff]"
          >
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-outline-variant/20 pb-2">Points Over Time</h2>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={athlete.chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <XAxis dataKey="name" stroke="#8892B0" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#8892B0" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A192F', border: '1px solid #1E293B', borderRadius: '8px' }}
                    itemStyle={{ color: '#64FFDA' }}
                    labelStyle={{ color: '#E2E8F0', marginBottom: '8px' }}
                  />
                  <Line type="monotone" dataKey="points" stroke="#64FFDA" strokeWidth={3} dot={{ fill: '#64FFDA', strokeWidth: 2 }} activeDot={{ r: 8 }} animationDuration={1500} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Section 3: Performance History Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#162A45] rounded-lg border border-outline-variant/30 overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-[4px_4px_0px_0px_#adc6ff] hover:border-[#adc6ff]"
          >
            <div className="p-6 pb-4 border-b border-outline-variant/20">
              <h2 className="font-headline-md text-headline-md text-on-surface">Performance History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-surface-container/30">
                    <th className="py-3 px-6 font-label-caps text-label-caps text-on-surface-variant">Sport</th>
                    <th className="py-3 px-6 font-label-caps text-label-caps text-on-surface-variant">Event</th>
                    <th className="py-3 px-6 font-label-caps text-label-caps text-on-surface-variant">Result</th>
                    <th className="py-3 px-6 font-label-caps text-label-caps text-on-surface-variant text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="font-data-tabular text-data-tabular">
                  {athlete.history.map((item: any, idx: number) => (
                    <tr key={idx} className="border-b border-white/10 hover:bg-surface-container-highest/20 transition-colors">
                      <td className="py-3 px-6 text-on-surface">{item.sport}</td>
                      <td className="py-3 px-6 text-on-surface-variant">{item.event}</td>
                      <td className={`py-3 px-6 ${item.rankClass}`}>{item.result}</td>
                      <td className="py-3 px-6 text-primary text-right">+{item.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

        </section>
      </div>
    </Layout>
  );
}
