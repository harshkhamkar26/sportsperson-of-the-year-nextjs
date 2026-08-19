import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  if (method === "GET") {
    try {
      const broadcastId = req.query.broadcastId as string;

      if (!broadcastId) {
        return res.status(400).json({ error: "broadcastId is required." });
      }

      // Get cheer stats
      const [totalCheers, cheerTypeBreakdown, recentCheers] = await Promise.all([
        prisma.cheer.count({ where: { broadcastId } }),
        prisma.cheer.groupBy({
          by: ["type"],
          where: { broadcastId },
          _count: { type: true },
          orderBy: { _count: { type: "desc" } },
        }),
        prisma.cheer.findMany({
          where: { broadcastId },
          orderBy: { createdAt: "desc" },
          take: 50,
        }),
      ]);

      return res.status(200).json({
        totalCheers,
        byType: cheerTypeBreakdown.map((ct) => ({
          type: ct.type,
          count: ct._count.type,
        })),
        recentCheers,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch cheers." });
    }
  }

  if (method === "POST") {
    try {
      const { broadcastId, sessionId, type, studentId } = req.body;

      if (!broadcastId || !type) {
        return res.status(400).json({ error: "broadcastId and type are required." });
      }

      // Validate cheer type
      const validTypes = ["CLAP", "FIRE", "GO", "CHAMPIONS", "SUPPORT"];
      if (!validTypes.includes(type)) {
        return res.status(400).json({ error: "Invalid cheer type." });
      }

      // Verify broadcast exists and is live
      const broadcast = await prisma.broadcast.findUnique({
        where: { id: broadcastId },
      });

      if (!broadcast) {
        return res.status(404).json({ error: "Broadcast not found." });
      }

      if (broadcast.status !== "LIVE") {
        return res.status(400).json({ error: "Broadcast is not live." });
      }

      if (!broadcast.cheerEnabled) {
        return res.status(400).json({ error: "Cheers are disabled for this broadcast." });
      }

      // Create cheer
      const cheer = await prisma.cheer.create({
        data: {
          broadcastId,
          sessionId: sessionId || `anon-${Date.now()}`,
          type,
          studentId: studentId || null,
        },
      });

      // Increment viewer count on broadcast
      await prisma.broadcast.update({
        where: { id: broadcastId },
        data: {
          viewerCount: { increment: 0 }, // viewerCount is updated via sessions
        },
      });

      return res.status(201).json({ success: true, cheer });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create cheer." });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
