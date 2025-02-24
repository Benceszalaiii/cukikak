/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
export interface AvatarProps {
  name: string;
  image: string | null;
}
interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: AvatarProps[];
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (

      <div
        className={cn("z-10  cursor-pointer flex -space-x-4 rtl:space-x-reverse", className)}
      >
        {avatarUrls.map((avatar, index) => (
          <Tooltip  key={index}>
            <TooltipTrigger asChild>
              <Avatar key={index}>
                <AvatarImage
                  key={index}
                  className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
                  src={avatar.image || undefined}
                  width={40}
                  height={40}
                  alt={`${avatar.name}`}
                />
                <AvatarFallback>{avatar.name[0]}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent key={index + avatar.name}>{avatar.name}</TooltipContent>
          </Tooltip>
        ))}
        {(numPeople ?? 0) > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="flex h-10 w-10 items-center cursor-pointer justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black">
                +{numPeople}
              </p>
            </TooltipTrigger>
            <TooltipContent>További résztvevők</TooltipContent>
          </Tooltip>
        )}
      </div>
  );
};
