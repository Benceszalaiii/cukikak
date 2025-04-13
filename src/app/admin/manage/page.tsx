"use server";
import CountUp from "@/components/bits/counter";
import CoinInput from "@/components/manage/coin-input";
import Search from "@/components/manage/search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/db";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Form from "next/form";
import "server-only";
type SearchParams = Promise<{ [key: string]: string | undefined }>;
export default async function Page(props: { searchParams: SearchParams }) {
  const user = await getUser();

  if (!user || !user.admin) {
    return (
      <div className="w-full h-full min-h-screen bg-neutral-900 [--foreground=0_100%_100%]">
        Nuh uh. Ehhez nincs jogod. Jelentkezz be
      </div>
    );
  }
  const searchParams = await props.searchParams;
  //! unsafe code lol !?
  const users = await prisma.user.findMany({
    select: {
      image: true,
      id: true,
      name: true,
      coins: true,
      admin: true,
      Class: {
        select: {
          name: true,
        },
      },
    },
  });
  const activeUserId = searchParams.user;
  const active = users.find((user) => user.id === activeUserId);
  async function handleSubmit(formData: FormData) {
    "use server";
    if (!user || !active) {
      return;
    }
    try {
      const amount = parseInt(formData.get("amount") as string);
      const method = formData.get("method") as string;
      if (!method || !amount) {
        throw new Error("Invalid form data");
      }
      if (amount <= 0){
        return;
      }
      const transaction = await prisma.transaction.create({
        data: {
          amount: amount,
          userId: active?.id,
          handlerId: user.id,
          type: method === "withdraw" ? "WITHDRAW" : "DEPOSIT",
        },
      });
      if (transaction) {
        if (method === "withdraw") {
          await prisma.user.update({
            where: { id: active?.id },
            data: { coins: { increment: -amount } },
          });
        } else if (method === "deposit") {
          {
            await prisma.user.update({
              where: { id: active?.id },
              data: { coins: { increment: amount } },
            });
          }
        }
        revalidatePath("/admin/manage", "page");
      }
    } catch (e) {
      console.error(e);
      return;
    }
  }
  return (
    <main className="py-24 px-4 md:px-24 flex flex-col gap-4 items-center">
      <Search activeUser={active} users={users} />
      {active ? (
        <>
          <section className="flex flex-row gap-4 items-center">
            <Avatar>
              <AvatarImage src={active.image ?? ""} alt="user"></AvatarImage>
              <AvatarFallback>{user.name ? user.name[0] : "?"}</AvatarFallback>
            </Avatar>
            <h2 className="font-semibold text-lg ">{active.name}</h2>
          </section>
            <CountUp delay={0} duration={1.4} separator=" " className="text-4xl font-semibold font-mono text-center" direction={"up"} to={active.coins}></CountUp>
          <section>
            <Form action={handleSubmit} className="flex flex-col w-full gap-8 ">
              <CoinInput defaultValue={active.coins} />
              <Button className="" type="submit">
                Megerősítés
              </Button>
            </Form>
          </section>
        </>
      ) : (
        <h2>Nincs kiválasztva felhasználó</h2>
      )}
    </main>
  );
}
