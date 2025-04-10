"use server";

import { deleteProductImageS3, uploadProductImageS3 } from "@/lib/appwrite";
import prisma from "@/lib/prisma";

export async function getProducts() {
  const products = await prisma.product.findMany({ orderBy: { cost: "desc" } });
  return products;
}

export async function uploadProduct({
  data,
}: {
  data: { name: string; price: number; count: number; image: File };
}) {
  const img = await uploadProductImageS3(data.image);
  if (!img) {
    throw new Error("A termék képét nem sikerült feltölteni.");
  }
  const res = await prisma.product.create({
    data: {
      allCount: data.count,
      id: img.$id,
      imageUrl: `https://cloud.appwrite.io/v1/storage/buckets/${img.bucketId}/files/${img.$id}/view?project=67f11f8f0024cc9e39b6`,
      availableCount: data.count,
      name: data.name,
      cost: data.price,
    },
  });
  if (!res) {
    throw new Error("A termék feltöltése nem sikerült.");
  }
  return res;
}

export async function changeProductPricing({
  allCount,
  newPrice,
  productId,
  count,
}: {
  newPrice: number;
  allCount: number;
  productId: string;
  count: number;
}) {
  const res = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      cost: newPrice,
      allCount: allCount,
      availableCount: count,
    },
  });
  if (!res) {
    throw new Error("A termék árának megváltoztatása nem sikerült.");
  }
  return res;
}

export async function deleteProduct(productId: string) {
  console.log("Deleting product with id: ", productId);
  const res = await prisma.product.delete({
    where: {
      id: productId,
    },
  });
  if (!res) {
    throw new Error("A termék törlése nem sikerült.");
  }
  await deleteProductImageS3(productId);
  return res;
}
