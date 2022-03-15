import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET}`,
    }),
    GitHubProvider({
      clientId: `${process.env.NEXT_PUBLIC_GITHUB_ID}`,
      clientSecret: `${process.env.NEXT_PUBLIC_GITHUB_SECRET}`,
    }),
  ],
  secret: process.env.SECRET,
});
