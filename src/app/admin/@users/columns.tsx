"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "image",
    header: "Profilkép",
    cell: ({row}) => {
        const user = row.original;
      return (
        <Avatar className="w-8 h-8 rounded-full">
          <AvatarImage src={user.image || ""}></AvatarImage>
          <AvatarFallback>UNDEFINED</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Név",
    cell: ({row}) => {
        const user = row.original;
      return <div>{user.name}</div>;
    },
  },
  {
    accessorKey: "coins",
    header: "Zsetonok",
    cell: ({row}) => {
        const user = row.original;
      return <div>{user.coins}</div>;
    },
  }
];
