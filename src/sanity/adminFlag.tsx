"use client";

import { useEffect } from "react";
import { useCurrentUser, type LayoutProps } from "sanity";
import { ADMIN_FLAG_KEY } from "./adminKey";

/**
 * Enveloppe du Studio : quand un membre du projet Sanity est connecté,
 * on le mémorise sur cet appareil pour afficher l'accès au Studio sur le site.
 * À la déconnexion, la marque est retirée.
 */
export function StudioLayout(props: LayoutProps) {
  const user = useCurrentUser();

  useEffect(() => {
    try {
      if (user) localStorage.setItem(ADMIN_FLAG_KEY, "1");
      else localStorage.removeItem(ADMIN_FLAG_KEY);
    } catch {
      // Stockage indisponible (navigation privée…) : on ignore.
    }
  }, [user]);

  return props.renderDefault(props);
}
