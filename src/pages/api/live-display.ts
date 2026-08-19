import type { NextApiRequest, NextApiResponse } from "next";
import { getLiveDisplayData } from "@/lib/liveDisplay";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const data = await getLiveDisplayData();
    res.setHeader("Cache-Control", "s-maxage=15, stale-while-revalidate=30");
    return res.status(200).json(JSON.parse(JSON.stringify(data)));
  } catch (error) {
    console.error("Failed to fetch live display data:", error);
    return res.status(500).json({ error: "Failed to fetch live display data." });
  }
}