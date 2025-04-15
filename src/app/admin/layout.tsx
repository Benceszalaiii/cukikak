"use server";

import Nav from "@/components/layout/nav";
import { getUser } from "@/lib/db";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user?.admin) {
    return <div>Ehhez az oldalhoz nincs hozzáférésed.</div>;
  }
  return (
    <section className="w-full h-full min-h-screen bg-neutral-900 [--foreground=0_100%_100%]">
      <Nav />
      {children}
    </section>
  );
}
