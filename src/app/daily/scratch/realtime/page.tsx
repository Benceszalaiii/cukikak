"use server";

import CountUp from "@/components/bits/counter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";

export default async function Scratches() {
  const scratches = await prisma.scratch.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      prize: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  const prizeSum = scratches.reduce((sum, current) => sum + current.prize, 0);
  console.log(prizeSum);
  return (
    <section className="w-full min-h-screen flex flex-col gap-12 py-[25vh] items-center justify-center">
      <div className="flex w-full items-center justify-center flex-col gap-4">
        <h1 className="text-neutral-400/85 font-semibold text-lg font-mono">
          Lekapart sorsjegyek száma:{" "}
        </h1>
        <CountUp
          delay={0}
          duration={1.4}
          separator=" "
          className="text-7xl font-semibold font-mono text-center"
          direction={"up"}
          to={scratches.length}
        />
      </div>
      <div className="flex w-full items-center justify-center flex-col gap-4">
        <h1 className="text-neutral-400/85 font-semibold text-lg font-mono">
          Kiosztott ɈÇ száma:{" "}
        </h1>
        <CountUp
          delay={0}
          duration={1.4}
          separator=" "
          className="text-7xl font-semibold font-mono text-center"
          direction={"up"}
          to={prizeSum}
        ></CountUp>
      </div>
      <div className="flex mt-12 flex-col gap-4 items-center justify-center">
        <h1 className="text-neutral-400/85 font-semibold text-lg font-mono">
          Legfrissebb sorsjegyek: {" "}
        </h1>
        {scratches.slice(0, 15).map((scratch, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between w-full gap-2"
          >
            <div className="flex flex-row gap-4 items-center ">
              <Avatar>
                <AvatarImage
                  src={scratch.user.image || "?"}
                  alt={scratch.user.name || "?"}
                />
                <AvatarFallback>
                  {scratch.user.name ? scratch.user.name[0] : "?"}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold font-mono text-neutral-300/85">
                {scratch.user.name ? scratch.user.name : "Nevtelen felhasznalo"}
              </span>
            </div>
            <div
              className={cn(
                "font-semibold",
                scratch.prize > 0 ? "text-green-500" : "text-neutral-400/85"
              )}
            >
              Nyeremény: {scratch.prize}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
