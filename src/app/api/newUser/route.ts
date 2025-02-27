"use server";

import { addToClass, getUser } from "@/lib/db";
import { permanentRedirect } from "next/navigation";

export async function GET() {
  const session = await getUser();
  if (session) {
    if (
      session.email.includes("@students.jedlik.eu")
    ) {
      await addToClass(session.id);
    }
    return permanentRedirect("/");
  }
  return new Response(null, {
    status: 500,
    statusText:
      "Something went wrong while authenticating you in the database.",
  });
}
