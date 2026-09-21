import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CinematicBackground from "@/components/cinema/CinematicBackground";
import SectionHeading from "@/components/cinema/SectionHeading";
import Reveal from "@/components/cinema/Reveal";
import { getSchoolRankings, getHouseRankings } from "@/lib/analytics";

export async function getServerSideProps() {
  try {
    const schools = await getSchoolRankings();
    const houses = await getHouseRankings();
    return {
      props: {
        schools: JSON.parse(JSON.stringify(schools)),
        houses: JSON.parse(JSON.stringify(houses)),
      },
    };
  } catch (error) {
    console.error("Failed to fetch school rankings:", error);
    return {
      props: {
        schools: [],
        houses: [],
      },
    };
  }
}

interface School {
  id: string;
  name: string;
  code: string;
  color: string | null;
  logoUrl: string | null;
  totalPoints: number;
  athleteCount: number;
  gold: number;
  silver: number;
  bronze: number;
  totalMedals: number;
}

interface House {
  name: string;
  gold: number;
  silver: number;
  bronze: number;
  totalPoints: number;
  totalMedals: number;
  athleteCount: number;
}

export default function SchoolsPage({
  schools,
  houses,
}: {
  schools: School[];
  houses: House[];
}) {
  const maxPoints = schools.length > 0 ? Math.max(...schools.map((s) => s.totalPoints)) : 1;

  return (
    <Layout title="School Rankings | UAIU Sports Championship">
      <Head>
        <meta name="theme-color" content="#0a0a0a" />
      </Head>
      <CinematicBackground tone="race" />

      <div className="relative z-10 w-full min-h-screen pt-32 pb-24 px-5 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          {/* HERO */}
          <Reveal className="text-center mb-20">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.5em] text-[#D4AF37] mb-4">
              School Championship
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-black uppercase text-white tracking-tight drop-shadow-2xl">
              The Campus Race
            </h1>
            <p className="mt-4 font-sans text-sm font-light text-white/50 tracking-widest uppercase">
              "Which school dominates the season?"
            </p>
          </Reveal>

          {/* School Rankings */}
          <Reveal delay={0.2} className="mb-16">
            <SectionHeading
              kicker="School Standings"
              title="School Championship Rankings"
              sub="Real-time aggregation of all athlete points across every discipline."
            />
          </Reveal>

          <div className="space-y-6 mb-24">
            {schools.map((school, index) => {
              const percentage = (school.totalPoints / maxPoints) * 100;
              const rank = index + 1;
              const isTop3 = rank <= 3;

              return (
                <Reveal key={school.id} delay={index * 0.1}>
                  <Link href={`/schools/${school.id}`}>
                    <motion.div
                      className="group relative flex items-center gap-6 rounded-2xl border p-6 md:p-8 transition-all duration-300"
                      style={{
                        backgroundColor: isTop3
                          ? "rgba(212, 175, 55, 0.05)"
                          : "rgba(255, 255, 255, 0.02)",
                        borderColor: isTop3
                          ? "rgba(212, 175, 55, 0.3)"
                          : "rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      {/* Rank */}
                      <div className="flex-shrink-0 flex items-center justify-center w-16 h-16">
                        {isTop3 ? (
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center font-display text-2xl font-black"
                            style={{
                              background:
                                rank === 1
                                  ? "linear-gradient(135deg, #D4AF37, #F4D588)"
                                  : rank === 2
                                  ? "linear-gradient(135deg, #C0C0C0, #E2E8F0)"
                                  : "linear-gradient(135deg, #CD7F32, #D29962)",
                              color: "black",
                            }}
                          >
                            {rank}
                          </div>
                        ) : (
                          <span className="font-display text-3xl font-black text-white/20">
                            {rank}
                          </span>
                        )}
                      </div>

                      {/* School Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display text-xl md:text-2xl font-black uppercase text-white group-hover:text-[#D4AF37] transition-colors">
                            {school.name}
                          </h3>
                          <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-white/40">
                            [{school.code}]
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="relative mt-3 h-8">
                          <div className="absolute inset-0 rounded-full bg-white/[0.03] border border-white/[0.06] overflow-hidden">
                            <motion.div
                              className="h-full rounded-full flex items-center justify-end px-3 transition-all duration-700"
                              style={{
                                width: `${percentage}%`,
                                background: school.color
                                  ? `linear-gradient(90deg, ${school.color}40, ${school.color})`
                                  : "linear-gradient(90deg, #D4AF3740, #D4AF37)",
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            >
                              <span className="font-display text-sm font-bold text-white drop-shadow-lg">
                                {school.totalPoints}
                              </span>
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      {/* Medals */}
                      <div className="flex-shrink-0 flex items-center gap-4 md:gap-6">
                        <div className="flex items-center gap-1">
                          <span className="text-[#D4AF37]">🥇</span>
                          <span className="font-display text-lg font-bold text-white">
                            {school.gold}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[#C0C0C0]">🥈</span>
                          <span className="font-display text-lg font-bold text-white">
                            {school.silver}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[#CD7F32]">🥉</span>
                          <span className="font-display text-lg font-bold text-white">
                            {school.bronze}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0 text-white/20 group-hover:text-[#D4AF37] transition-colors">
                        <span className="material-symbols-outlined text-xl">
                          arrow_forward
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

        </div>
      </div>
    </Layout>
  );
}
