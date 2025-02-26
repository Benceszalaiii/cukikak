"use server";

import { getUser } from "@/lib/db";
import prisma from "@/lib/prisma";
import { QuestionDifficulty } from "@prisma/client";


interface Question{
    questionTitle: string;
    answers: string[];
    difficulty: QuestionDifficulty;
}
export async function submitQuestion(data: Question){
    const session = await getUser();
    if (!session){
        return null;
    }
    const res = await prisma.questions.create({data: {difficulty: data.difficulty, questionTitle: data.questionTitle, answers: data.answers, userId: session.id}})
    return res;
}