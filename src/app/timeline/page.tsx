"use server";

import { Timeline } from "@/components/aceternity/timeline";
import { getUser } from "@/lib/db";
import { UserRoles } from "@prisma/client";
import { getEntries } from "./actions";

export type TimelinePropWithUserData = {
  createdBy: {
    name: string | null;
    image: string | null;
    role: UserRoles;
  };
} & {
  attendants: {
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

export default async function Page() {
  const data: TimelinePropWithUserData[] = await getEntries();
  const user = await getUser();
  return (
    <>
      <Timeline data={data} canAdd={user?.role === "STAFF"}></Timeline>
    </>
  );
}
