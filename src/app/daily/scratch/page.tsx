"use server";

import { ScratchToReveal } from "@/components/magicui/scratch-to-reveal";
import Link from "next/link";


export default async function ScratchPage() {
    const icons = ["😼", "😼", "😼"]

    return (
        <>
            <h1 className="w-full text-4xl text-center font-geistmono text-red-600 mt-4"><Link href={"/"}>Nyereményjáték</Link></h1>
            <section className="flex flex-col lg:flex-row gap-12 items-center justify-center py-24 w-full ">
                {icons.map((icon, index) => {
                    return (
                        <ScratchToReveal minScratchPercentage={75} key={icon+index} height={250} width={200} gradientColors={["#f00", "#a00", "#000"]} className="rounded-2xl flex items-center justify-center bg-red-500">
                        <p className="text-7xl">{icon}</p>
                    </ScratchToReveal>
                    )
                })
                }
            </section>
        </>
    )
}