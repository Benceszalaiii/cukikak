"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { setRole } from "../actions";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "image",
    header: "Profilkép",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Avatar className="w-8 h-8 text-red-600 rounded-full">
          <AvatarImage src={user.image || ""}></AvatarImage>
          <AvatarFallback>{user.name ? user.name[0] : "?"}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Név",
    cell: ({ row }) => {
      const user = row.original;
      return <div>{user.name}</div>;
    },
  },
  {
    accessorKey: "coins",
    header: "Zsetonok",
    cell: ({ row }) => {
      const user = row.original;
      return <div>{user.coins}</div>;
    },
  },
  {
    accessorKey: "role",
    header: "Szerepkör",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              <DotsVerticalIcon></DotsVerticalIcon>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                toast.loading("Szerepkör frissítése...");
                setRole(user.id, "USER")
                  .then(() => {
                    toast.success("Szerepkör frissítve!");
                  })
                  .catch((e) => {
                    toast.error("Hiba történt: " + e);
                  });
              }}
            >
              Felhasználó
            </DropdownMenuItem>{" "}
            <DropdownMenuItem
              onClick={() => {
                toast.loading("Szerepkör frissítése...");
                setRole(user.id, "CLASSMATE")
                  .then(() => {
                    toast.success("Szerepkör frissítve!");
                  })
                  .catch((e) => {
                    toast.error("Hiba történt: " + e);
                  });
              }}
            >
              Osztálytárs
            </DropdownMenuItem>{" "}
            <DropdownMenuItem
              onClick={() => {
                toast.loading("Szerepkör frissítése...");
                setRole(user.id, "TEACHER")
                  .then(() => {
                    toast.success("Szerepkör frissítve!");
                  })
                  .catch((e) => {
                    toast.error("Hiba történt: " + e);
                  });
              }}
            >
              Tanár
            </DropdownMenuItem>{" "}
            <DropdownMenuItem
              onClick={() => {
                toast.loading("Szerepkör frissítése...");
                setRole(user.id, "STAFF")
                  .then(() => {
                    toast.success("Szerepkör frissítve!");
                  })
                  .catch((e) => {
                    toast.error("Hiba történt: " + e);
                  });
              }}
            >
              Szervező
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
