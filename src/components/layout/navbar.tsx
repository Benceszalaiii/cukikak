import { User } from "@prisma/client";
import Link from "next/link";
import SignInButton from "../signin";
import UserAvatar from "./avatar";

export default function Navbar({ session, showBanner, classmate }: { session: User | null, showBanner: boolean, classmate: boolean }) {
  return (
    <>
    {showBanner &&(
      <div className="flex w-full h-12 bg-rose-800 border-b shadow-md items-center justify-center text-lg font-semibold">
        <div className="flex flex-row gap-4 items-center justify-center">
          Még nem töltötted ki a kvíz kérdéseket.
          <Link href={"/11c/upload"} className="underline z-[60] underline-offset-2 transition-all duration-300 hover:underline-offset-4 cursor-pointer">Kattints ide a kitöltéshez.</Link>
        </div>
      </div>
      )}
    <nav className="sticky z-50 top-0 md:px-16 px-4 py-2 left-0 w-full flex flex-row items-center justify-end">
      {/* <Link href={"/"} className="text-2xl  text-foreground font-semibold font-caveat">
        11. Corleone
      </Link> */}
      {session ? <UserAvatar classmate={classmate} user={session} /> : <SignInButton />}
    </nav>
        </>
  );
}
