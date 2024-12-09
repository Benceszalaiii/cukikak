import Nav from "@/components/layout/nav";
import { cx } from "class-variance-authority";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { caveat, geistMono, geistSans, inter, sfpro } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | 11 Cirkusz",
    default: "11 Cirkusz",
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
        "scroll-smooth subpixel-antialiased"
      )}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎪</text></svg>"
        />
      </head>
      <body>
        <ThemeProvider attribute={"class"} forcedTheme="light">
          <main className="min-h-screen w-full">
            <Nav />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
