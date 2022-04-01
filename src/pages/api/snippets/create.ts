/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import type { Document } from "../../../lib/types/Document";
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
    const {
      body: { title, files, visibility },
    } = req;
    const user = await prisma.user.findUnique({
      where: {
        // Type-casted to string because email is not required in the database
        email: session?.user?.email as string,
      },
    });
    await prisma.snippet
      .create({
        // When you do not add the foreign key, in this case "authorId",
        // TypeScript will scream at you with errors.
        data: {
          title,
          visibility,
          authorId: user?.id as string,
          files: {
            create: [
              files.map((file: Document) => ({
                fileName: file.fileName,
                content: file.content,
                extension: file.extension,
              })),
            ],
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
