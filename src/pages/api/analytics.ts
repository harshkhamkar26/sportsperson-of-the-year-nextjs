import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getAdminAnalytics, getBroadcastAnalytics, getAthleteAnalytics } from "@/lib/analytics";
import { requireAdmin } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Public analytics (broadcast stats)
  const broadcastId = req.query.broadcastId as string;
  const studentId = req.query.studentId as string;

  // Public: broadcast analytics
  if (broadcastId) {
    try {
      const analytics = await getBroadcastAnalytics(broadcastId);
      if (!analytics) {
        return res.status(404).json({ error: "Broadcast not found." });
      }
      return res.status(200).json(analytics);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch broadcast analytics." });
    }
  }

  // Public: athlete analytics
  if (studentId) {
    try {
      const analytics = await getAthleteAnalytics(studentId);
      if (!analytics) {
        return res.status(404).json({ error: "Student not found." });
      }
      return res.status(200).json(analytics);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch athlete analytics." });
    }
  }

  // Admin: full dashboard analytics
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  try {
    const analytics = await getAdminAnalytics();
    return res.status(200).json(analytics);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch analytics." });
  }
}
