"use server";

import { EntryProps, EntryUploader, getAllEntries, getAllUsers, getUser } from "@/lib/db";

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


export async function getUsers(){
    const session = await getUser();
    if (session){
        if (session.role === "STAFF"){
            return await getAllUsers();
        }
    }
    return [];
}


export async function uploadEntry(values: EntryProps){
    const session = await getUser();
    if (session && session.role === "STAFF"){
        EntryUploader(values, session.id);
    }
}