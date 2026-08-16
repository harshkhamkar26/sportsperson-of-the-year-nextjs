import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST" && req.method !== "GET") {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Require admin access for any mutating actions (or even viewing the raw list in admin panel)
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method === "POST") {
    try {
      const { rollNumber, name, className, house, photoUrl } = req.body;

      if (!rollNumber || !name || !className) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      const student = await prisma.student.create({
        data: {
          rollNumber,
          name,
          className,
          house,
          photoUrl,
        },
      });

      return res.status(201).json(student);
    } catch (error: any) {
      // Catch Prisma's unique constraint violation code
      if (error.code === "P2002") {
        return res.status(409).json({ error: "A student with this roll number already exists." });
      }
      console.error(error);
      return res.status(500).json({ error: "Failed to create student." });
    }
  } else if (req.method === "GET") {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = 50;
      const skip = (page - 1) * limit;

      const students = await prisma.student.findMany({
        skip,
        take: limit,
        orderBy: { name: "asc" },
      });

      const total = await prisma.student.count();

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
}
