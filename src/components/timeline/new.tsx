"use client";
import { getUsers } from "@/app/timeline/actions";
import NewEntryForm from "./newForm";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function CreateEntry() {
  const [users, SetUsers] = useState<User[]>([]);
  useEffect(() => {
    getUsers().then((users) => SetUsers(users));
  }, []);
  return (
    <>
      <div
        key={"new_entry"}
        className="flex justify-start pt-10 md:pt-40 md:gap-10"
      >
        <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
          <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
          </div>
          <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-300 ">
          Esemény létrehozása
          </h3>
        </div>

        <div className="relative pl-20 pr-4 md:pl-4 w-full">
          <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-300">
            Esemény létrehozása
          </h3>
          {
           users && <NewEntryForm users={users} />
          }
        </div>
      </div>
    </>
  );
}
