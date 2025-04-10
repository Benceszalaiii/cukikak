"use server";

import { uploadProductImageS3 } from "@/lib/appwrite";
import prisma from "@/lib/prisma";

export async function getProducts() {
  const products = await prisma.product.findMany();
  return products;
}

export async function uploadProduct({
  data,
}: {
  data: { name: string; price: number; count: number; image: File };
}) {
  const img = await uploadProductImageS3(data.image, data.name);
  if (!img){
    throw new Error("A termék képét nem sikerült feltölteni.")
  }
  const res = await prisma.product.create({data: {
    allCount: data.count,
    imageUrl: `https://cloud.appwrite.io/v1/storage/buckets/${img.bucketId}/files/${img.$id}/view?project=67f11f8f0024cc9e39b6`,
    availableCount: data.count,
    name: data.name,
    cost: data.price
  }})
  if (!res){
    throw new Error("A termék feltöltése nem sikerült.")
  }
  return res;
}
