"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { translateRole } from "@/lib/utils";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon } from "lucide-react";
import { toast } from "sonner";
import { setRole } from "../actions";
import { UserWithClass } from "../page";

export const columns: ColumnDef<UserWithClass>[] = [
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
    accessorKey: "Class",
    sortingFn: (a, b) => {
      if (a?.original.Class?.name && b?.original.Class?.name) {
        return a.original.Class?.name.localeCompare(b.original.Class?.name);
      }
      return 0;
    },
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
          variant={"ghost"}
        >
          Osztály
          <ArrowUpDownIcon></ArrowUpDownIcon>
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return <div>{user.Class?.name || "-"}</div>;
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
    accessorKey: "shirtSize",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
          variant={"ghost"}
        >
          Pólóméret
          <ArrowUpDownIcon></ArrowUpDownIcon>
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return <div>{user.shirtSize ? user.shirtSize : "-"}</div>;
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
            <Button className="w-32 justify-end" variant={"ghost"}>
              {translateRole(user.role)}
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
