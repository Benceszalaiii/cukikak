import Player from "next-video/player";
import Link from "next/link";
import playerTheme from "player.style/minimal/react"
export default function MoviePage() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <div className="fixed top-8 w-full flex justify-center">
      <Link href={"/"} className="text-red-600 transition-all duration-300 hover:motion-preset-seesaw-md font-caveat font-semibold text-3xl">11. Cukikák</Link>
      </div>
      <Player theme={playerTheme} autoPlay={false} key="video" src={"http://localhost:3000/interview.mp4"} />
    </section>
  );
}
