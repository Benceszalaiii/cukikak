"use server";

import { Timeline } from "@/components/aceternity/timeline";
import { getUser } from "@/lib/db";
import { UserRoles } from "@prisma/client";
import Link from "next/link";
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
      <div className="flex fixed items-center w-full z-10 top-4 text-red-600 justify-center">
        <Link
          href={"/"}
          className="duration-700 ease-out font-caveat text-3xl font-semibold transition-all hover:motion-preset-stretch-md"
        >
          11.Corleone
        </Link>
      </div>
      {/* <DbTester /> */}
      <Timeline data={data} canAdd={user?.role === "STAFF"}></Timeline>
    </>
  );
}
