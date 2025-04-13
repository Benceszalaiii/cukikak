"use server";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUser } from "@/lib/db";
import { Metadata } from "next";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { getMovieLink, setMovieLink } from "./actions";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "A Titkos Csomag",
  };
}
export default async function MoviePage() {
  const user = await getUser();
  const movieLink = await getMovieLink();
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="fixed top-8 w-full flex justify-center">
        <Link
          href={"/"}
          className="text-red-600 font-netflix fill-mode-backwards transition-all duration-300 hover:motion-preset-seesaw-md font-bold text-3xl"
        >
          <Image
            width={120}
            height={80}
            src="/netflix.png"
            alt="11. Corleone"
          ></Image>
        </Link>
      </div>

      {user?.admin && (
        <Form action={setMovieLink} className="w-full max-w-4xl px-4">
          <Label htmlFor="url">Url</Label>
          <Input id="url" name="url" defaultValue={movieLink}></Input>
          <p className="italic text-neutral-300/85 font-semibold font-mono inset-4">
            Fontos! youtube.com/embed link legyen, különben nem csinál semmit!
            Share-{">"}Beágyazás után kapott kódrészletből tudod kiszedni, tudom
            szar de csak igy nem blokkolja a bongeszo
          </p>
          <Button variant={"outline"}>Mentés</Button>
        </Form>
      )}
      <div className="w-full h-full flex relative overflow-hidden rounded-2xl items-center border mx-4 border-neutral-900 justify-center max-w-7xl">
        <ShineBorder
          borderWidth={2}
          shineColor={["#dc2626", "#991b1b", "#f43f5e"]}
        />
        <iframe
          className="w-full aspect-video max-w-7xl p-1 rounded-xl "
          frameBorder={0}
          src={movieLink}
          allow="accelerometer; fullscreen; clipboard-write; encrypted-media; gyroscope;"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
