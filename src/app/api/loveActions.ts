"use server";

import { redis } from "@/lib/upstash";

const LOVE_COUNT_KEY = "love_count";

export async function getLoveCountServerAction() {
  try {
    const count = await redis.get<number>(LOVE_COUNT_KEY);
    return { success: true, count: count ?? 0 };
  } catch (error) {
    // Ignorer les erreurs de connexion interrompue (non critiques)
    if (error instanceof Error && error.message.includes("aborted")) {
      return { success: true, count: 0 };
    }
    console.error("Error getting love count:", error);
    return { success: true, count: 0 };
  }
}

export async function setLoveCountServerAction() {
  try {
    const newCount = await redis.incr(LOVE_COUNT_KEY);
    return { success: true, count: newCount };
  } catch (error) {
    // Ignorer les erreurs de connexion interrompue (non critiques)
    if (error instanceof Error && error.message.includes("aborted")) {
      return { success: true, count: 1 };
    }
    console.error("Error updating love count:", error);
    return { success: true, count: 1 };
  }
}
