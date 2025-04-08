"use client";

import { getImages } from "@/app/gallery/actions";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ParallaxScroll from "../aceternity/parallax-scroll";

export interface MasonryItem {
  avatarSrc: string;
  username: string;
  id: string;
  height: number;
  image: string;
  isExplicit: boolean;
}
export default function Parallax({ canEdit }: { canEdit: boolean }) {
  async function getData() {
    getImages(imageAmount, canEdit).then((res) => {
      setImages(
        res.data.map((item) => {
          return {
            avatarSrc: item.postedBy.image || "?",
            username: item.postedBy.name || "?",
            id: item.id,
            height: 500,
            image: item.publicLink,
            isExplicit: item.explicit,
          };
        })
      );
      setAmt(res.amount);
    });
  }
  const [amt, setAmt] = useState(0);
  const [imageAmount, setImageAmount] = useState(25);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<MasonryItem[]>([]);
  useEffect(() => {
    getData().then(() => {
      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageAmount, canEdit]);
  if (loading) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
        <h2 className="text-zinc-900 dark:text-white mt-4">
          Galéria betöltése...
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Kérlek várj, amíg a galéria betöltődik. Ez eltarthat egy ideig, mivel
          sok kép van.
        </p>
      </div>
    );
  }
  return (
    <div className="my-8">
      <ParallaxScroll reloadPage={getData} canEdit={canEdit} data={images} />
      {amt > imageAmount && (
        <Button
          className="self-center"
          variant={"outline"}
          onClick={() => {
            setImageAmount(imageAmount + 25);
          }}
        >
          További képek betöltése
        </Button>
      )}
    </div>
  );
}
