"use server";

import { auth } from "@/lib/auth";
import Navbar from "./navbar";
import { getUser } from "@/lib/db";

export default async function Nav() {
  const session = await getUser();
  return (
    <Navbar session={session } />
  )
}
