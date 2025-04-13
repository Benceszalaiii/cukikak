"use server";
import ScratchCard from "@/components/daily/scratch";
import { getScratch } from "./actions";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sorsjegy",
    description: "Kaparj 4 óránként egy sorsjegyet, és nyerj 15.000ɈÇ-t!",
  }
}
export default async function ScratchPage() {
  const data = await getScratch();
  if (!data) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 font-mono text-xl text-red-600 font-semibold">
        <div>
        Valami nem működik a tervezettek alapján... <br /> Frissíts rá az
        oldalra, és ha egy percen belül nem működik, vedd fel velünk a
        kapcsolatot{" "}
        <a href="mailto:11c@jedlik.eu" className="underline">
          11c@jedlik.eu
        </a>
        </div>
      </div>
    );
  }
  return (
    <>
      <ScratchCard data={data} />
    </>
  );
}
