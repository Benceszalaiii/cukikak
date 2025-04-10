"use server";

import ProductCard from "@/components/shop/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUser } from "@/lib/db";
import { PlusIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import Form from "next/form";
import { getProducts, uploadProduct } from "./actions";
export default async function Page() {
  const products = await getProducts();
  const user = await getUser();
  async function handleUpload(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const image = formData.get("image") as File;
    const price = parseInt(formData.get("price") as string);
    const count = parseInt(formData.get("count") as string);
    if (!image.type.startsWith("image/")) {
      return;
    }
    const res = await uploadProduct({
        data: {
            name,
            image,
            price,
            count
        }
    })
    if (!res) {
      return;
    }
    console.log("Product uploaded successfully");
    revalidatePath("/shop", "page");
  }
  return (
    <main className="py-24 w-full min-h-screen">
      <section className="flex flex-wrap w-full px-8 gap-4 p-4">
        {products.map((item, index) => {
          return <ProductCard session={user} data={item} key={index} />;
        })}
        {(user?.admin || user?.role === "STAFF") && (
          <Dialog>
            <DialogTrigger className="fixed bottom-12 right-12 p-2 w-24 bg-white text-black rounded-3xl flex flex-row gap-2 items-center justify-center">
              <PlusIcon />{" "}
              <span className="hidden md:block font-semibold">Új</span>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Termék létrehozása</DialogTitle>
              <Form
                action={handleUpload}
                className="flex flex-col gap-4 items-start justify-evenly"
              >
                <Label htmlFor="name">Termék neve</Label>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  required
                  placeholder="Termék neve"
                ></Input>
                <Label htmlFor="count">Elérhető darabszám</Label>
                <Input
                  name="count"
                  id="count"
                  required
                  type="number"
                  placeholder="23"
                  defaultValue={5}
                ></Input>
                <Label htmlFor="price">Ár</Label>
                <Input
                  name="price"
                  id="price"
                  type="number"
                  required
                  placeholder="23"
                  defaultValue={5000}
                ></Input>
                <Label htmlFor="image">Termékkép</Label>
                <Input
                  accept="image/*"
                  required
                  name="image"
                  id="image"
                  type="file"
                ></Input>
                <span className="text-neutral-300/85 italic text-sm">
                  (Maximum 25mb méretű fájlokat lehet feltölteni, felette
                  megfogja a server action limit és nem tölti fel a terméket. Ha
                  nagyon ragaszkodsz a képhez, küldd át és feltöltöm.)
                </span>
                <Button type="submit" className="self-center">
                  Feltöltés
                </Button>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </section>
    </main>
  );
}
