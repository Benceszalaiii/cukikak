import { Toaster } from "@/components/ui/sonner";
import { cx } from "class-variance-authority";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { caveat, geistMono, geistSans, inter, netflix, sfpro } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | 11.Corleone",
    default: "11.Corleone",
  },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "https://11c.jedlik.eu",
  },
  authors: {
    name: "Szalai Bence",
    url: "https://www.benceszalai.me",
  },
  keywords: [
    "11.Corleone",
    "Jedlik",
    "Kampány",
    "Keresztapa",
    "11.C",
    "Győr",
    "Corleone",
    "Kampányfilm",
    "Cukikák",
    "Győri SZC",
  ],
  twitter: {
    images: ["https://11c.jedlik.eu/opengraph-image.png"],
  },
  category: "education",
  publisher: "Szalai Bence",
  description:
    "11.Corleone - Itt mindenki hülye? Itt? Mindenki. \n Győri SZC Jedlik Ányos Gépipari és Informatikai Technikum 11.C osztályának weboldala.",
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
      <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body>
        <ThemeProvider attribute={"class"} forcedTheme="dark">
          <Toaster />
          <main className="min-h-screen w-full bg-black selection:bg-red-600 selection:text-black">
            {children}
          </main>
          <footer className="bg-black px-4 text-center flex flex-col items-center justify-center font-geistmono tracking-wider gap-2 py-4 border-t">
            <p>
              Az oldalt készítette{" "}
              <Link
                draggable={false}
                className="underline cursor-pointer underline-offset-2 font-semibold font-caveat tracking-widest"
                href={"https://www.benceszalai.me"}
              >
                Szalai Bence
              </Link>
            </p>
            <p className="text-sm text-gray-100">
              Tech stack: <span>Next.js, React, Prisma, TailwindCSS</span>
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
