import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "2mb", // Cap upload size to 2MB
    },
  },
};

type Row = {
  rollNumber: string;
  points: number;
  position?: number | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  try {
    const { eventId, rows } = req.body as { eventId: string; rows: Row[] };

    if (!eventId || !rows || !Array.isArray(rows)) {
      return res.status(400).json({ error: "Invalid payload. Expected eventId and an array of rows." });
    }

    if (rows.length > 2000) {
      return res.status(400).json({ error: "File too large. Maximum 2000 rows per upload." });
    }

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }

    // 1. Validation Phase
    const errors: { row: number; error: string }[] = [];
    const validRows: { studentId: string; points: number; position?: number | null }[] = [];

    // Pre-fetch all students in the batch to validate roll numbers efficiently
    const rollNumbers = Array.from(new Set(rows.map((r) => r.rollNumber?.toString().trim()).filter(Boolean)));
    const students = await prisma.student.findMany({
      where: { rollNumber: { in: rollNumbers } },
      select: { id: true, rollNumber: true },
    });
    
    const studentMap = new Map(students.map((s) => [s.rollNumber.toLowerCase(), s.id]));

    rows.forEach((row, index) => {
      const rowNum = index + 1; // 1-indexed for user readability
      
      const roll = row.rollNumber?.toString().trim();
      if (!roll) {
        errors.push({ row: rowNum, error: "Missing rollNumber." });
        return;
      }

      const points = Number(row.points);
      if (isNaN(points) || points < 0) {
        errors.push({ row: rowNum, error: `Invalid points value: ${row.points}. Must be a non-negative number.` });
        return;
      }

      const position = row.position != null && String(row.position) !== "" ? Number(row.position) : null;
      if (position !== null && (isNaN(position) || position < 1)) {
        errors.push({ row: rowNum, error: `Invalid position value: ${row.position}. Must be a positive integer.` });
        return;
      }

      const studentId = studentMap.get(roll.toLowerCase());
      if (!studentId) {
        errors.push({ row: rowNum, error: `Student with roll number '${roll}' not found.` });
        return;
      }

      validRows.push({
        studentId,
        points,
        position,
      });
    });

    // If ANY row fails validation, reject the WHOLE batch
    if (errors.length > 0) {
      return res.status(400).json({
        error: "Validation failed. No data was saved.",
        details: errors, // Return list of row-level errors
      });
    }

    // 2. Execution Phase (Transactional All-or-Nothing)
    // Map each valid row to an upsert operation
    const operations = validRows.map((row) => 
      prisma.pointEntry.upsert({
        where: {
          studentId_eventId: {
            studentId: row.studentId,
            eventId: eventId,
          },
        },
        update: {
          points: row.points,
          position: row.position,
          enteredById: admin.id,
        },
        create: {
          studentId: row.studentId,
          eventId: eventId,
          points: row.points,
          position: row.position,
          enteredById: admin.id,
        },
      })
    );

    // Run all upserts in a single transaction
    await prisma.$transaction(operations);

    return res.status(200).json({ success: true, message: `Successfully saved ${operations.length} records.` });

  } catch (error) {
    console.error("Bulk upload error:", error);
    return res.status(500).json({ error: "An unexpected error occurred during bulk upload." });
  }
}
