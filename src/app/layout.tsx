import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cx } from "class-variance-authority";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import {
  caveat,
  geistMono,
  geistSans,
  inter,
  musicFont,
  netflix,
  sfpro,
} from "./fonts";
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
        musicFont.variable,
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
          <Analytics />
          <SpeedInsights />
          <main className="min-h-screen w-full bg-black selection:bg-red-600 selection:text-black">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
