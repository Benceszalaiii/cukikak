import { PrismaAdapter } from "@auth/prisma-adapter";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./lib/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's database id. */
      id: string;
    } & DefaultSession["user"];
  }
}

export default {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  theme: { brandColor: "#e3c91e" },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
} satisfies NextAuthConfig;
