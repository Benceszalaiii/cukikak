"use server";

import { uploadFileS3 } from "@/lib/appwrite";
import { getUser } from "@/lib/db";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function uploadFile(file: File, explicit: boolean) {
  const id = crypto.randomUUID();
  const session = await getUser();
  if (!session) {
    return { status: 401, message: "A folytatáshoz jelentkezz be." };
  }
  const res = await uploadFileS3(file, id);
  const res2 = await prisma.publicImage.create({
    data: {
      id: res.$id,
      explicit: explicit,
      postedBy: { connect: { id: session.id } },
      publicLink: `https://cloud.appwrite.io/v1/storage/buckets/67f121170029fe2c7924/files/${res.$id}/view?project=67f11f8f0024cc9e39b6`,
    },
  });
  if (res2 && res) {
    return { status: 200, message: "Sikeres feltöltés!" };
  }
  throw new Error("Feltöltési hiba történt!");
}

export async function getImages(amount: number) {
  const data = await prisma.publicImage.findMany({
    where: { explicit: false },
    include: { postedBy: { select: { name: true, image: true } } },
    take: amount,
  });
  return { data, amount: data.length };
}

export async function deleteImage(id: string) {
  const session = await getUser();
  if (!session) {
    return { status: 401, message: "A folytatáshoz jelentkezz be." };
  }
  if (session.admin && session.role === "STAFF") {
    await prisma.publicImage.update({
      where: { id: id },
      data: { explicit: true },
    });
    revalidatePath("/gallery");
  }
  return;
}
