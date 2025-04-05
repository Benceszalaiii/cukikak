"use server";
import { FileUpload } from "@/components/aceternity/file-upload";
import Parallax from "@/components/gallery/parallax";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getUser } from "@/lib/db";
import { cn } from "@/lib/utils";
import { ImageUp } from "lucide-react";

export default async function Page() {
  const user = await getUser();
  return (
    <main className="px-4 flex flex-col justify-center self-center w-full ">
      <div className="my-16 p-4">
        <h2 className="text-3xl font-semibold ">
          Töltsd fel a legjobb fotóidat, mémjeidet, rajzaidat vagy emlékeidet –
          ez a galéria mindenkié!
        </h2>
        <p className="mt-2 text-sm pl-4">
          Legyen vicces, menő vagy épp csak random - itt az egész suli együtt
          oszthatja meg, amit szeretne
        </p>
      </div>
      {user && (
        <Collapsible className="flex flex-col items-center justify-center mb-32 w-full">
          <CollapsibleTrigger className="flex flex-row gap-2 items-center font-semibold">
            <ImageUp /> Kép feltöltése
          </CollapsibleTrigger>
          <CollapsibleContent
            asChild
            className={cn(
              "text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
            )}
          >
            <FileUpload></FileUpload>
          </CollapsibleContent>
        </Collapsible>
      )}

      <Parallax canEdit={user?.admin || user?.role === "STAFF"} />
    </main>
  );
}
