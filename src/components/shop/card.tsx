"use server";

import { changeProductPricing, deleteProduct } from "@/app/shop/actions";
import { Input } from "@/components/ui/input";
import { getUser } from "@/lib/db";
import { Product } from "@prisma/client";
import { Edit3Icon } from "lucide-react";
import { revalidatePath } from "next/cache";
import Form from "next/form";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";

export default async function ProductCard({ data }: { data: Product }) {
  const session = await getUser();
  async function changePrice(formData: FormData) {
    "use server";
    const price = parseInt(formData.get("newPrice") as string);
    const count = parseInt(formData.get("count") as string);
    const allCount = parseInt(formData.get("allCount") as string);
    if (session?.admin) {
      await changeProductPricing({
        allCount: allCount,
        count: count,
        newPrice: price,
        productId: data.id,
      });
      console.log("Price updated successfully");
      revalidatePath("/shop", "page");
    }
  }
  async function deleteProductAction() {
    "use server";
    if (session?.admin || session?.role === "STAFF") {
      await deleteProduct(data.id);
      console.log("Product deleted successfully");
      revalidatePath("/shop", "page");
    }
  }
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
        <h3 className=" text-xl max-w-64 text-center">{data.name}</h3>
        <div
          className="my-4 flex flex-row gap-2 line-clamp-2 items-center text-xl font-bold"
          title="Jedlik Coin"
        >
          {data.cost},00 ɈÇ
          {session?.admin && (
            <Dialog>
              <DialogTrigger asChild>
                <Edit3Icon className="cursor-pointer" />
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>{data.name} árának megváltoztatása</DialogTitle>
                <Form
                  action={changePrice}
                  className="flex flex-col items-start gap-4 justify-evenly"
                >
                  <p className="font-semibold text-lg mb-2">
                    Jelenlegi ár: {data.cost},00 ɈÇ
                  </p>
                  <Label htmlFor="newPrice">Új ár</Label>
                  <Input
                    name="newPrice"
                    defaultValue={data.cost}
                    id="newPrice"
                    type="text"
                  ></Input>
                  <Label htmlFor="count">Elérhető darabszám</Label>
                  <Input
                    name="count"
                    id="count"
                    type="number"
                    defaultValue={data.availableCount}
                  ></Input>
                  <Label htmlFor="allCount">Összes darabszám</Label>
                  <Input
                    name="allCount"
                    id="allCount"
                    defaultValue={data.allCount}
                    type="number"
                  ></Input>
                  <Button type="submit">Megváltoztatás</Button>
                </Form>
                <Form action={deleteProductAction}>
                  <Button type="submit" variant={"destructive"}>
                    Törlés
                  </Button>
                </Form>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <p className="text-sm text-neutral-300/85">
          Elérhető: {data.availableCount}/{data.allCount}
        </p>
      </div>
    </div>
  );
}
