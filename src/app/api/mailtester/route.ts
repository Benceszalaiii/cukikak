"use server";

import { sendSimpleMail } from "@/lib/mail";

export async function GET() {
  await sendSimpleMail();
  return new Response("Email sent", { status: 200 });
}
