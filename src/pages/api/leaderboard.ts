import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getRankings } from "@/lib/rankings";

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

    // Apply ranking is now done inside getRankings
    const leaderboard = await getRankings(where);

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
