"use server";

import { Timeline } from "@/components/aceternity/timeline";
import Nav from "@/components/layout/nav";
import { getUser } from "@/lib/db";
import { UserRoles } from "@prisma/client";
import { Metadata } from "next";
import { getEntries } from "./actions";

export type TimelinePropWithUserData = {
  createdBy: {
    id: string;
    name: string | null;
    image: string | null;
    role: UserRoles;
  };
} & {
  attendants: {
    id: string;
    name: string | null;
    image: string | null;
    role: UserRoles;
  }[];
} & {
  id: number;
  createdAt: Date;
  userId: string;
  access: UserRoles;
  title: string;
  description: string;
  tags: string[];
  date: Date;
};
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Események",
  };
}

export default async function Page() {
  const data: TimelinePropWithUserData[] = await getEntries();
  const user = await getUser();
  return (
    <>
      <Nav />
      <Timeline
        data={data}
        userId={user?.id}
        canAdd={user?.role === "STAFF"}
      ></Timeline>
    </>
  );
}
