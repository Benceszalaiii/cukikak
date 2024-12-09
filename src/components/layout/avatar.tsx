"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { LogOutIcon, LucideIcon, ShoppingCartIcon, StoreIcon, User2Icon } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";

const items = [
  {
    name: "Áruház",
    path: "/store",
    icon: StoreIcon,
  },
  {
    name: "Megrendelések",
    path: "/orders",
    icon: ShoppingCartIcon
  }
];

export default function UserAvatar({ session }: { session: Session }) {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const redirectTo = (path: string) => {
    window.location.href = path;
    setOpen(false);
  };
  if (!session.user.email) return null;
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border focus:outline-none active:scale-95  sm:h-9 sm:w-9">
            <Image
              alt={session.user.email || "User profile picture"}
              src={session.user.image || "/avatar.webp"}
              width={40}
              height={40}
            />
          </button>
        </DrawerTrigger>
        <DrawerContent className="w-full bg-amber-500 text-black">
          <DrawerHeader>
            <DrawerTitle>{session.user.name}</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="flex w-full text-black flex-col items-start justify-start gap-1 px-2">
            <DrawerItemWithIcon
              onClick={() => {
                redirectTo(`/user/${session.user.id}`);
              }}
              Icon={User2Icon}
            >
              Profil
            </DrawerItemWithIcon>
            {items.map((item) => (
              <DrawerItemWithIcon
                key={item.name}
                onClick={() => {
                  redirectTo(item.path);
                }}
                Icon={item.icon}
              >
                {item.name}
              </DrawerItemWithIcon>
            ))}
            <DrawerItemWithIcon
              onClick={() => {
                signOut();
              }}
              className="text-red-700 hover:text-red-800 focus:text-red-800"
              Icon={LogOutIcon}
            >
              Kijelentkezés
            </DrawerItemWithIcon>
          </DrawerDescription>
          <DrawerFooter className="mb-4 mt-6 text-center text-sm text-neutral-700">
            {session.user.email}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border focus:outline-none active:scale-95 border-red-600 sm:h-9 sm:w-9">
          <Image
            alt={session.user.email || "User profile picture"}
            src={session.user.image || "/avatar.webp"}
            width={40}
            height={40}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 space-y-1 border">
        <div className="p-2">
          <h2 className="">{session.user.name}</h2>
        </div>
        <DropdownMenuSeparator />
        <DropdownItemWithIcon
          onClick={() => {
            redirectTo(`/user/${session.user.id}`);
          }}
          Icon={User2Icon}
        >
          Profil
        </DropdownItemWithIcon>
        {items.map((item) => (
          <DropdownItemWithIcon
            key={item.name}
            onClick={() => {
              redirectTo(item.path);
            }}
            Icon={item.icon}
            className="focus:bg-amber-600"
          >
            {item.name}
          </DropdownItemWithIcon>
        ))}
        <DropdownMenuSeparator />
        <DropdownItemWithIcon
          onClick={() => {
            signOut();
          }}
          className="text-red-700 focus:text-red-600"
          Icon={LogOutIcon}
        >
          Kijelentkezés
        </DropdownItemWithIcon>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const DropdownItemWithIcon = ({
  children,
  Icon,
  onClick,
  className,
}: {
  children: React.ReactNode;
  Icon: LucideIcon;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className={twMerge(
        "flex hover:bg-amber-600 cursor-pointer flex-row items-center gap-4 text-black",
        className
      )}
    >
      <Icon className="ml-2 h-4 w-4" />
      {children}
    </DropdownMenuItem>
  );
};

const DrawerItemWithIcon = ({
  children,
  className,
  Icon,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  Icon: LucideIcon;
  onClick?: () => void;
}) => {
  return (
    <Button
      onClick={onClick}
      className={twMerge(
        "flex w-full hover:bg-amber-600 cursor-pointer justify-start gap-4",
        className
      )}
      variant={"ghost"}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Button>
  );
};
