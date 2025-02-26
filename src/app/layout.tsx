
import { cx } from "class-variance-authority";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { caveat, geistMono, geistSans, inter, netflix, sfpro } from "./fonts";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s | 11 Corleone",
    default: "11 Corleone",
  },
  description: "A 11C osztály kampányoldala",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cx(
        sfpro.variable,
        inter.variable,
        caveat.variable,
        geistMono.variable,
        geistSans.variable,
        netflix.variable,
        "scroll-smooth subpixel-antialiased"
      )}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💰</text></svg>"
        />
      </head>
      <body>
        <ThemeProvider attribute={"class"} forcedTheme="dark">
          <Toaster />
          <main className="min-h-screen w-full bg-black selection:bg-red-600 selection:text-black">
            {children}
          </main>
          <footer className="bg-black px-4 text-center flex flex-col items-center justify-center font-geistmono tracking-wider gap-2 py-4 border-t"><p>Az oldalt készítette <Link draggable={false} className="underline cursor-pointer underline-offset-2 font-semibold font-caveat tracking-widest" href={"https://www.benceszalai.me"}>Szalai Bence</Link></p><p className="text-sm text-gray-100">Tech stack: <span>Next.js, React, Prisma, TailwindCSS</span></p></footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
