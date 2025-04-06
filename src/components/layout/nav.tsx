"use server";

import { getUserWithQuizSubmission } from "@/lib/db";
import Navbar from "./navbar";

export default async function Nav() {
  const session = await getUserWithQuizSubmission();
  const isClassmate = session?.Class?.name === "11.C";
  return <Navbar session={session} classmate={isClassmate} />;
}
