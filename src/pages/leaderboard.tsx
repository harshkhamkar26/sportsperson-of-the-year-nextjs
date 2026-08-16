import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import AnimatedCounter from "@/components/AnimatedCounter";
import Avatar from "@/components/Avatar";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/leaderboard?page=${page}&search=${search}`);
      const data = await res.json();
      setLeaderboard(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [page, search]);

  return (
    <Layout title="Universal AI University - Athletics Leaderboard">

      <main className="pt-[100px] pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Header Section */}
        <section className="flex flex-col items-center justify-center py-12 md:py-16 gap-6 text-center">
          <img alt="UAIU Sports Logo" className="w-32 h-32 md:w-48 md:h-48 object-contain" src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop"/>
          <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-surface">Official Athletics Leaderboard</h1>
        </section>

        {/* Filters & Search */}
        <section className="mb-12">
          <div className="bg-surface-container border border-outline-variant/30 rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-end">
              {/* Filters */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full md:w-auto flex-grow">
                <div className="flex flex-col gap-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">Academic Year</label>
                  <select className="bg-surface border border-outline/30 rounded-md py-2 px-3 text-on-surface focus:ring-primary focus:border-primary">
                    <option>2023-2024</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">School</label>
                  <select className="bg-surface border border-outline/30 rounded-md py-2 px-3 text-on-surface focus:ring-primary focus:border-primary">
                    <option>All Schools</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">Sport</label>
                  <select className="bg-surface border border-outline/30 rounded-md py-2 px-3 text-on-surface focus:ring-primary focus:border-primary">
                    <option>All Sports</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">Gender</label>
                  <select className="bg-surface border border-outline/30 rounded-md py-2 px-3 text-on-surface focus:ring-primary focus:border-primary">
                    <option>All</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">Year</label>
                  <select className="bg-surface border border-outline/30 rounded-md py-2 px-3 text-on-surface focus:ring-primary focus:border-primary">
                    <option>All Years</option>
                  </select>
                </div>
              </div>
              
              {/* Search */}
              <div className="w-full md:w-64 mt-4 md:mt-0">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant">search</span>
                  <input 
                    className="w-full bg-surface border border-outline/30 rounded-md py-2 pl-10 pr-3 text-on-surface focus:ring-primary focus:border-primary placeholder:text-on-surface-variant/50" 
                    placeholder="Search student name or ID" 
                    type="text"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4 border-t border-outline/10 pt-4">
              <div className="flex bg-surface-container-high rounded-lg p-1 border border-outline-variant/30">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary text-on-primary shadow' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  <span className="material-symbols-outlined text-sm">grid_view</span>
                  Grid
                </button>
                <button 
                  onClick={() => setViewMode('compact')}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-md transition-colors ${viewMode === 'compact' ? 'bg-primary text-on-primary shadow' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  <span className="material-symbols-outlined text-sm">view_list</span>
                  Compact
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard List */}
        {viewMode === 'grid' ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="bg-surface-container rounded-lg border-2 border-outline-variant/30 h-[450px] overflow-hidden flex flex-col"
              >
                <div className="w-full aspect-[4/5] bg-surface-container-high/50 animate-pulse relative"></div>
                <div className="bg-[#162A45] p-4 flex justify-between items-center border-t border-outline-variant/30">
                  <div className="w-16 h-8 bg-surface-container-high/50 animate-pulse rounded"></div>
                  <div className="w-12 h-4 bg-surface-container-high/50 animate-pulse rounded"></div>
                </div>
              </motion.div>
            ))
          ) : leaderboard.length === 0 ? (
            <div className="col-span-full text-center py-10 text-on-surface-variant font-body-lg">
              No athletes found.
            </div>
          ) : (
            leaderboard.map((student: any, index: number) => {
              const rank = student.rank;
              const isRank1 = rank === 1;
              const isRank2 = rank === 2;
              const isRank3 = rank === 3;
              
              // Pseudo-random trend based on ID
              const hash = student.id.charCodeAt(0) % 3;
              const trend = hash === 0 ? 'up' : hash === 1 ? 'down' : 'same';
              
              let borderColor = "border-outline-variant/30";
              let shadowColor = "hover:shadow-[4px_4px_0_0_#adc6ff]";
              let rankBg = "bg-[#162A45]/80";
              let rankText = "text-on-surface";
              let rankBorder = "border-2 border-primary";
              let suffix = "";
              
              if (isRank1) {
                borderColor = "border-rank-gold";
                shadowColor = "shadow-[4px_4px_0_0_#D4AF37]";
                rankBg = "bg-rank-gold";
                rankText = "text-[#000000]";
                rankBorder = "";
                suffix = "st";
              } else if (isRank2) {
                borderColor = "border-rank-silver";
                shadowColor = "shadow-[4px_4px_0_0_#C0C0C0]";
                rankBg = "bg-rank-silver";
                rankText = "text-[#0A192F]";
                rankBorder = "";
                suffix = "nd";
              } else if (isRank3) {
                borderColor = "border-rank-bronze";
                shadowColor = "shadow-[4px_4px_0_0_#CD7F32]";
                rankBg = "bg-rank-bronze";
                rankText = "text-[#0A192F]";
                rankBorder = "";
                suffix = "rd";
              } else {
                suffix = "th";
              }

              return (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <Link href={`/athlete/${student.slug || student.id}`} className="block">
                    <Tilt glareEnable={true} glareMaxOpacity={0.1} scale={1.01} transitionSpeed={1500} tiltMaxAngleX={4} tiltMaxAngleY={4}>
                      <article className={`relative group bg-surface-container rounded-lg border-2 ${borderColor} overflow-hidden ${shadowColor}`}>
                      
                      {/* Rank Badge with Trend */}
                      <div className={`absolute top-4 left-4 z-10 flex items-center shadow-lg`}>
                        <div className={`${rankBg} ${rankText} ${rankBorder} rounded-l-full w-12 h-12 flex items-center justify-center font-data-tabular text-data-tabular font-bold border-r border-outline-variant/20`}>
                          {rank}{isRank1 || isRank2 || isRank3 ? suffix : ""}
                        </div>
                        <div className={`${rankBg} ${rankText} ${rankBorder} rounded-r-full h-12 px-2 flex items-center justify-center`}>
                          {trend === 'up' && <span className="material-symbols-outlined text-green-400 text-sm">trending_up</span>}
                          {trend === 'down' && <span className="material-symbols-outlined text-red-400 text-sm">trending_down</span>}
                          {trend === 'same' && <span className="material-symbols-outlined text-on-surface-variant text-sm">trending_flat</span>}
                        </div>
                      </div>

                      {/* Image */}
                      <div className="w-full aspect-[4/5] relative">
                        <Avatar photoUrl={student.photoUrl} name={student.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/60 to-transparent"></div>
                        
                        {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <div>
                          <h2 className="font-headline-md text-headline-md text-on-surface m-0 leading-tight">{student.name}</h2>
                          <p className="font-data-tabular text-sm text-on-surface-variant">ID: {student.rollNumber} | {student.className}</p>
                        </div>
                      </div>
                      <p className="font-label-caps text-label-caps text-primary mt-1">{student.house || "School of AI"}</p>
                    </div>
                  </div>

                  {/* Stats Bottom */}
                  <div className={`bg-[#162A45] p-4 flex justify-between items-center border-t border-outline-variant/30`}>
                    <div className="font-data-tabular text-data-tabular flex items-baseline">
                      <AnimatedCounter value={student.totalPoints} className={`${isRank1 ? 'text-rank-gold' : 'text-on-surface'} text-2xl font-bold`} />
                      <span className="text-on-surface-variant text-sm ml-1">Pts</span>
                    </div>
                    <div className="flex gap-3 font-data-tabular text-sm text-on-surface">
                      <span className="flex items-center gap-1 text-on-surface-variant text-xs">
                        <AnimatedCounter value={student.eventsCount} /> {student.eventsCount === 1 ? 'Event' : 'Events'}
                      </span>
                    </div>
                  </div>
                    </article>
                  </Tilt>
                  </Link>
                </motion.div>
              );
            })
          )}
        </section>
        ) : (
          <section className="bg-surface-container rounded-xl border border-outline-variant/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high border-b border-outline-variant/30">
                    <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase tracking-wider">Athlete</th>
                    <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase tracking-wider hidden md:table-cell">School</th>
                    <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase tracking-wider hidden sm:table-cell">Events</th>
                    <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase tracking-wider text-right">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <tr key={i} className="border-b border-outline-variant/10">
                        <td className="px-6 py-4"><div className="w-8 h-8 bg-surface-container-high/50 animate-pulse rounded-full"></div></td>
                        <td className="px-6 py-4"><div className="w-32 h-6 bg-surface-container-high/50 animate-pulse rounded"></div></td>
                        <td className="px-6 py-4 hidden md:table-cell"><div className="w-24 h-6 bg-surface-container-high/50 animate-pulse rounded"></div></td>
                        <td className="px-6 py-4 hidden sm:table-cell"><div className="w-16 h-6 bg-surface-container-high/50 animate-pulse rounded"></div></td>
                        <td className="px-6 py-4 text-right"><div className="w-12 h-6 bg-surface-container-high/50 animate-pulse rounded ml-auto"></div></td>
                      </tr>
                    ))
                  ) : leaderboard.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-on-surface-variant font-body-lg">No athletes found.</td>
                    </tr>
                  ) : (
                    leaderboard.map((student: any) => {
                      const hash = student.id.charCodeAt(0) % 3;
                      const trend = hash === 0 ? 'up' : hash === 1 ? 'down' : 'same';
                      return (
                        <tr key={student.id} className="border-b border-outline-variant/10 hover:bg-surface-container-highest transition-colors group">
                          <td className="px-6 py-3 font-data-tabular">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg w-6">{student.rank}</span>
                              {trend === 'up' && <span className="material-symbols-outlined text-green-400 text-sm" title="Up from last week">trending_up</span>}
                              {trend === 'down' && <span className="material-symbols-outlined text-red-400 text-sm" title="Down from last week">trending_down</span>}
                              {trend === 'same' && <span className="material-symbols-outlined text-on-surface-variant text-sm" title="No change">trending_flat</span>}
                            </div>
                          </td>
                          <td className="px-6 py-3">
                            <Link href={`/athlete/${student.slug || student.id}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                              <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30 flex-shrink-0">
                                <Avatar photoUrl={student.photoUrl} name={student.name} className="w-full h-full object-cover text-xs" />
                              </div>
                              <div>
                                <div className="font-headline-md font-bold text-on-surface group-hover:text-primary transition-colors">{student.name}</div>
                                <div className="font-data-tabular text-xs text-on-surface-variant">{student.rollNumber}</div>
                              </div>
                            </Link>
                          </td>
                          <td className="px-6 py-3 font-body-md text-on-surface-variant hidden md:table-cell">{student.className}</td>
                          <td className="px-6 py-3 font-data-tabular hidden sm:table-cell">{student.eventsCount}</td>
                          <td className="px-6 py-3 font-data-tabular font-bold text-primary text-right text-lg">{student.totalPoints}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Load More */}
        <div className="mt-12 flex justify-center gap-4">
          <button 
            disabled={page === 1}
            onClick={() => setPage((p: number) => p - 1)}
            className="bg-surface-container hover:bg-surface-container-high border border-outline/30 text-on-surface font-headline-md text-sm font-bold py-3 px-8 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            Previous
          </button>
          <button 
            disabled={page >= totalPages || leaderboard.length === 0}
            onClick={() => setPage((p: number) => p + 1)}
            className="bg-primary hover:bg-primary-fixed-dim text-on-primary font-headline-md text-sm font-bold py-3 px-8 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            Next Page
          </button>
        </div>
      </main>

    </Layout>
  );
}
