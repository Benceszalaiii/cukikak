"use server";
import "server-only";

import { getAllUsers } from "@/lib/db";
import { Class, User } from "@prisma/client";
import { Suspense } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Link from "next/link";

async function getData(): Promise<User[]> {
    const response = await getAllUsers();
    return response;
}
export type UserWithClass = User & {Class?: Class};
export default async function Page() {
    const data = await getData();
    return (
        <div className="w-full h-full min-h-screen px-4 md:px-16 bg-neutral-900 mx-auto py-2 md:py-10">
            <Link href={"/"} className="fixed top-8 left-8 font-geistmono text-3xl text-red-600 tracking-wider">11. Corleone</Link>
            <h1 className="mb-6 text-2xl mt-16 font-bold">Felhasználók</h1>
            <Suspense>
                <DataTable columns={columns} data={data} />
            </Suspense>
        </div>
    );
}