"use client";

import { Product } from "@prisma/client";
import Image from "next/image";

export default function ProductCard({ data }: { data: Product }) {
  return (
    <div className="relative px-6 py-4 shadow-md shadow-neutral-800/23">
      <div className="relative aspect-[11/12] h-72">
        <Image
          src={data.imageUrl}
          alt={data.name}
          fill
          className="object-center object-cover p-0.5"
        />
      </div>
      <div className="flex flex-col items-center justify-center font-mono tracking-wider">
        <h3 className=" text-xl">{data.name}</h3>
        <p className="my-4 text-xl font-bold" title="Jedlik Coin">
          {data.cost},00 ɈÇ
        </p>
        <p className="text-sm text-neutral-300/85">
          Elérhető: {data.availableCount}/{data.allCount}
        </p>
      </div>
    </div>
  );
}
