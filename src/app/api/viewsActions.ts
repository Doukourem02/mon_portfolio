"use server";

import { redis } from "@/lib/upstash";

const VIEWS_KEY = "views";

export async function getViewsServerAction() {
  try {
    const views = await redis.get<number>(VIEWS_KEY);
    return { success: true, views: views ?? 0 };
  } catch (error) {
    // Ignorer les erreurs de connexion interrompue (non critiques)
    if (error instanceof Error && error.message.includes("aborted")) {
      return { success: true, views: 0 };
    }
    console.error("Error getting views:", error);
    return { success: true, views: 0 };
  }
}

export async function setViewsServerAction() {
  try {
    await redis.incr(VIEWS_KEY);
    return { success: true, message: "View added successfully" };
  } catch (error) {
    // Ignorer les erreurs de connexion interrompue (non critiques)
    if (error instanceof Error && error.message.includes("aborted")) {
      return { success: true, message: "View added successfully" };
    }
    console.error("Error updating views:", error);
    return { success: true, message: "View added successfully" };
  }
}
