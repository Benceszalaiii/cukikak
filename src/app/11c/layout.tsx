"use server";
import UserAvatar from "@/components/layout/avatar";
import Nav from "@/components/layout/nav";
import SignInButton from "@/components/signin";
import { ShinyButton } from "@/components/timeline/submit-button";
import { getUserWithQuizSubmission } from "@/lib/db";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserWithQuizSubmission();
  if (!session) {
    return (
      <>
        <main className="min-h-screen px-4 lg:px-32 w-full flex flex-col justify-center items-center gap-4">
          <h2>Az oldal megtekintéséhez először jelentkezz be.</h2>
          <SignInButton />{" "}
        </main>
      </>
    );
  }
  if (session.Class?.name !== "11.C"){
    return (
        <>
        <Nav />
        <main className="min-h-screen px-4 lg:px-32 w-full flex flex-col justify-center items-center gap-4">
          <h2 className="text-5xl text-red-700 motion-preset-focus font-semibold font-geistmono">Eltévedtél?</h2>
          <p className="tracking-widest text-neutral-400 my-6 text-sm">Ha tudod hogy jó helyen jársz, írj rám.</p>
          <Link href={"/"} draggable={false}>
          <ShinyButton submitted={false} type="button" className="">Főoldal</ShinyButton>
          </Link>
        </main>
        </>
    )
  }
  return (
    <>
    <Link href={"/"} className="fixed left-8 top-6 md:top-8 font-geistmono text-3xl font-semibold text-red-600">11.Corleone</Link>
    <div className="fixed right-8 top-6 md:top-8">
      <UserAvatar user={session} classmate={true} />
    </div>
      <main className="min-h-screen py-16 px-4 lg:px-32 w-full flex flex-col items-center gap-4">
        {children}
      </main>
    </>
  );
}
