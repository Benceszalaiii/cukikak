"use server";

import { getShirtSizes } from "@/app/11c/shirt/actions";
import { getClassUsers, getUser } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export default async function ShirtSizeStatistics() {
  const session = await getUser();
  if (session?.admin) {
    const shirtSizes = await getShirtSizes();
    const classUsers = await getClassUsers("11.C");
    return (
      <>
        <Separator />
        <h3 className="text-3xl font-geistmono font-semibold">Statisztika</h3>
        <section className="flex flex-row gap-4 justify-center items-center w-full">
          {Object.entries(shirtSizes).map(([size, count]) => (
            <>
              {count > 0 && (
                <Dialog key={size}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-36"
                      variant={"outline"}
                      type="button"
                      key={size}
                    >
                      {size}: {count}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>
                      {size} méretű pólók: {count} db
                    </DialogTitle>
                    <ScrollArea className="flex max-h-72 flex-col gap-4">
                      {classUsers
                        ?.filter((user) => user.shirtSize === size)
                        .map((user) => (
                          <div
                            className="flex flex-row gap-4 my-4 items-center"
                            key={user.id}
                          >
                            <Avatar className="text-red-600">
                              <AvatarImage
                                alt={`Avatar of ${
                                  user.name || "Ismeretlen felhasználó"
                                }`}
                                src={user.image || ""}
                              ></AvatarImage>
                              <AvatarFallback>
                                {user.name?.charAt(0) || "?"}
                              </AvatarFallback>
                            </Avatar>
                            <p>{user.name}</p>
                          </div>
                        ))}
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              )}
            </>
          ))}
        </section>
      </>
    );
  }
  return <></>;
}
