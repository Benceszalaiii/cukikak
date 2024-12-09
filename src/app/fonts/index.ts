import localFont from "next/font/local";

export const geistMono = localFont({
  src: "./GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const geistSans = localFont({
  src: "./GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const caveat = localFont({
  src: "./Caveat.ttf",
  variable: "--font-caveat",
});

export const inter = localFont({
  src: "./Inter.ttf",
  variable: "--font-inter",
});

export const sfpro = localFont({
  src: "./SF-Pro-Display-Medium.otf",
  variable: "--font-sfpro",
});
