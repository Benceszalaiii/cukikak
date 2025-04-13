"use client";

import { IconCircleFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";

export default function Search({
  users,
  activeUser,
}: {
  users: {
    name: string | null;
    id: string;
    image: string | null;
    admin: boolean;
    coins: number;
    Class: {
      name: string;
    } | null;
  }[];
  activeUser?: {
    name: string | null;
    id: string;
    image: string | null;
    admin: boolean;
    coins: number;
    Class: {
      name: string;
    } | null;
  };
}) {
  const router = useRouter();
  return (
    <section className="w-full max-w-7xl group transition-all duration-500 ease-out">
      <Command>
        <CommandInput placeholder="H. K. Lausz" />
        <CommandList className="max-h-0 h-full snap-y snap-proximity transition-all duration-500 ease-out group-focus-within:max-h-[16.5rem] group-hover:max-h-[16.5rem]">
          <CommandEmpty>Nincs találat.</CommandEmpty>
          {users.map((user) => {
            return (
              <CommandItem
                onSelect={() => {
                  router.push(`/admin/manage?user=${user.id}`);
                }}
                key={user.id}
                className={cn("flex flex-row snap-start cursor-pointer items-center gap-4 justify-center", activeUser?.id === user.id ? "text-red-600 border-y" : "")}
              >
                <Avatar className="scale-75">
                  <AvatarImage src={user.image ?? "?"} alt="user"></AvatarImage>
                  <AvatarFallback>
                    {user.name ? user.name[0] : "?"}
                  </AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
                <span className="ml-auto">{user.coins}</span>
                {activeUser?.id === user.id && <IconCircleFilled />}
              </CommandItem>
            );
          })}
        </CommandList>
      </Command>
    </section>
  );
}
