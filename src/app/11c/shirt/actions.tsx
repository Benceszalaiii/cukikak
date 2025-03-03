"use server";

import { getUser } from "@/lib/db";
import prisma from "@/lib/prisma";
import { ShirtSize } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function handleSubmit(formData: FormData) {
  const shirtSize = formData.get("shirtSize");
  if (!shirtSize) {
    throw new Error("Nem adtál meg pólóméretet.");
  }
  const user = await getUser();
  if (!user) {
    throw new Error("Nem található felhasználó.");
  }
  await prisma.user.update({where: {id: user.id}, data: {shirtSize: shirtSize as ShirtSize}});

  revalidatePath("/11c/shirt");
}
