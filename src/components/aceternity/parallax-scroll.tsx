
import { a, useTransition } from "@react-spring/web";
import { useEffect, useMemo, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { toast } from "sonner";
import { deleteImage } from "@/app/gallery/actions";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
interface MasonryItem {
  avatarSrc: string;
  username: string;
  id: string;
  height: number;
  image: string;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface MasonryProps {
  data: MasonryItem[];
  canEdit: boolean
}

 function Masonry({ data, canEdit }: MasonryProps) {
  const [columns, setColumns] = useState<number>(2);

  useEffect(() => {
    const updateColumns = () => {
      if (window.matchMedia("(min-width: 1500px)").matches) {
        setColumns(5);
      } else if (window.matchMedia("(min-width: 1000px)").matches) {
        setColumns(4);
      } else if (window.matchMedia("(min-width: 600px)").matches) {
        setColumns(3);
      } else {
        setColumns(1); // Mobile devices
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [heights, gridItems] = useMemo<[number[], GridItem[]]>(() => {
    const heights = new Array(columns).fill(0);
    const gridItems = data.map((child) => {
      const column = heights.indexOf(Math.min(...heights));
      const x = (width / columns) * column;
      const y = (heights[column] += child.height / 2) - child.height / 2;
      return {
        ...child,
        x,
        y,
        width: width / columns,
        height: child.height / 2,
      };
    });
    return [heights, gridItems];
  }, [columns, data, width]);

  const transitions = useTransition<
    GridItem,
    { x: number; y: number; width: number; height: number; opacity: number }
  >(gridItems, {
    keys: (item) => item.id,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  return (
    <div
      ref={ref}
      className="relative w-full h-full"
      style={{ height: Math.max(...heights) }}
    >
      {transitions((style, item) => (
        <a.div
          key={item.id}
          style={style}
          className="absolute p-[15px] group [will-change:transform,width,height,opacity]"
        >
          <Dialog>
          <DialogTrigger asChild>

          <div
            className="relative w-full h-full overflow-hidden hover:border flex items-end uppercase text-[10px] leading-[10px] rounded-[4px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] transition duration-300 ease hover:scale-110"
            style={{
              backgroundColor: "#ffffff",
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            >
            { canEdit && 
            <X className="absolute top-2 right-2 cursor-pointer stroke-red-600" onClick={(event)=> {
              event.currentTarget.classList.add("pointer-events-none", "cursor-not-allowed", "opacity-50")
              
              toast.promise(async ()=> {deleteImage(item.id)}, {
                loading: "Törlés...",
                success: "Kép törölve!",
                error: (e) => {
                  event.currentTarget.classList.remove("pointer-events-none", "cursor-not-allowed", "opacity-50")
                  return `Hiba történt: ${e}`
                }
              })
            }} />
          }
          <div className={cn("bg-gradient-to-t opacity-0 group-hover:opacity-100 ease flex flex-row items-center justify-start pt-4 gap-2 from-neutral-950/90 via-neutral-900/60 via-50% to-transparent p-2 w-full transition-all duration-300 ")}>
          <Avatar className="size-8">
            <AvatarImage src={item.avatarSrc}></AvatarImage>
            <AvatarFallback>{item.username[0]}</AvatarFallback>
          </Avatar>
          <p>
          {item.username}
          </p>
          </div>
          </div>
          </DialogTrigger>
          <DialogContent className="flex w-fit h-fit p-0">
            <VisuallyHidden>
            <DialogTitle>{item.username}</DialogTitle>
            </VisuallyHidden>
            <Image width={item.width} height={item.height} src={item.image} alt={item.username}></Image>
          </DialogContent>
          </Dialog>
        </a.div>
      ))}
    </div>
  );
}

export default Masonry;
