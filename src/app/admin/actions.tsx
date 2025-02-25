"use server";

import { getUser } from "@/lib/db";
import prisma from "@/lib/prisma";
import { UserRoles } from "@prisma/client";

export async function setRole(id: string, role: UserRoles){
    const session = await getUser();
    if (session?.role == "STAFF"){
        if (session.id == id){
            throw new Error("A saját szerepköröd nem változtathatod meg!");
        }
        await prisma.user.update({where: {id: id}, data: {role: role}})
    }
    else{
        throw new Error("Nem vagy jogosult a művelethez!");
    }
}