"use server";

import { addToClass, getUser } from "@/lib/db";
import { redirect } from "next/navigation";
export async function GET() {
  const session = await getUser();
  if (session) {
    if (session.email.includes("@students.jedlik.eu")) {

      try {
        await addToClass(session.id);
      } catch (e: unknown) {
        console.log("Error while autorouting: " + e);
      }
    }
    return redirect("/");
  }
  return new Response(null, {
    status: 500,
    statusText:
      "Something went wrong while authenticating you in the database.",
  });
}
