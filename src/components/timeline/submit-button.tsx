"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps, type AnimationProps } from "motion/react";
import React from "react";
import { LoadingState, MultiStepLoader } from "../aceternity/multi-step";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps;

interface ShinyButtonProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  children: React.ReactNode;
  className?: string;
  submitted: boolean;
  type: "button" | "submit" | "reset" | undefined;
}

const messages: LoadingState[] = [
  { text: "Esemény meghirdetése" },
  { text: "Forgatókönyv írása" },
  { text: "Résztvevők meghívása" },
  { text: "Civic bedurrantása" },
  { text: "Kampányfilm készítése" },
  { text: "TCS elfogyasztása" },
  { text: "Zotter elütése" },
];

export const ShinyButton = React.forwardRef<
  HTMLButtonElement,
  ShinyButtonProps
>(({ children, className, submitted, type, ...props }, ref) => {
  return (
    <>
      <MultiStepLoader loop={false} duration={1500} loadingStates={messages} loading={submitted} />
      <motion.button
        disabled={submitted}
        ref={ref}
        type={type}
        className={cn(
          "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/10%)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_hsl(var(--primary)/10%)]",
          className
        )}
        {...animationProps}
        {...props}
      >
        <span
          className="relative block size-full w-32 text-sm tracking-wide text-[rgb(0,0,0,65%)] dark:font-light dark:text-[rgb(255,255,255,90%)]"
          style={{
            maskImage:
              "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
          }}
        >
          {!submitted && children}
          {submitted && <LoadSpinner />}
        </span>
        <span
          style={{
            mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            maskComposite: "exclude",
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
        ></span>
      </motion.button>
    </>
  );
});

ShinyButton.displayName = "ShinyButton";

const LoadSpinner = () => {
  return (
    <div className="w-6 h-6 border-2 border-t-[transparent] border-[hsl(var(--primary)/50%)] rounded-full animate-spin"></div>
  );
};
