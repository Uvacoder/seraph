/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "lib/prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (req.method !== "DELETE") {
    res
      .status(405)
      .json({ success: false, message: "Only DELETE requests allowed" });
  } else if (!session) {
    res.status(401).json({ success: false, message: "Not authenticated" });
  } else {
    const snippetId = req.query.id;

    await prisma.snippet
      .delete({
        where: {
          id: snippetId as string,
        },
      })
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch((e) => {
        res.status(500).json({ success: false, message: e.message });
      });
  }
}
