"use server";
import "server-only";

import { getAllUsers } from "@/lib/db";
import { Class, User } from "@prisma/client";
import { Metadata } from "next";
import { Suspense } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Vezetői oldal",
  };
}
async function getData(): Promise<User[]> {
  const response = await getAllUsers();
  return response;
}
export type UserWithClass = User & { Class?: Class };
export default async function Page() {
  const data = await getData();
  return (
    <div className="w-full h-full min-h-screen px-4 md:px-16 bg-neutral-900 mx-auto py-2 md:py-10">
      <h1 className="mb-6 text-2xl mt-16 font-bold">Felhasználók</h1>
      <Suspense>
        <DataTable columns={columns} data={data} />
      </Suspense>
    </div>
  );
}
