import Nav from "@/components/layout/nav";
import Link from "next/link";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex fixed items-start w-full z-[99] top-4 left-4 text-red-600 justify-start">
        <Link
          href={"/"}
          className="duration-500 ease-in-out font-geistmono motion-loop-once text-3xl font-semibold transition-all hover:motion-preset-stretch-md"
        >
          11.Corleone
        </Link>
      </div>
      <Nav />
      {children}
    </>
  );
}
