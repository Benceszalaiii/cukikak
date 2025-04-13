"use server";

import { getUser } from "@/lib/db";
import prisma from "@/lib/prisma";

export async function getMovieLink() {
  const res = await prisma.movieLink.findMany({
    orderBy: { id: "desc" },
    take: 1,
  });
  const data = res ? res[0] : null;
  if (!data?.href || !data) {
    return "https://www.youtube.com/embed/KHU2eeZn6pk?si=KU3B2s_7iuuLhNCT";
  }
  return data.href;
}

export async function setMovieLink(formData: FormData) {
  const user = await getUser();
  if (!user?.admin) {
    return;
  }
  const url = formData.get("url");
  if (!url || typeof url !== "string") {
    return;
  }
  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    return;
  }
  if (!url.includes("youtube.com/embed/")) {
    return;
  }
  await prisma.movieLink.create({
    data: { href: url, uploadedBy: { connect: { id: user.id } } },
  });
  return;
}
