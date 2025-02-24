"use server";

import { getAllEntries, getUser } from "@/lib/db";

export async function getEntries() {
  const session = await getUser();
  if (session) {
    if (session.role === "CLASSMATE") {
      return await getAllEntries("CLASSMATE");
    }
    if (session.role === "STAFF") {
      return await getAllEntries("STAFF");
    }
    if (session.role === "TEACHER") {
      return await getAllEntries("TEACHER");
    }
  }
  return await getAllEntries("USER");
}
