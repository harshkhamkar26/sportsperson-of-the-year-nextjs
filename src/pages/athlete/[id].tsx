import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';

export default function AthleteProfile() {
  const router = useRouter();
  const { id } = router.query;

  // In a real app, you would fetch the athlete data from Prisma using the id.
  // For now, we use the detailed mockup data from the Stitch design.
  const athlete = {
    name: 'Harsh Khamkar',
    id: id || 'UAIU-24-001',
    rank: 1,
    school: 'AI & Data Science',
    program: 'B.Tech (Hons)',
    year: "Senior '24",
    totalPoints: 385,
    medals: {
      gold: 4,
      silver: 2,
      bronze: 1
    },
    participationStats: {
      totalPoints: 115,
      achievementPoints: 270
    },
    history: [
      { sport: 'Basketball', event: 'Inter-College 5v5', result: 'Winner', points: 50, rankClass: 'text-rank-gold' },
      { sport: 'Athletics', event: '100m Sprint', result: 'Runner-up', points: 30, rankClass: 'text-rank-silver' },
      { sport: 'Football', event: 'Varsity League', result: 'Winner', points: 50, rankClass: 'text-rank-gold' },
      { sport: 'Badminton', event: 'Singles Tournament', result: '3rd Place', points: 15, rankClass: 'text-rank-bronze' }
    ]
  };

  return (
    <Layout title={`Athlete Profile - ${athlete.name} | UAIU Athletics`}>
      <div className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-[80px] grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Athlete Header & Profile Card (Cols 1-4) */}
        <section className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-[#162A45] rounded-lg overflow-hidden border border-outline-variant/30 relative transition-transform duration-300 hover:scale-[1.02] hover:shadow-[4px_4px_0px_0px_#adc6ff] hover:border-[#adc6ff] group">
            <div className="aspect-[4/5] relative">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUBia1gYOv0JQZZIStknkR25gpBvH1cqcSv0smbRcP2lpvb6vbBK5ZgH64cUyYKFj18fudNvZhHY4_lZSGd0Sq-KPvl_fRDhWne8vWhMm3VyaCMNR3bR_n_5CLngkGiDnS_N-L1gNISiBL5666BxonROHmtQQwiTzJRJVzPvhaRuKbEXPK3M1ULqcxu2Bqk-9kMwruLYgVIDOPgqF-p8RMyM6iU60p8DAkpY56aBrTib1FL_s9ybM"
                alt={athlete.name} 
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
                    {athlete.totalPoints}<span className="text-[14px] text-on-surface-variant ml-1">pts</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Details & Stats (Cols 5-12) */}
        <section className="md:col-span-8 flex flex-col gap-10">
          {/* Bento Grid Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            
            {/* Section 1: Sports Participation */}
            <div className="bg-[#162A45] rounded-lg border border-outline-variant/30 p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[4px_4px_0px_0px_#adc6ff] hover:border-[#adc6ff] flex flex-col">
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
            </div>

            {/* Section 2: Achievement Summary */}
            <div className="bg-[#162A45] rounded-lg border border-outline-variant/30 p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[4px_4px_0px_0px_#adc6ff] hover:border-[#adc6ff] flex flex-col">
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
            </div>
          </div>

          {/* Section 4: Point Breakdown Visual */}
          <div className="bg-[#162A45] rounded-lg border border-outline-variant/30 p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[4px_4px_0px_0px_#adc6ff] hover:border-[#adc6ff]">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-outline-variant/20 pb-2">Point Breakdown</h2>
            <div className="flex flex-col gap-4">
              <div className="w-full h-4 bg-surface-container rounded-full overflow-hidden flex">
                <div className="bg-primary h-full" style={{ width: '70%' }}></div>
                <div className="bg-tertiary-container h-full" style={{ width: '30%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="font-data-tabular text-data-tabular text-on-surface">Achievements ({athlete.participationStats.achievementPoints} pts)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-tertiary-container"></div>
                  <span className="font-data-tabular text-data-tabular text-on-surface">Participation ({athlete.participationStats.totalPoints} pts)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Performance History Table */}
          <div className="bg-[#162A45] rounded-lg border border-outline-variant/30 overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-[4px_4px_0px_0px_#adc6ff] hover:border-[#adc6ff]">
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
                  {athlete.history.map((item, idx) => (
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
          </div>

        </section>
      </div>
    </Layout>
  );
}
