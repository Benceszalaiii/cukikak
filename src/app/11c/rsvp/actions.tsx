"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
export type RSVPProp = Prisma.RSVPGetPayload<{
  include: { attendants: true; createdBy: true };
}>;
export async function getRSVPs() {
  const events: RSVPProp[] = await prisma.rSVP.findMany({include: {attendants: true, createdBy: true}});
  return events;
}