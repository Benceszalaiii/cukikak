"use server";
import QuestionsForm from "@/components/quiz/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getAllQuestions, getUserWithQuizSubmission } from "@/lib/db";
import { Metadata } from "next";
import Link from "next/link";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Kvízfeltöltés",
  };
}
const translateDifficulty = (difficulty: string) => {
    switch (difficulty) {
        case "EASY":
        return "Könnyű";
        case "NORMAL":
        return "Közepes";
        case "HARD":
        return "Nehéz";
        default:
        return "N/A";
    }
}

export default async function Page() {
  const session = await getUserWithQuizSubmission();
  const allQuestions = await getAllQuestions();
  return (
    <section className="w-full flex flex-col gap-4 items-start lg:px-32 pt-16">
        <Link href={"/"} className="font-geistmono text-4xl fixed top-4 md:top-8 left-6 md:left-12 text-red-600">11.Corleone</Link>
      <h2 className="font-semibold font-geistmono text-3xl mb-8">
        Kvízkérdések
      </h2>
      <Separator />
      <h3 className="font-geistmono text-xl">Feladványok</h3>
      <ScrollArea className="w-full flex flex-row gap-4 max-h-96 overflow-y-scroll">
        {allQuestions.map((question) => {
        return (
          <div className="grid w-full bg-neutral-950 border rounded-xl my-4 mx-0 grid-cols-1 lg:grid-cols-2" key={question.id + "all"}>
            <h4 className="p-4 lg:border-r text-center font-semibold col-span-2 lg:col-span-1">{question.questionTitle}</h4>
            <p className="p-4 text-center border-t lg:border-t-0"><span className="font-semibold">Nehézség:</span> {translateDifficulty(question.difficulty)}</p>
            <p className="border-t p-4 col-span-2 text-center"><span className="font-semibold">Helyes válaszok:</span> {question.answers.join(", ")}</p>
          </div>
        );
      })}
      </ScrollArea>
      <Separator />
      <h3 className="font-geistmono text-xl ">Saját feladványok</h3>
      <Separator />
      {session?.questions.map((question) => {
        return (
          <div className="grid w-full bg-neutral-950 border rounded-xl mt-2 mx-0 grid-cols-1 lg:grid-cols-2" key={question.id + "all"}>
            <h4 className="p-4 lg:border-r text-center font-semibold col-span-2 lg:col-span-1">{question.questionTitle}</h4>
            <p className="p-4 text-center border-t lg:border-t-0"><span className="font-semibold">Nehézség:</span> {translateDifficulty(question.difficulty)}</p>
            <p className="border-t p-4 col-span-2 text-center"><span className="font-semibold">Helyes válaszok:</span> {question.answers.join(", ")}</p>
          </div>
        );
      })}
      {session?.questions.length === 0 && (
        <p className="text-gray-400 text-sm ml-4">
          Még nem töltöttél fel egy feladványt sem.
        </p>
      )}
      <Separator />
      <h3 className="font-geistmono text-xl mt-8">Új feladvány</h3>
      <QuestionsForm />
    </section>
  );
}
