import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getLiveBroadcast } from "@/lib/analytics";
import { requireAdmin } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  if (method === "GET") {
    try {
      const id = req.query.id as string;

      if (id) {
        // Get specific broadcast
        const broadcast = await prisma.broadcast.findUnique({
          where: { id },
          include: {
            event: true,
            cheers: {
              orderBy: { createdAt: "desc" },
              take: 100,
            },
            _count: {
              select: { cheers: true, viewerSessions: true },
            },
          },
        });

        if (!broadcast) {
          return res.status(404).json({ error: "Broadcast not found." });
        }

        return res.status(200).json({
          id: broadcast.id,
          title: broadcast.title,
          description: broadcast.description,
          streamUrl: broadcast.streamUrl,
          thumbnail: broadcast.thumbnail,
          status: broadcast.status,
          startedAt: broadcast.startedAt,
          endedAt: broadcast.endedAt,
          viewerCount: broadcast.viewerCount,
          chatEnabled: broadcast.chatEnabled,
          cheerEnabled: broadcast.cheerEnabled,
          instagramGateEnabled: broadcast.instagramGateEnabled,
          event: broadcast.event,
          recentCheers: broadcast.cheers,
          cheerCount: broadcast._count.cheers,
          viewerSessionCount: broadcast._count.viewerSessions,
        });
      }

      // Get live broadcast
      const liveBroadcast = await getLiveBroadcast();
      if (!liveBroadcast) {
        return res.status(200).json({ data: null, message: "No live broadcast at this time." });
      }

      return res.status(200).json({ data: liveBroadcast });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch broadcast." });
    }
  }

  if (method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE") {
    // Require admin for mutations
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    if (method === "POST") {
      try {
        const {
          eventId,
          title,
          description,
          streamUrl,
          thumbnail,
          status,
          startedAt,
          endedAt,
          chatEnabled,
          cheerEnabled,
          instagramGateEnabled,
        } = req.body;

        if (!title) {
          return res.status(400).json({ error: "Title is required." });
        }

        const broadcast = await prisma.broadcast.create({
          data: {
            eventId: eventId || null,
            title,
            description,
            streamUrl,
            thumbnail,
            status: status || "DRAFT",
            startedAt: startedAt ? new Date(startedAt) : null,
            endedAt: endedAt ? new Date(endedAt) : null,
            chatEnabled: chatEnabled ?? true,
            cheerEnabled: cheerEnabled ?? true,
            instagramGateEnabled: instagramGateEnabled ?? true,
          },
        });

        // Audit log
        await prisma.auditLog.create({
          data: {
            adminId: admin.id,
            action: "CREATE",
            entityType: "Broadcast",
            entityId: broadcast.id,
            details: { title, status: broadcast.status },
          },
        });

        return res.status(201).json(broadcast);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to create broadcast." });
      }
    }

    if (method === "PUT" || method === "PATCH") {
      try {
        const { id, ...data } = req.body;

        if (!id) {
          return res.status(400).json({ error: "Broadcast ID is required." });
        }

        const existing = await prisma.broadcast.findUnique({ where: { id } });
        if (!existing) {
          return res.status(404).json({ error: "Broadcast not found." });
        }

        const updateData: any = { ...data };
        if (updateData.startedAt) updateData.startedAt = new Date(updateData.startedAt);
        if (updateData.endedAt) updateData.endedAt = new Date(updateData.endedAt);

        const broadcast = await prisma.broadcast.update({
          where: { id },
          data: updateData,
        });

        // Audit log
        await prisma.auditLog.create({
          data: {
            adminId: admin.id,
            action: "UPDATE",
            entityType: "Broadcast",
            entityId: broadcast.id,
            details: { status: broadcast.status, title: broadcast.title },
          },
        });

        return res.status(200).json(broadcast);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to update broadcast." });
      }
    }

    if (method === "DELETE") {
      try {
        const { id } = req.body;

        if (!id) {
          return res.status(400).json({ error: "Broadcast ID is required." });
        }

        await prisma.broadcast.delete({ where: { id } });

        await prisma.auditLog.create({
          data: {
            adminId: admin.id,
            action: "DELETE",
            entityType: "Broadcast",
            entityId: id,
          },
        });

        return res.status(200).json({ success: true });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to delete broadcast." });
      }
    }
  }

  res.setHeader("Allow", ["GET", "POST", "PUT", "PATCH", "DELETE"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
