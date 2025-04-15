"use client";
import { Scratch } from "@prisma/client";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { toast } from "sonner";
import { NavbarButton } from "../aceternity/nav";
import { ScratchToReveal } from "../magicui/scratch-to-reveal";
import Counter from "./counter";
export default function ScratchCard({ data }: { data: Scratch }) {
  const icons = data.result;
  const [scratchCount, setScratchCount] = useState(data.scratched?.length || 0);
  const handleScratchComplete = () => {
    setScratchCount(scratchCount + 1);
  };
  useEffect(() => {
    if (scratchCount >= 3) {
      if (data.prize > 0) {
        toast.success(`Gratulálunk! Nyertél ${data.prize} Jedlik Coint!`);
      } else {
        toast.error(`Sajnos nem nyertél semmit. Térj vissza később!`);
      }
    }
  }, [scratchCount, data.prize, data.createdAt]);
  return (
    <>
      <section className="flex flex-col min-h-[75vh] lg:flex-row gap-12 items-center justify-center pt-24 w-full ">
        {icons.map((icon, index) => {
          return (
            <ScratchToReveal
              minScratchPercentage={69}
              key={index}
              height={250}
              width={200}
              onComplete={handleScratchComplete}
              scratchId={data.id || "11"}
              idx={index}
              complete={data.scratched?.includes(index) || false}
              gradientColors={["#f00", "#a00", "#000"]}
              className="rounded-2xl flex items-center justify-center bg-red-500"
            >
              <p className="text-7xl">{icon}</p>
            </ScratchToReveal>
          );
        })}
      </section>
      <div
        suppressHydrationWarning
        className="w-full flex flex-row items-start justify-center h-32"
      >
        <Countdown
          date={data.createdAt.getTime() + 4 * 60 * 60 * 1000}
          renderer={({ hours, minutes, seconds, completed }) => {
            if (completed) {
              return (
                <div className="text-2xl text-neutral-400/85 font-semibold">
                  A sorsjegyed készen áll! Frissítsd az oldalt, hogy újra
                  játszhass!
                </div>
              );
            } else {
              return (
                <div className="w-full h-32 my-12 items-center flex justify-center gap-4 flex-col">
                  <span className="text-2xl md:text-4xl text-neutral-400/85 justify-self-start">
                    Következő sorsjegyig:{" "}
                  </span>
                  <div
                    suppressHydrationWarning
                    className="flex flex-row items-center justify-center font-mono font-semibold"
                  >
                    <Counter
                      gradientFrom="transparent"
                      fontSize={70}
                      value={hours}
                      places={[10, 1]}
                    />
                    <span className="text-2xl md:text-4xl">:</span>
                    <Counter
                      gradientFrom="transparent"
                      fontSize={70}
                      value={minutes}
                      places={[10, 1]}
                    />
                    <span className="text-2xl md:text-4xl">:</span>
                    <Counter
                      gradientFrom="transparent"
                      fontSize={70}
                      value={seconds}
                      places={[10, 1]}
                    />
                  </div>
                </div>
              );
            }
          }}
        />
      </div>
      <div className="flex pb-16 mt-24 text-center text-neutral-400/85 font-semibold flex-col items-center w-full justify-center flex-wrap gap-2">
        <NavbarButton href={"/daily/scratch/realtime"} variant="gradient">
          Nyertesek megtekintése
        </NavbarButton>
        <div className="">Kliens mag (Client seed): {data.clientSeed}</div>
        <div className="">Hash: {data.seed}</div>
        <div>Provably fair ☑️</div>
      </div>
    </>
  );
}
