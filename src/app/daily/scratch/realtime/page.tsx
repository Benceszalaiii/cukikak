"use server";

import Counter from "@/components/daily/counter";
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
  return (
    <section className="w-full min-h-screen flex flex-col gap-24 py-[50vh] items-center justify-center">
      <Counter gradientFrom="transparent" value={scratches.length} />
      <div className="flex flex-col gap-4 items-center justify-center">
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
