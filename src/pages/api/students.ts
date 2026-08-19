import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  const method = req.method;

  if (method === "GET") {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const search = req.query.search as string || "";
      const skip = (page - 1) * limit;

      const where = search ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { rollNumber: { contains: search, mode: "insensitive" as const } },
        ]
      } : {};

      const students = await prisma.student.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: "asc" },
        include: {
          school: true,
          department: true,
          sport: true,
        }
      });

      const total = await prisma.student.count({ where });

      return res.status(200).json({
        data: students,
        totalCount: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch students." });
    }
  }

  if (method === "POST") {
    try {
      const { rollNumber, name, className, house, photoUrl, gender, schoolId, departmentId, sportId } = req.body;

      if (!rollNumber || !name || !className) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      const student = await prisma.student.create({
        data: { rollNumber, name, className, house, photoUrl, gender, schoolId, departmentId, sportId },
      });

      await prisma.auditLog.create({
        data: {
          adminId: admin.id,
          action: "CREATE",
          entityType: "Student",
          entityId: student.id,
          details: { rollNumber, name },
        }
      });

      return res.status(201).json(student);
    } catch (error: any) {
      if (error.code === "P2002") {
        return res.status(409).json({ error: "A student with this roll number already exists." });
      }
      console.error(error);
      return res.status(500).json({ error: "Failed to create student." });
    }
  }

  if (method === "PUT" || method === "PATCH") {
    try {
      const { id, ...data } = req.body;
      if (!id) return res.status(400).json({ error: "Missing student ID." });

      const student = await prisma.student.update({
        where: { id },
        data,
      });

      await prisma.auditLog.create({
        data: {
          adminId: admin.id,
          action: "UPDATE",
          entityType: "Student",
          entityId: student.id,
          details: { updatedFields: Object.keys(data) },
        }
      });

      return res.status(200).json(student);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Failed to update student." });
    }
  }

  if (method === "DELETE") {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string") return res.status(400).json({ error: "Missing student ID." });

      await prisma.student.delete({
        where: { id },
      });

      await prisma.auditLog.create({
        data: {
          adminId: admin.id,
          action: "DELETE",
          entityType: "Student",
          entityId: id,
          details: { deletedAt: new Date().toISOString() },
        }
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to delete student." });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "PUT", "PATCH", "DELETE"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
