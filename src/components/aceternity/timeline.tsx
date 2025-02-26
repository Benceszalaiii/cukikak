"use client";
import { TimelinePropWithUserData } from "@/app/timeline/page";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { CreateEntry } from "../timeline";
import Entry from "../timeline/entry";
import { CheckCheckIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

export interface TimelineEntryProps {
  title: string;
  attendantsIds: string[];
  description: React.ReactNode;
}

export const Timeline = ({
  data,
  canAdd,
  userId,
}: {
  data: TimelinePropWithUserData[];
  userId: string | undefined;
  canAdd: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  
  const [filtered, SetFiltered] = useState(false);
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);
  const originalEntries: TimelineEntryProps[] = data.map((entry) => {
    return {
      title: entry.date.toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }),
      attendantsIds: entry.attendants.map((attendant) => attendant.id),
      description: <Entry data={entry}></Entry>,
    };
  });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });
  const heightTransform =  useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const [entries, SetEntries] = useState(originalEntries);

  useEffect(()=> {
    if (filtered) {
      SetEntries(originalEntries.filter((entry) => entry.attendantsIds.some((attendant) => attendant === userId)));
    } else {
      SetEntries(originalEntries);
    }
    // Kedves eslint, en jobban ertem mint te, ugyhogy ne szolj bele a munkamba te kis szemet geci fasz buzi  //?(Ez az egesz sor copilot altal generalt)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered])
  return (
    <div
      className="w-full overflow-y-hidden bg-white h-fit font-geistmono dark:bg-neutral-950 md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          Események
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          Itt találod azokat az eseményeket, amelyek a kampány során történnek
          és az előkészületek dátumát.
        </p>
      </div>
        {userId && (
          <button onClick={()=> {
            SetFiltered(!filtered);
          }} className="underline w-full h-4 text-end items-center pr-24 justify-end text-sm text-red-700 flex flex-row gap-2 hover:text-red-500 underline-offset-2 hover:underline-offset-4 transition-all duration-300 font-semibold ">
            {filtered && <CheckCheckIcon className="transition-all duration-300 motion-preset-blur-left-md" />} Csak azokat az eseményeket mutassa, ahol résztvevő vagyok 
          </button>
        )}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {canAdd && <CreateEntry />}
        {entries.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 xl:pt-40 xl:gap-10"
          >
            <div className="sticky flex flex-col xl:flex-row z-40 items-center top-40 self-start max-w-xs xl:max-w-sm xl:w-full">
              <div className="h-10 absolute left-3 xl:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden xl:block text-xl xl:pl-20 xl:text-4xl font-bold text-neutral-400 dark:text-neutral-300 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 xl:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-300">
                {item.title}
              </h3>
              {item.description}
            </div>
          </div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className={twMerge("absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-transparent  to-transparent from-[0%] via-[20%] rounded-full", filtered ? "via-emerald-600" : "via-red-600")}
          />
        </div>
      </div>
    </div>
  );
};
