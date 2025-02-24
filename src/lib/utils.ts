import { UserRoles } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "E" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function translateRole(str: UserRoles) {
  switch (str) {
    case "USER":
      return "Nyilvános";

    case "CLASSMATE":
      return "Osztály";

    case "STAFF":
      return "Rendezők";

    case "TEACHER":
      return "Tanárok";
  }
}


export function getLevel(accessLevel: string){
  const processedLevel: UserRoles[] = [];
  switch (accessLevel) {
    case "USER":
      processedLevel.push("USER");
      break;
    case "CLASSMATE":
      processedLevel.push("USER");
      processedLevel.push("CLASSMATE");
      break;
    case "STAFF":
      processedLevel.push("USER");
      processedLevel.push("CLASSMATE");
      processedLevel.push("TEACHER");
      processedLevel.push("STAFF");
      break;
    case "TEACHER":
      processedLevel.push("USER");
      processedLevel.push("CLASSMATE");
      processedLevel.push("TEACHER");
      break;
  }
  return processedLevel;
}