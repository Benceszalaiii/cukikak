"use server";

import { getUser } from "@/lib/db";

export default async function AdminLayout({
  users
}: {
  users: React.ReactNode
}) {
  const user = await getUser();
  if (!user?.admin) {
    return <div>Not authorized</div>;
  }
  // async function handleSubmit(formData: FormData) {
  //   'use server'
  //   console.log(formData);
  //   sendTest();
  // }
  return (
    <section className="w-full h-full min-h-screen bg-neutral-900 [--foreground=0_100%_100%]">
      {/* <form action={handleSubmit}>
        <Button className="fixed top-24 left-64" variant={"outline"} type="submit">
          Send test mail
        </Button>
        </form> */}
    {users}
    </section>  
  );
}
