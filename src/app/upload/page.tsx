"use server";
import QuestionsForm from "@/components/quiz/form";
import { Separator } from "@/components/ui/separator";
import { getUserWithQuizSubmission } from "@/lib/db";
import Link from "next/link";

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
  return (
    <section className="w-full flex flex-col gap-4 items-start lg:px-32 pt-16">
        <Link href={"/"} className="font-geistmono text-4xl fixed top-4 md:top-8 left-6 md:left-12 text-red-600">11.Corleone</Link>
      <h2 className="font-semibold font-geistmono text-3xl mb-8">
        Kvízkérdések
      </h2>
      <h3 className="font-geistmono text-xl ">Eddigi feladványaid</h3>
      <Separator />
      {session?.questions.map((question) => {
        return (
          <div className="grid w-full mx-0 grid-cols-1 md:grid-cols-2" key={question.id}>
            <h4 className="border p-4 text-center font-semibold">{question.questionTitle}</h4>
            <p className="border p-4 text-center"><span className="font-semibold">Nehézség:</span> {translateDifficulty(question.difficulty)}</p>
            <p className="border p-4 col-span-2 text-center"><span className="font-semibold">Helyes válaszok:</span> {question.answers.join(", ")}</p>
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
