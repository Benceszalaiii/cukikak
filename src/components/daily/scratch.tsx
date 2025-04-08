"use client";
import { Scratch } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ScratchToReveal } from "../magicui/scratch-to-reveal";

export default function ScratchCard({
  data,
}: {
  data: Scratch;
}) {
    const icons = data.result;
  const [scratchCount, setScratchCount] = useState(data.scratched?.length || 0);
  const handleScratchComplete = () => {
    setScratchCount(scratchCount + 1);
  };
  useEffect(() => {
    if (scratchCount >= 3) {
      if (data.prize > 0){

        toast.success(`Gratulálunk! Nyertél ${data.prize} Jedlik Coint!`);
      }else{
        toast.error("Sajnos nem nyertél semmit. Térj vissza holnap!");
      }
    }
  }, [scratchCount, data.prize]);
  return (
    <>
      <section className="flex flex-col min-h-[90vh] lg:flex-row gap-12 items-center justify-center py-24 w-full ">
        {icons.map((icon, index) => {
          return (
            <ScratchToReveal
              minScratchPercentage={69}
              key={icon + index}
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
      <div className="flex pb-16 text-neutral-400/85 font-semibold flex-col items-center w-full justify-center flex-wrap gap-2">
        <div className="">Kliens mag (Client seed): {data.clientSeed}</div>
        <div className="">Hash: {data.seed}</div>
        <div>Provably fair ☑️</div>
      </div>
    </>
  );
}
