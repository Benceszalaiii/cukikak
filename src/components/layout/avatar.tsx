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
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import {
  ClapperboardIcon,
  DatabaseIcon,
  FilePlusIcon,
  FlagTriangleRightIcon,
  LogOutIcon,
  LucideIcon,
  ShirtIcon,
  User2Icon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const items = [
  {
    name: "Események",
    path: "/timeline",
    icon: FlagTriangleRightIcon,
  },
  {
    name: "Kampányfilm",
    path: "/movie",
    icon: ClapperboardIcon,
  },
];
const classmateItems = [
  {
    name: "Kvízfeltöltés",
    path: "/11c/upload",
    icon: FilePlusIcon,
  },
  {
    name: "Pólóméret",
    path: "/11c/shirt",
    icon: ShirtIcon,
  },
];

export default function UserAvatar({
  user,
  classmate,
  className,
}: {
  user: User;
  classmate?: boolean;
  className?: string;
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const redirectTo = (path: string) => {
    window.location.href = path;
    setOpen(false);
  };
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <AnimatedGradientText className="p-0 items-end mx-0 justify-end flex w-full">
            <button
              className={cn(
                "flex h-8 w-8 items-center cursor-pointer justify-center overflow-hidden rounded-full border focus:outline-none active:scale-95 text-red-600 sm:h-9 sm:w-9",
                className
              )}
            >
              <Avatar>
                <AvatarImage src={user.image || ""}></AvatarImage>
                <AvatarFallback>{user.name && user.name[0]}</AvatarFallback>
              </Avatar>
            </button>
          </AnimatedGradientText>
        </DrawerTrigger>
        <DrawerContent className="w-full bg-black border-gray-500/25 border">
          <DrawerHeader>
            <DrawerTitle>{user.name}</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="flex w-full flex-col items-start justify-start gap-1 px-2">
            <DrawerItemWithIcon
              onClick={() => {
                redirectTo(`/user/${user.id}`);
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
            <Separator />
            {classmate &&
              classmateItems.map((item) => (
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
            {user.admin && (
              <>
                <Separator />
                <DrawerItemWithIcon
                  key={"Management bombombom"}
                  onClick={() => {
                    redirectTo("/admin");
                  }}
                  Icon={DatabaseIcon}
                >
                  Vezetőség
                </DrawerItemWithIcon>
              </>
            )}
            <DrawerItemWithIcon
              onClick={() => {
                signOut();
              }}
              Icon={LogOutIcon}
            >
              Kijelentkezés
            </DrawerItemWithIcon>
          </DrawerDescription>
          <DrawerFooter className="mb-4 mt-6 text-center text-sm text-neutral-700">
            {user.email}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <AnimatedGradientText className="p-0 items-end mx-0 justify-end flex w-full">
          <button
            className={cn(
              "flex h-8 w-8 items-center cursor-pointer justify-center overflow-hidden rounded-full border focus:outline-none active:scale-95 text-red-600 sm:h-9 sm:w-9",
              className
            )}
          >
            <Avatar>
              <AvatarImage src={user.image || ""}></AvatarImage>
              <AvatarFallback>{user.name && user.name[0]}</AvatarFallback>
            </Avatar>
          </button>
        </AnimatedGradientText>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 space-y-1 border">
        <div className="p-2">
          <h2 className="">{user.name}</h2>
        </div>
        <DropdownMenuSeparator />
        <DropdownItemWithIcon
          onClick={() => {
            redirectTo(`/user/${user.id}`);
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
          >
            {item.name}
          </DropdownItemWithIcon>
        ))}
        <Separator />
        {classmate &&
          classmateItems.map((item) => (
            <DropdownItemWithIcon
              key={item.name}
              onClick={() => {
                redirectTo(item.path);
              }}
              Icon={item.icon}
            >
              {item.name}
            </DropdownItemWithIcon>
          ))}
        {user.admin && (
          <>
            <Separator />
            <DropdownItemWithIcon
              key={"Management bombombom"}
              onClick={() => {
                redirectTo("/admin");
              }}
              Icon={DatabaseIcon}
            >
              Vezetőség
            </DropdownItemWithIcon>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownItemWithIcon
          onClick={() => {
            signOut();
          }}
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
}: {
  children: React.ReactNode;
  Icon: LucideIcon;
  onClick?: () => void;
}) => {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className={twMerge(
        "flex cursor-pointer flex-row items-center gap-4 text-white"
      )}
    >
      <Icon className="ml-2 h-4 w-4" />
      {children}
    </DropdownMenuItem>
  );
};

const DrawerItemWithIcon = ({
  children,
  Icon,
  onClick,
}: {
  children: React.ReactNode;
  Icon: LucideIcon;
  onClick?: () => void;
}) => {
  return (
    <Button
      onClick={onClick}
      className="flex w-full hover:bg-neutral-900/50 hover:text-red-600 cursor-pointer justify-start gap-4 text-white"
      variant={"ghost"}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Button>
  );
};
