import { ShineBorder } from "@/components/magicui/shine-border";
import Image from "next/image";
import Link from "next/link";
export const metadata = {
  title: "Film",
};
export default function MoviePage() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <div className="fixed top-8 w-full flex justify-center">
        <Link
          href={"/"}
          className="text-red-600 font-netflix fill-mode-backwards  transition-all duration-300 hover:motion-preset-seesaw-md font-bold text-3xl"
        >
          <Image
            width={120}
            height={80}
            src="/netflix.png"
            alt="11. Corleone"
          ></Image>
        </Link>
      </div>
      <div className="w-full h-full flex relative overflow-hidden rounded-2xl items-center border mx-4 border-neutral-900 justify-center max-w-7xl">
        <ShineBorder borderWidth={2} shineColor={["#dc2626", "#991b1b", "#f43f5e"]} />
        <iframe
          className="w-full aspect-video max-w-7xl p-1 rounded-xl "
          frameBorder={0}
          src="https://www.youtube.com/embed/KHU2eeZn6pk?si=KU3B2s_7iuuLhNCT"
          allow="accelerometer; fullscreen; clipboard-write; encrypted-media; gyroscope;"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
