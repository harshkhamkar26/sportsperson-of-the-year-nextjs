import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { sessionId, instagramFollowed } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: "sessionId is required." });
    }

    // Find the live broadcast
    const broadcast = await prisma.broadcast.findFirst({
      where: { status: "LIVE" },
    });

    if (!broadcast) {
      return res.status(404).json({ error: "No live broadcast found." });
    }

    // Create or update viewer session
    const viewerSession = await prisma.viewerSession.upsert({
      where: {
        broadcastId_sessionId: {
          broadcastId: broadcast.id,
          sessionId,
        },
      },
      update: {
        instagramFollowed: instagramFollowed ?? false,
      },
      create: {
        broadcastId: broadcast.id,
        sessionId,
        instagramFollowed: instagramFollowed ?? false,
      },
    });

    // Increment viewer count on broadcast
    await prisma.broadcast.update({
      where: { id: broadcast.id },
      data: {
        viewerCount: { increment: 1 },
      },
    });

    return res.status(200).json({ success: true, viewerSession });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to record viewer session." });
  }
}
