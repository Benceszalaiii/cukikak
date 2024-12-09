import Ripple from "../components/magicui/ripple";

export default function Home() {
  return (
    <main className="flex w-full h-full items-center justify-center flex-col">
      <section className="flex flex-col h-screen max-h-screen w-full items-center justify-center">
        <div className="relative -z-10 overflow-hidden flex w-full h-full flex-col items-center justify-center rounded-lg">
          <p className=" px-4 leading-10 transition-all duration-700 ease-in-out text-wrap font-sfpro text-center text-3xl md:text-4xl xl:text-5xl text-white">
            Köszöntelek a{" "}
            <span className="font-semibold text-4xl md:text-5xl xl:text-6xl transition-all duration-700 ease-in-out">
              11.C
            </span>{" "}
            kampányoldalán!
          </p>
          <p className=" mt-4 text-sm">Az oldal készítés alatt áll</p>
          <Ripple className="scale-[0.65] -z-20 sm:scale-75 md:scale-90 lg:scale-100 xl:scale-105 transition-all duration-700 ease-in-out" />
        </div>
      </section>
    </main>
  );
}
