import Player from "next-video/player";
import Image from "next/image";
import Link from "next/link";
import playerTheme from "player.style/notflix/react";
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
      <Player
        className=""
        theme={playerTheme}
        autoPlay={false}
        key="video"
        src={"http://www.cukikak.store/interview.mp4"}
      />
    </section>
  );
}
