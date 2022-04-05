/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      NEXTAUTH_URL: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
      prisma: PrismaClient;
    }
  }
}
