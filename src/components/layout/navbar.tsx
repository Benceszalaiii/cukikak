import { User } from "@prisma/client";
import Link from "next/link";
import SignInButton from "../signin";
import UserAvatar from "./avatar";

export default function Navbar({ session }: { session: User | null }) {
  return (
    <nav className="fixed z-50 top-0 md:px-16 px-4 py-2 left-0 w-full flex flex-row items-center justify-between">
      <Link href={"/"} className="text-2xl  text-foreground font-semibold font-caveat">
        11 Cirkusz
      </Link>
      {session ? <UserAvatar user={session} /> : <SignInButton />}
    </nav>
  );
}
