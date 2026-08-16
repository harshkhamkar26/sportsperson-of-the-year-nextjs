import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export async function requireAdmin(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    res.status(401).json({ error: "Unauthorized. Admin access required." });
    return null;
  }

  return session.user;
}
