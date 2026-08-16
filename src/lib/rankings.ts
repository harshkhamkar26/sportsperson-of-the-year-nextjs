import { prisma } from "./prisma";

export async function getRankings(filters: any = {}, sportName?: string) {
  const students = await prisma.student.findMany({
    where: filters,
    include: {
      pointEntries: {
        include: {
          event: true,
        },
      },
    },
  });

  const leaderboard = students.map((s) => {
    // Filter entries if sportName is provided
    const relevantEntries = sportName 
      ? s.pointEntries.filter(entry => entry.event.name.toLowerCase().includes(sportName.toLowerCase()))
      : s.pointEntries;

    const totalPoints = relevantEntries.reduce((sum, entry) => sum + entry.points, 0);
    
    // Calculate gold, silver, bronze counts
    let gold = 0, silver = 0, bronze = 0;
    relevantEntries.forEach((entry) => {
      if (entry.position === 1) gold++;
      if (entry.position === 2) silver++;
      if (entry.position === 3) bronze++;
    });

    const { pointEntries, ...studentData } = s;

    return {
      ...studentData,
      totalPoints,
      eventsCount: relevantEntries.length,
      medals: { gold, silver, bronze },
    };
  });

  // Sort descending by points
  leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);

  // Apply ranking
  leaderboard.forEach((s, index) => {
    (s as any).rank = index + 1;
  });

  return leaderboard;
}
