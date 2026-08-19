import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getSchoolRankings, getHouseRankings } from "@/lib/analytics";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const type = req.query.type as string;

    if (type === "houses") {
      const houses = await getHouseRankings();
      return res.status(200).json({ data: houses });
    }

    // Default: school rankings
    const schools = await getSchoolRankings();

    // Optionally include detailed school info
    if (req.query.detailed === "true") {
      const detailed = await Promise.all(
        schools.map(async (school) => {
          const [athleteCount, eventCount, gold, silver, bronze] = await Promise.all([
            prisma.student.count({ where: { schoolId: school.id } }),
            prisma.eventParticipant.count({
              where: { student: { schoolId: school.id }, status: { in: ["PARTICIPATED", "WINNER"] } },
            }),
            prisma.pointEntry.count({
              where: { student: { schoolId: school.id }, position: 1 },
            }),
            prisma.pointEntry.count({
              where: { student: { schoolId: school.id }, position: 2 },
            }),
            prisma.pointEntry.count({
              where: { student: { schoolId: school.id }, position: 3 },
            }),
          ]);

          // Top athlete
          const topAthlete = await prisma.student.findFirst({
            where: { schoolId: school.id },
            include: {
              pointEntries: true,
            },
            orderBy: {
              pointEntries: { _count: "desc" },
            },
          });

          // Strongest sports
          const sportStats: Record<string, number> = {};
          const students = await prisma.student.findMany({
            where: { schoolId: school.id },
            include: {
              pointEntries: { include: { event: { include: { sport: true } } } },
            },
          });
          students.forEach((s) => {
            s.pointEntries.forEach((pe) => {
              const sportName = pe.event.sport?.name || "General";
              sportStats[sportName] = (sportStats[sportName] || 0) + pe.points;
            });
          });
          const strongestSports = Object.entries(sportStats)
            .map(([name, pts]) => ({ name, points: Math.round(pts) }))
            .sort((a, b) => b.points - a.points)
            .slice(0, 3);

          return {
            ...school,
            athletes: athleteCount,
            events: eventCount,
            gold,
            silver,
            bronze,
            topAthlete: topAthlete
              ? { name: topAthlete.name, photoUrl: topAthlete.photoUrl }
              : null,
            strongestSports,
          };
        })
      );

      return res.status(200).json({ data: detailed });
    }

    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
    return res.status(200).json({ data: schools });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch school rankings." });
  }
}
