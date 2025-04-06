import Nav from "@/components/layout/nav";
import { Particles } from "@/components/magicui/particles";
import { TextHoverEffect } from "../components/aceternity/hover";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex w-full h-full relative items-center justify-center flex-col">
        <section className="flex absolute top-0 flex-col h-screen max-h-screen w-full items-center justify-center">
          <Particles
            className="absolute inset-0 z-0"
            quantity={100}
            ease={80}
            refresh
          />
          <div className="h-[40rem] flex items-center justify-center">
            <TextHoverEffect text="11.Corleone" />
          </div>
        </section>
      </main>
    </>
  );
}
