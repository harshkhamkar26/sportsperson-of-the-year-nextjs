import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 25;
    const search = req.query.search as string;
    const house = req.query.house as string;
    const className = req.query.className as string;

    const skip = (page - 1) * limit;

    // Filters for students
    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { rollNumber: { contains: search } },
      ];
    }
    if (house) where.house = house;
    if (className) where.className = className;

    const students = await prisma.student.findMany({
      where,
      include: {
        pointEntries: true,
      },
    });

    const leaderboard = students.map((s) => {
      const totalPoints = s.pointEntries.reduce((sum, entry) => sum + entry.points, 0);
      return {
        ...s,
        totalPoints,
        eventsCount: s.pointEntries.length,
      };
    });

    // Sort descending by points
    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);

    // Apply ranking
    leaderboard.forEach((s, index) => {
      (s as any).rank = index + 1;
    });

    // Paginate
    const paginatedLeaderboard = leaderboard.slice(skip, skip + limit);

    // Set cache headers as requested
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");

    res.status(200).json({
      data: paginatedLeaderboard,
      totalCount: leaderboard.length,
      totalPages: Math.ceil(leaderboard.length / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch leaderboard." });
  }
}
