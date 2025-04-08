"use server";
import { getUser } from "@/lib/db";
import prisma from "@/lib/prisma";
import { createHash } from "crypto";
import "server-only";

export async function getScratch() {
  const user = await getUser();
  if (!user) {
    return null;
  }
  const scratches = await prisma.scratch.findMany({
    where: { userId: user.id },
  });
  const check = scratches.find(
    (scratch) => scratch.createdAt.getTime() > Date.now() - 24 * 60 * 60 * 1000
  );
  if (check) {
    return check;
  }
  const prevNonce = Math.max(...scratches.map((scratch) => scratch.nonce));
  const nonce = (Math.abs(prevNonce) === Infinity ? 0 : prevNonce) + 1;
  const seed = `Jedlik11Corleone:${user.clientSeed}:${nonce}`;
  const hash = createHash("sha256").update(seed).digest("hex");
  const outcome = parseInt(hash.slice(0, 8), 16);
  const prize = outcome % 10 === 0 ? 3 : 0;
  function getEmoji(emojis?: string[]) {
    if (!emojis) {
      return ["🎰", "💸", "🎲", "🃏", "🤑", "🔫", "💼", "👑", "🕴️", "🪙"][
        Math.floor(Math.random() * 10)
      ];
    }
    const generated = [
      "🎰",
      "💸",
      "🎲",
      "🃏",
      "🤑",
      "🔫",
      "💼",
      "👑",
      "🕴️",
      "🪙",
    ][Math.floor(Math.random() * 7)];
    if (emojis.includes(generated)) {
      return getEmoji(emojis);
    }
    return generated;
  }
  function getPrize() {
    if (prize > 0) {
      const emoji = getEmoji();
      return [emoji, emoji, emoji];
    } else {
      const emojis: string[] = [];
      for (let i = 0; i < 3; i++) {
        emojis.push(getEmoji(emojis));
      }
      return emojis;
    }
  }
  const result = getPrize();
  const scratch = await prisma.scratch.create({
    data: {
      clientSeed: user.clientSeed,
      nonce: Math.floor(nonce),
      seed: seed,
      prize: prize,
      user: { connect: { id: user.id } },
      result: result,
    },
  });
  return scratch;
}

export async function scratchCard(scratchId: string, index: number) {
  const session = await getUser();
  if (!session) {
    return null;
  }
  const scratch = await prisma.scratch.update({
    where: { id: scratchId, userId: session.id },
    data: { scratched: { push: index } },
  });
  if (scratch.scratched.length >= 3 && !scratch.paid) {
    await prisma.user.update({
      where: { id: session.id },
      data: { coins: { increment: scratch.prize } },
    });
    await prisma.scratch.update({
      where: { id: scratchId },
      data: { paid: true },
    });
  }
  return scratch;
}
