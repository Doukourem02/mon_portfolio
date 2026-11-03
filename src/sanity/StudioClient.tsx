"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../sanity.config";

/**
 * Le Studio garde une connexion temps réel avec Sanity. Quand elle reste
 * silencieuse 45 s (onglet en arrière-plan, Mac en veille, réseau lent),
 * la bibliothèque `event-source-polyfill` se reconnecte toute seule, mais
 * écrit au passage « No activity within 45000 milliseconds… » en console.error,
 * ce qui ouvre la fenêtre d'erreur de Next.js en développement.
 * C'est sans conséquence : on masque uniquement ce message-là.
 */
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    const first = args[0];
    const message = first instanceof Error ? first.message : String(first ?? "");
    if (message.startsWith("No activity within") && message.includes("Reconnecting")) return;
    originalError(...args);
  };
}

export function StudioClient() {
  return <NextStudio config={config} />;
}
