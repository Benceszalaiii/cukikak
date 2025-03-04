"use server";
import { UserRoles } from "@prisma/client";
import "server-only";
import { auth } from "./auth";
import prisma from "./prisma";
import { getLevel } from "./utils";

export async function addToClass(userId: string) {
  const user = await getUser();
  if (!user) {
    return;
  }
  const isClassmate = user.name?.includes("11C_");
  if (isClassmate) {
    await prisma.user.update({
      where: { id: userId },
      data: { role: UserRoles.CLASSMATE },
    });
  }
  const userClassname =
    user.name
      ?.split(" ")
      .filter((x) => x === "_")[0]
      .split("_")[0] || "cantAutoroute";
  const classToUpdate = await prisma.class.findFirst({
    where: { shortTerm: userClassname },
  });
  if (!classToUpdate) {
    return;
  }
  const classUpdated = await prisma.class.update({
    where: { id: classToUpdate?.id },
    data: { users: { connect: { id: user.id } } },
  });
  return classUpdated;
}


export async function getClassUsers(className: string){
  const users = await prisma.class.findFirst({where: {name: className}, include: {users: true}})
  return users?.users;
}
export async function getUserWithQuizSubmission(userId?: string) {
  if (userId) {
    const res = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        questions: true,
        Class: true,
      },
    });
    return res;
  }
  const session = await auth();
  if (!session) {
    return null;
  }
  const res = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      questions: true,
      Class: true,
    },
  });
  return res;
}

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
  const users = await prisma.user.findMany({include: {Class: true}});
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

export async function getAllEntries(accessLevel: UserRoles) {
  const processedLevel: UserRoles[] = getLevel(accessLevel);
  const res = await prisma.timelineEntries.findMany({
    where: { access: { in: processedLevel } },
    include: {
      createdBy: { select: { image: true, name: true, role: true, id: true } },
      attendants: { select: { name: true, image: true, role: true, id: true } },
    },
    orderBy: { date: "desc" },
  });
  return res;
}

export interface EntryProps {
  title: string;
  description: string;
  date: Date;
  attendants: string[];
  tags: string[];
  access_level: UserRoles;
}

export async function EntryUploader(values: EntryProps, userId: string) {
  const res = await prisma.timelineEntries.create({
    data: {
      access: values.access_level,
      date: values.date,
      description: values.description,
      title: values.title,
      attendants: {
        connect: await prisma.user.findMany({
          where: { id: { in: values.attendants } },
        }),
      },
      tags: values.tags,
      userId: userId,
    },
  });
  return res;
}

// export async function getOrderedProductsByType(type: ProductType) {
//   const orders = await prisma.order.findMany({
//     where: { products: { some: { type: type } }, status: "PROCESSING" },
//   });
//   return orders;
// }

// export async function refundOrder(orderId: number) {
//   const order = await prisma.order.findUnique({ where: { id: orderId } });
//   if (!order) {
//     throw new Error("A kért rendelés nem létezik az adatbázisunkban.");
//   }
//   if (order.status === "PROCESSING" || order.status === "UNPAID") {
//     await prisma.user.update({
//       where: { id: order.userId },
//       data: {
//         coins: { increment: order.total },
//         Order: {
//           update: { where: { id: order.id }, data: { status: "REFUNDED" } },
//         },
//       },
//     });
//     return;
//   }
//   throw new Error(
//     "A rendelését már elkészítettük, sajnos nem lehet visszamondani."
//   );
// }

// export async function addToCart(userId: string, productId: number) {
//   const updated = await prisma.cart.update({ where: { userId: userId}, data: {products: {connect: {id: productId}}} });
//   if (!updated){
//     throw new Error("Nem sikerült a kosárhoz adni a terméket")
//   }
//   return updated;
// }

// export async function getCart(userId: string){
//   const cart = await prisma.cart.findUnique({ where: { userId: userId } });
//   if (!cart){
//     return await prisma.cart.create({ data: { userId: userId }, include: {products: true} });
//   }
//   return cart;
// }

//! Restricted debug only stuff
//? Keep commented out at all costs. Otherwise immediate death may occur.
// export async function deleteUser(cuid: string){
//   try{
//     await prisma.user.delete({where: {id: cuid}})
//   }catch(e){
//     console.log(e.stack);
//   }
// }
