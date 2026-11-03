"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { ADMIN_FLAG_KEY } from "@/sanity/adminKey";

/**
 * Pied de page avec un accès au Studio Sanity (/studio), réservé à l'éditeur :
 * - l'icône engrenage n'apparaît que sur un appareil où l'on s'est déjà
 *   connecté au Studio (marque posée par src/sanity/adminFlag.tsx) ;
 * - le raccourci Ctrl + Shift + S (Cmd + Shift + S sur Mac) reste disponible
 *   partout, pour la toute première connexion sur un nouvel appareil.
 */
export function Footer({ name }: { name: string }) {
  const router = useRouter();
  const [isEditor, setIsEditor] = useState(false);

  useEffect(() => {
    try {
      setIsEditor(localStorage.getItem(ADMIN_FLAG_KEY) === "1");
    } catch {
      // Stockage indisponible : on n'affiche pas l'engrenage.
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        router.push("/studio");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <footer className="max-w-4xl mx-auto px-6 lg:px-8 py-8 flex items-center justify-center gap-3 text-sm text-gray-500">
      <span>
        © {new Date().getFullYear()} {name}
      </span>
      {isEditor && (
        <Link
          href="/studio"
          aria-label="Gérer le contenu"
          title="Gérer le contenu"
          className="opacity-40 hover:opacity-100 transition-opacity"
        >
          <FiSettings className="w-4 h-4" />
        </Link>
      )}
    </footer>
  );
}
