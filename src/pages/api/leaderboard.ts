import type { NextApiRequest, NextApiResponse } from "next";
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

    // Get global rankings first to preserve global rank numbers
    let leaderboard = await getRankings();

    // Apply filtering on the result
    if (search) {
      const searchLower = search.toLowerCase();
      leaderboard = leaderboard.filter(s => 
        s.name.toLowerCase().includes(searchLower) || 
        s.rollNumber.toLowerCase().includes(searchLower)
      );
    }
    if (house) {
      leaderboard = leaderboard.filter(s => s.house === house);
    }
    if (className) {
      leaderboard = leaderboard.filter(s => s.className === className);
    }

    // Paginate
    const paginatedLeaderboard = leaderboard.slice(skip, skip + limit);

    // Set cache headers
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
