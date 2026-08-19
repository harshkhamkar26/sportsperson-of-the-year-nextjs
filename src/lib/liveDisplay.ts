import { prisma } from "./prisma";

/**
 * UAIU SPORTS LIVE — Centralized configuration for the TV/venue display.
 * All timing and toggle settings live here for easy adjustment.
 */

export const LIVE_DISPLAY_CONFIG = {
  maleDuration: 8000,
  femaleDuration: 8000,
  schoolDuration: 10000,
  refreshInterval: 30000, // data sync interval in ms
  tickerEnabled: true,
  showScores: true,
  showEventBanner: true,
};

export interface LiveAthlete {
  id: string;
  name: string;
  rollNumber: string;
  gender: string | null;
  photoUrl: string | null;
  totalPoints: number;
  eventsCount: number;
  medals: { gold: number; silver: number; bronze: number };
  podiums: number;
  sport: { name: string; icon: string | null } | null;
  school: { name: string; code: string; color: string | null } | null;
  department: { name: string; code: string } | null;
  rank: number;
}

export interface LiveSchool {
  id: string;
  name: string;
  code: string;
  color: string | null;
  totalPoints: number;
  athleteCount: number;
  gold: number;
  silver: number;
  bronze: number;
  totalMedals: number;
  rank: number;
}

export interface LiveEventInfo {
  id: string;
  name: string;
  category: string | null;
  venue: string | null;
  sport: { name: string; icon: string | null } | null;
  status: string;
  startTime: Date | null;
  score?: { teamA: string; scoreA: number; teamB: string; scoreB: number } | null;
}

export interface LiveDisplayData {
  maleLeader: LiveAthlete | null;
  femaleLeader: LiveAthlete | null;
  schools: LiveSchool[];
  activeEvent: LiveEventInfo | null;
}

/**
 * Fetch all data needed for the live TV display.
 * Uses real ranking data from the database.
 */
export async function getLiveDisplayData(): Promise<LiveDisplayData> {
  // Get all students with their point entries, sport, school
  const students = await prisma.student.findMany({
    include: {
      sport: true,
      school: true,
      department: true,
      pointEntries: { include: { event: true } },
    },
  });

  // Build athlete leaderboard
  const leaderboard = students.map((s) => {
    const totalPoints = s.pointEntries.reduce((sum, pe) => sum + pe.points, 0);
    const gold = s.pointEntries.filter((pe) => pe.position === 1).length;
    const silver = s.pointEntries.filter((pe) => pe.position === 2).length;
    const bronze = s.pointEntries.filter((pe) => pe.position === 3).length;

    return {
      id: s.id,
      name: s.name,
      rollNumber: s.rollNumber,
      gender: s.gender,
      photoUrl: s.photoUrl,
      totalPoints,
      eventsCount: s.pointEntries.length,
      medals: { gold, silver, bronze },
      podiums: gold + silver + bronze,
      sport: s.sport,
      school: s.school,
      department: s.department,
      rank: 0,
    };
  });

  // Sort by points descending for overall rank
  leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
  leaderboard.forEach((s, i) => (s.rank = i + 1));

  // Get male leader
  const maleLeader =
    leaderboard.find((s) => s.gender === "MALE") || leaderboard.find((s) => s.gender !== "FEMALE") || null;

  // Get female leader
  const femaleLeader = leaderboard.find((s) => s.gender === "FEMALE") || null;

  // School rankings from analytics helper
  const { getSchoolRankings } = await import("./analytics");
  const rawSchools = await getSchoolRankings();
  const schools: LiveSchool[] = rawSchools.map((s, i) => ({ ...s, rank: i + 1 }));

  // Active live event (if any real live event exists)
  const activeEventRaw = await prisma.broadcast.findFirst({
    where: { status: "LIVE" },
    include: { event: { include: { sport: true } } },
  });

  let activeEvent: LiveEventInfo | null = null;
  if (activeEventRaw?.event) {
    activeEvent = {
      id: activeEventRaw.event.id,
      name: activeEventRaw.event.name,
      category: activeEventRaw.event.category,
      venue: activeEventRaw.event.venue,
      sport: activeEventRaw.event.sport,
      status: activeEventRaw.status,
      startTime: activeEventRaw.event.startTime,
      score: null, // would come from a score model when available
    };
  }

  return { maleLeader, femaleLeader, schools, activeEvent };
}