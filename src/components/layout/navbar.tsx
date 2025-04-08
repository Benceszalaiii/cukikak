"use client";
import { User } from "@prisma/client";
import {
  ClapperboardIcon,
  FlagTriangleRightIcon,
  ImagesIcon,
} from "lucide-react";
import { useState } from "react";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarLogo,
  NavBody,
  NavItems,
} from "../aceternity/nav";
import SignInButton from "../signin";
import UserAvatar from "./avatar";

export default function Navbar2({
  session,
  classmate,
}: {
  session: User | null;
  classmate: boolean;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    {
      name: "Események",
      link: "/timeline",
      icon: FlagTriangleRightIcon,
    },
    {
      name: "Film",
      link: "/movie",
      icon: ClapperboardIcon,
    },
    {
      name: "Galéria",
      link: "/gallery",
      icon: ImagesIcon,
    },
  ];
  return (
    <div className="relative w-full">
      <Navbar className="z-[99]">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {session ? (
              <UserAvatar classmate={classmate} user={session} />
            ) : (
              <SignInButton />
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {session ? (
                <UserAvatar classmate={classmate} user={session} />
              ) : (
                <SignInButton />
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* Navbar */}
    </div>
  );
}
