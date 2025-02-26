import Threads from "@/components/bits/threads";
import Nav from "@/components/layout/nav";
// import Ripple from "../components/magicui/ripple";
// import Orb from "@/components/bits/orb";
// import Balatro from "@/components/bits/balatro";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex w-full h-full items-center justify-center flex-col">
        <section className="flex absolute top-0 flex-col h-screen max-h-screen w-full items-center justify-center">
          <Threads
            color={[0.95, 0, 0]}
            amplitude={2}
            enableMouseInteraction={true}
          />
          <p className=" px-4 leading-20 transition-all duration-700 ease-in-out text-wrap font-sfpro text-center h-full w-full text-3xl md:text-4xl xl:text-5xl text-white">
            <span className="font-semibold bg-red-700 tracking-widest text-black font-geistmono text-4xl md:text-5xl xl:text-6xl transition-all duration-700 ease-in-out">
              11.Corleone
            </span>{" "}
            <br />
            <span className="text-center text-sm font-light font-geistmono">
              Az oldal jelenleg fejlesztés alatt áll.
            </span>
          </p>
        </section>
      </main>
    </>
  );
}
