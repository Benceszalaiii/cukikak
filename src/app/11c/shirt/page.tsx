"use server";
import { ShinyButton } from "@/components/timeline/submit-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { getUserWithQuizSubmission } from "@/lib/db";
import Link from "next/link";
import { handleSubmit } from "./actions";

export default async function Page() {
  const session = await getUserWithQuizSubmission();
  return (
    <section className="w-full flex flex-col gap-4 items-start lg:px-32 pt-16">
      <Link
        href={"/"}
        className="font-geistmono text-4xl fixed top-4 md:top-8 left-6 md:left-12 text-red-600"
      >
        11.Corleone
      </Link>
      <h2 className="font-semibold font-geistmono text-3xl mb-8">Pólóméret</h2>{" "}
      <Separator />
      {session?.shirtSize ? (
        <h3 className=" w-full tracking-wider text-lg">
          Az adatbázisban szereplő méreted: <span className="font-bold text-xl mx-4">{session.shirtSize}</span>
        </h3>
      ) : (
        <h3 className=" w-full tracking-wider text-lg ">Még nem töltötted ki a méreted.</h3>
      )}
      <Separator />
      <h3 className="font-geistmono text-xl mt-8">
        Pólóméret {session?.shirtSize ? "szerkesztése" : "megadása"}
      </h3>
      <form action={handleSubmit} className="flex flex-col gap-4 justify-center items-center w-full">
        <Select required name="shirtSize">
          <SelectTrigger className="w-full max-w-lg">
            <SelectValue placeholder="Válassz pólóméretet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="XXL">XXL</SelectItem>
            <SelectItem value="XL">XL</SelectItem>
            <SelectItem value="L">L</SelectItem>
            <SelectItem value="M">M</SelectItem>
            <SelectItem value="S">S</SelectItem>
            <SelectItem value="XS">XS</SelectItem>

          </SelectContent>
        </Select>
        <ShinyButton submitted={false} type="submit" className="mt-4">
          Küldés
        </ShinyButton>
      </form>
    </section>
  );
}
