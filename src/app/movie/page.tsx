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
      <div className="w-full h-full flex items-center justify-center max-w-7xl">
      <Player
        className="aspect-[2581/1080] flex flex-row w-full h-full items-center justify-center object-center"
        theme={playerTheme}
        autoPlay={false}
        key="video"
        src={"/trailer.mp4"}
        />
        </div>
    </section>
  );
}
