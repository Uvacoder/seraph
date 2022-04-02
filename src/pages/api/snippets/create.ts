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
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ success: false, message: "Only POST requests allowed" });
  } else if (!session) {
    res.status(401).json({ success: false, message: "Not authenticated" });
  } else {
    const parsedData = JSON.parse(req.body);
    const { title, files, visibility } = parsedData;

    await prisma.snippet
      .create({
        // Due to the way Prisma works, you need to connect the snippet with the respective author
        // Or else TypeScript will scream at you with errors.
        data: {
          title,
          visibility,
          author: {
            connect: {
              email: session?.user?.email as string,
            },
          },
          files: {
            create: [...files],
          },
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
