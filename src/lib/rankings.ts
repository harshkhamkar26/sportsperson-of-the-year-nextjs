import { prisma } from "./prisma";

export type RankedStudent = {
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
  sport: { name: string; icon: string | null } | null;
  school: { name: string; code: string; color: string | null } | null;
  department: { name: string; code: string } | null;
  medals: { gold: number; silver: number; bronze: number };
};

export async function getRankings(filters: any = {}): Promise<RankedStudent[]> {
  const students = await prisma.student.findMany({
    where: filters,
    include: {
      sport: true,
      school: true,
      department: true,
      pointEntries: {
        include: {
          event: true,
        },
      },
    },
  });

  const leaderboard = students.map((s) => {
    const totalPoints = s.pointEntries.reduce((sum, entry) => sum + entry.points, 0);
    
    let gold = 0, silver = 0, bronze = 0;
    s.pointEntries.forEach((entry) => {
      if (entry.position === 1) gold++;
      if (entry.position === 2) silver++;
      if (entry.position === 3) bronze++;
    });

    const { pointEntries, ...studentData } = s;

    return {
      ...studentData,
      totalPoints,
      eventsCount: s.pointEntries.length,
      medals: { gold, silver, bronze },
      rank: 0,
    };
  });

  leaderboard.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (b.medals.gold !== a.medals.gold) return b.medals.gold - a.medals.gold;
    if (b.medals.silver !== a.medals.silver) return b.medals.silver - a.medals.silver;
    if (b.medals.bronze !== a.medals.bronze) return b.medals.bronze - a.medals.bronze;
    return a.name.localeCompare(b.name);
  });

  leaderboard.forEach((s, index) => {
    s.rank = index + 1;
  });

  return leaderboard as RankedStudent[];
}

export async function getMaleRankings() {
  return getRankings({ gender: "MALE" });
}

export async function getFemaleRankings() {
  return getRankings({ gender: "FEMALE" });
}

export async function getSportRankings(sportId: string) {
  // To rank by a specific sport, we need students who have points in events linked to that sport
  const students = await prisma.student.findMany({
    where: {
      pointEntries: {
        some: {
          event: {
            sportId: sportId
          }
        }
      }
    },
    include: {
      pointEntries: {
        where: {
          event: {
            sportId: sportId
          }
        },
        include: {
          event: true
        }
      }
    }
  });

  const leaderboard = students.map((s) => {
    const totalPoints = s.pointEntries.reduce((sum, entry) => sum + entry.points, 0);
    let gold = 0, silver = 0, bronze = 0;
    s.pointEntries.forEach((entry) => {
      if (entry.position === 1) gold++;
      if (entry.position === 2) silver++;
      if (entry.position === 3) bronze++;
    });

    const { pointEntries, ...studentData } = s;
    return {
      ...studentData,
      totalPoints,
      eventsCount: s.pointEntries.length,
      medals: { gold, silver, bronze },
    };
  });

  leaderboard.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.medals.gold !== a.medals.gold) return b.medals.gold - a.medals.gold;
    return a.name.localeCompare(b.name);
  });

  leaderboard.forEach((s, index) => {
    (s as any).rank = index + 1;
  });

  return leaderboard;
}
