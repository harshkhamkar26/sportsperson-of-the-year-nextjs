import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  if (method === "GET") {
    try {
      const eventId = req.query.eventId as string;
      const studentId = req.query.studentId as string;

      const where: any = {};
      if (eventId) where.eventId = eventId;
      if (studentId) where.studentId = studentId;

      const participants = await prisma.eventParticipant.findMany({
        where,
        include: {
          student: {
            include: {
              school: true,
              department: true,
              sport: true,
            },
          },
          event: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return res.status(200).json({ data: participants });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch participants." });
    }
  }

  // Admin-only mutations
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (method === "POST") {
    try {
      const { studentId, eventId, status, placement, points } = req.body;

      if (!studentId || !eventId) {
        return res.status(400).json({ error: "studentId and eventId are required." });
      }

      const participant = await prisma.eventParticipant.upsert({
        where: {
          studentId_eventId: { studentId, eventId },
        },
        update: {
          status: status || "REGISTERED",
          placement: placement || null,
          points: points || 0,
        },
        create: {
          studentId,
          eventId,
          status: status || "REGISTERED",
          placement: placement || null,
          points: points || 0,
        },
      });

      await prisma.auditLog.create({
        data: {
          adminId: admin.id,
          action: "CREATE",
          entityType: "EventParticipant",
          entityId: participant.id,
          details: { studentId, eventId, status, placement, points },
        },
      });

      return res.status(201).json(participant);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create participant." });
    }
  }

  if (method === "PUT" || method === "PATCH") {
    try {
      const { id, status, placement, points } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Participant ID is required." });
      }

      const participant = await prisma.eventParticipant.update({
        where: { id },
        data: {
          status: status || undefined,
          placement: placement !== undefined ? placement : undefined,
          points: points !== undefined ? points : undefined,
        },
      });

      await prisma.auditLog.create({
        data: {
          adminId: admin.id,
          action: "UPDATE",
          entityType: "EventParticipant",
          entityId: participant.id,
          details: { status, placement, points },
        },
      });

      return res.status(200).json(participant);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to update participant." });
    }
  }

  if (method === "DELETE") {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Participant ID is required." });
      }

      await prisma.eventParticipant.delete({ where: { id } });

      await prisma.auditLog.create({
        data: {
          adminId: admin.id,
          action: "DELETE",
          entityType: "EventParticipant",
          entityId: id,
        },
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to delete participant." });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "PUT", "PATCH", "DELETE"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
