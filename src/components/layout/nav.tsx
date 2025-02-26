"use server";

import { getUserWithQuizSubmission } from "@/lib/db";
import Navbar from "./navbar";

export default async function Nav() {
  const session = await getUserWithQuizSubmission();
  const isClassmate = session?.Class?.name === "11.C";
  const showBanner = isClassmate && session?.questions.length === 0;
  return <Navbar showBanner={showBanner} session={session} classmate={isClassmate} />;
}
