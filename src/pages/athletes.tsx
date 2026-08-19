import React, { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CinematicBackground from "@/components/cinema/CinematicBackground";
import SectionHeading from "@/components/cinema/SectionHeading";
import Reveal from "@/components/cinema/Reveal";
import { getRankings } from "@/lib/rankings";

export async function getServerSideProps() {
  try {
    const rankings = await getRankings();
    return {
      props: { athletes: JSON.parse(JSON.stringify(rankings)) },
    };
  } catch (error) {
    console.error("Failed to fetch athletes:", error);
    return {
      props: { athletes: [] },
    };
  }
}

interface Athlete {
  id: string;
  name: string;
  rollNumber: string;
  className: string;
  house: string | null;
  photoUrl: string | null;
  gender: string | null;
  totalPoints: number;
  eventsCount: number;
  rank: number;
  medals: { gold: number; silver: number; bronze: number };
}

export default function AthletesPage({ athletes }: { athletes: Athlete[] }) {
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");

  const filtered = useMemo(() => {
    return athletes.filter((a) => {
      const matchesSearch =
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.rollNumber.toLowerCase().includes(search.toLowerCase());
      const matchesGender =
        genderFilter === "All" ||
        (genderFilter === "Men" && a.gender === "MALE") ||
        (genderFilter === "Women" && a.gender === "FEMALE");
      return matchesSearch && matchesGender;
    });
  }, [athletes, search, genderFilter]);

  return (
    <Layout title="Athletes | UAIU Sports Directory">
      <Head>
        <meta name="theme-color" content="#0a0a0a" />
      </Head>
      <CinematicBackground tone="arena" />

      <div className="relative z-10 w-full min-h-screen pt-32 pb-24 px-5 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          {/* Hero */}
          <Reveal className="text-center mb-20">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.5em] text-[#D4AF37] mb-4">
              Athlete Directory
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-black uppercase text-white tracking-tight drop-shadow-2xl">
              The Athletes
            </h1>
            <p className="mt-4 font-sans text-sm font-light text-white/50 tracking-widest uppercase">
              "Every champion has a story."
            </p>
          </Reveal>

          {/* Filters */}
          <Reveal delay={0.2} className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-96">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                  search
                </span>
                <input
                  type="text"
                  placeholder="SEARCH ATHLETE..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm font-sans uppercase text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                />
              </div>

              <div className="flex items-center gap-2">
                {["All", "Men", "Women"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenderFilter(g)}
                    className={`px-6 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all ${
                      genderFilter === g
                        ? "bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                        : "bg-black/40 text-white/50 border border-white/10 hover:text-white hover:border-white/30"
                    }`}
                  >
                    {g === "All" ? "All Athletes" : g === "Men" ? "Sportsmen" : "Sportswomen"}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Athletes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((athlete, i) => (
              <Reveal key={athlete.id} delay={i * 0.05}>
                <Link href={`/athlete/${athlete.id}`}>
                  <motion.div
                    className="group relative rounded-2xl border border-white/[0.06] bg-[#111]/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/30 hover:bg-[#111]"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/10">
                        {athlete.photoUrl ? (
                          <img
                            src={athlete.photoUrl}
                            alt={athlete.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#333] to-[#111]">
                            <span className="font-display text-xl font-bold text-white/30">
                              {athlete.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-xl font-black uppercase text-white group-hover:text-[#D4AF37] transition-colors">
                          {athlete.name}
                        </h3>
                        <p className="font-sans text-xs text-white/40">
                          {athlete.rollNumber} • {athlete.className}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <span className="font-display text-2xl font-bold text-[#D4AF37]">
                          #{athlete.rank}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <span className="font-display text-xl font-bold text-white">
                          {athlete.totalPoints}
                        </span>
                        <p className="font-sans text-[10px] uppercase tracking-widest text-white/40">
                          Points
                        </p>
                      </div>
                      <div>
                        <span className="font-display text-xl font-bold text-white">
                          {athlete.eventsCount}
                        </span>
                        <p className="font-sans text-[10px] uppercase tracking-widest text-white/40">
                          Events
                        </p>
                      </div>
                      <div>
                        <span className="font-display text-xl font-bold text-[#D4AF37]">
                          {athlete.medals.gold}
                        </span>
                        <p className="font-sans text-[10px] uppercase tracking-widest text-white/40">
                          Gold
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-3 border-t border-white/5 pt-3">
                      <span className="text-[#D4AF37]">🥇</span>
                      <span className="font-sans text-xs text-white/60">
                        {athlete.medals.gold}G {athlete.medals.silver}S {athlete.medals.bronze}B
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full text-center py-20 text-white/30 font-sans text-sm uppercase tracking-widest">
                No athletes found.
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
