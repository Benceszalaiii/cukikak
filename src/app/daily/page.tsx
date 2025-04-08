"use client";
import React from "react";

import { CanvasRevealEffect } from "@/components/aceternity/canvas-reveal-effect";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { IconClick, IconCoin, IconHelpHexagon } from "@tabler/icons-react";

export default function CanvasRevealEffectDemo() {
  return (
    <>
      <div className="py-32 lg:py-64 flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-black w-full gap-4 mx-auto px-8">
        <Card
          href="/daily/pick"
          title="Választás"
          icon={<IconClick />}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-green-900"
            colors={[
              [25, 255, 25],
              [0, 200, 0],
              [100, 255, 100],
            ]}
            showGradient={false}
            dotSize={2}
          />
          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
        </Card>
        <Card href="/daily/scratch" title="Sorsjegy" icon={<IconCoin />}>
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-red-800"
            showGradient={false}
            colors={[
              [255, 25, 25],
              [200, 0, 0],
              [255, 100, 100],
            ]}
            dotSize={2}
          />
          {/* Radial gradient for the cute fade */}
          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
        </Card>
        <Card
          href="/daily/questions"
          title="Kvíz"
          icon={<IconHelpHexagon />}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            showGradient={false}
            containerClassName="bg-sky-600"
            colors={[[125, 211, 252]]}
            dotSize={2}
          />
          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
        </Card>
      </div>
    </>
  );
}

const Card = ({
  title,
  icon,
  children,
  href = "/daily",
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  href: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[15rem] lg:h-[30rem] relative"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
      </div>
    </Link>
  );
};
