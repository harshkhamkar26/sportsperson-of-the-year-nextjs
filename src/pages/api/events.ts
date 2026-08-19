import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  if (method === "GET") {
    try {
      const status = req.query.status as string;
      const sportId = req.query.sportId as string;
      const upcoming = req.query.upcoming === "true";

      const where: any = {};
      if (status) where.status = status;
      if (sportId) where.sportId = sportId;
      if (upcoming) {
        where.status = { in: ["SCHEDULED", "LIVE"] };
      }

      const events = await prisma.event.findMany({
        where,
        include: {
          sport: true,
          broadcasts: {
            where: { status: "LIVE" },
          },
        },
        orderBy: { date: "desc" },
      });

      return res.status(200).json({ data: events });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch events." });
    }
  }

  // Admin-only mutations
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (method === "POST") {
    try {
      const {
        name,
        date,
        sportId,
        category,
        venue,
        startTime,
        endTime,
        status,
        broadcastUrl,
        thumbnail,
        commentary,
      } = req.body;

      if (!name || !date) {
        return res.status(400).json({ error: "Name and date are required." });
      }

      const event = await prisma.event.create({
        data: {
          name,
          date: new Date(date),
          sportId: sportId || null,
          category,
          venue,
          startTime: startTime ? new Date(startTime) : null,
          endTime: endTime ? new Date(endTime) : null,
          status: status || "DRAFT",
          broadcastUrl,
          thumbnail,
          commentary,
        },
      });

      await prisma.auditLog.create({
        data: {
          adminId: admin.id,
          action: "CREATE",
          entityType: "Event",
          entityId: event.id,
          details: { name, status: event.status },
        },
      });

      return res.status(201).json(event);
    } catch (error: any) {
      if (error.code === "P2002") {
        return res.status(409).json({ error: "An event with this name and date already exists." });
      }
      console.error(error);
      return res.status(500).json({ error: "Failed to create event." });
    }
  }

  if (method === "PUT" || method === "PATCH") {
    try {
      const { id, ...data } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Event ID is required." });
      }

      const updateData: any = { ...data };
      if (updateData.date) updateData.date = new Date(updateData.date);
      if (updateData.startTime) updateData.startTime = new Date(updateData.startTime);
      if (updateData.endTime) updateData.endTime = new Date(updateData.endTime);

      const event = await prisma.event.update({
        where: { id },
        data: updateData,
      });

      await prisma.auditLog.create({
        data: {
          adminId: admin.id,
          action: "UPDATE",
          entityType: "Event",
          entityId: event.id,
          details: { name: event.name, status: event.status },
        },
      });

      return res.status(200).json(event);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to update event." });
    }
  }

  if (method === "DELETE") {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Event ID is required." });
      }

      await prisma.event.delete({ where: { id } });

      await prisma.auditLog.create({
        data: {
          adminId: admin.id,
          action: "DELETE",
          entityType: "Event",
          entityId: id,
        },
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to delete event." });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "PUT", "PATCH", "DELETE"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
