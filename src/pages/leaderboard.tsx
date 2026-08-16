import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`/api/leaderboard?page=${page}&search=${search}`);
      const data = await res.json();
      setLeaderboard(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
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
          <img alt="UAIU Sports Logo" className="w-32 h-32 md:w-48 md:h-48 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH3bMThrnBr0B7S9VZMKTmc-iRCIY2kidTVMUt8mIazF4dgaxlJmP2EEei_mDzberIyD1EqmCgQxpUd9RbIaOq6mNXm4nVm-Fcg2T0QnBSYwlNl8rLPStlqipkddbzk_ZW5yGdcpi227xMwoV874o7T1vekmKPfZvhTxxH89QyNVeIVdq81uU9VjFoxntemMG-pt7jmDuWvuWCDQxjV7PrucGGA6e5FPBpBuL9KsjSFV0-Unxhzac"/>
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
          </div>
        </section>

        {/* Leaderboard List */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaderboard.length === 0 ? (
            <div className="col-span-full text-center py-10 text-on-surface-variant font-body-lg">
              No athletes found.
            </div>
          ) : (
            leaderboard.map((student: any) => {
              const rank = student.rank;
              const isRank1 = rank === 1;
              const isRank2 = rank === 2;
              const isRank3 = rank === 3;
              
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
                <article key={student.id} className={`relative group bg-surface-container rounded-lg border-2 ${borderColor} overflow-hidden transition-transform duration-300 hover:scale-[1.02] ${shadowColor}`}>
                  
                  {/* Rank Badge */}
                  <div className={`absolute top-4 left-4 z-10 ${rankBg} ${rankText} ${rankBorder} rounded-full w-12 h-12 flex items-center justify-center font-data-tabular text-data-tabular font-bold shadow-lg`}>
                    {rank}{isRank1 || isRank2 || isRank3 ? suffix : ""}
                  </div>

                  {/* Image */}
                  <div className="w-full aspect-[4/5] relative">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMgzXfCcUOYoZNOtFpvD5EN7RWDwsMjkY7jVEJY9fjPWinnBfGWEYJeJfuRPltlwJaBXj09OR2_OdY8Wyd5rOGMTA4kVbPFILcfB4cEk023G6SSyg8NPEq5CYBT2zP9CDcU8NJWTLOoLzWS83XnQfg-5sgAYMEChW2YY5rGIOnjCkU0FmTMWjpHQ9boGWOoL5NsGJYLtNxpUUV2nfAe0QhJfK0qxvyt3PgHfsDGv78GlBu8LOQue8" alt={student.name} />
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
                    <div className="font-data-tabular text-data-tabular">
                      <span className={`${isRank1 ? 'text-rank-gold' : 'text-on-surface'} text-2xl font-bold`}>{student.totalPoints}</span>
                      <span className="text-on-surface-variant text-sm ml-1">Pts</span>
                    </div>
                    <div className="flex gap-3 font-data-tabular text-sm text-on-surface">
                      <span className="flex items-center gap-1 text-on-surface-variant text-xs">
                        {student.eventsCount} {student.eventsCount === 1 ? 'Event' : 'Events'}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>

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
