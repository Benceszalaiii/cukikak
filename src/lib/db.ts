"use server";
import { ProductType } from "@prisma/client";
import "server-only";
import { auth } from "./auth";
import prisma from "./prisma";

export async function getUser() {
  const session = await auth();
  if (!session) {
    return null;
  }
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  return dbUser;
}

export async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function getCoins(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return null;
  }
  return user.coins;
}

export async function addPoints(userId: string, points: number) {
  return await prisma.user.update({
    where: { id: userId },
    data: { coins: { increment: points } },
  });
}

export async function getOrderedProductsByType(type: ProductType) {
  const orders = await prisma.order.findMany({
    where: { products: { some: { type: type } }, status: "PROCESSING" },
  });
  return orders;
}

export async function refundOrder(orderId: number) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    throw new Error("A kért rendelés nem létezik az adatbázisunkban.");
  }
  if (order.status === "PROCESSING" || order.status === "UNPAID") {
    await prisma.user.update({
      where: { id: order.userId },
      data: {
        coins: { increment: order.total },
        Order: {
          update: { where: { id: order.id }, data: { status: "REFUNDED" } },
        },
      },
    });
    return;
  }
  throw new Error(
    "A rendelését már elkészítettük, sajnos nem lehet visszamondani."
  );
}

export async function addToCart(userId: string, productId: number) {
  const updated = await prisma.cart.update({ where: { userId: userId}, data: {products: {connect: {id: productId}}} });
  if (!updated){
    throw new Error("Nem sikerült a kosárhoz adni a terméket")
  }
  return updated;
}

export async function getCart(userId: string){
  const cart = await prisma.cart.findUnique({ where: { userId: userId } });
  if (!cart){
    return await prisma.cart.create({ data: { userId: userId }, include: {products: true} });
  }
  return cart;
}