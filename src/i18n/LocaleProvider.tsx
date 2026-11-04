"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Locale } from "@/content/getContent";
import { dictionaries, type Dictionary } from "./dictionary";

const STORAGE_KEY = "portfolio-locale";

const LocaleContext = createContext<{ locale: Locale; setLocale: (l: Locale) => void }>({
  locale: "fr",
  setLocale: () => {},
});

/**
 * Langue du site : choix mémorisé sur l'appareil, sinon langue du navigateur
 * (anglais si le navigateur n'est pas en français). Le premier rendu est en
 * français pour correspondre à la page générée par le serveur.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    let initial: Locale = "fr";
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "fr" || saved === "en") initial = saved;
      else if (!navigator.language.toLowerCase().startsWith("fr")) initial = "en";
    } catch {
      // Stockage indisponible : on garde le français.
    }
    setLocaleState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // Pas grave : le choix ne sera simplement pas mémorisé.
    }
  }, []);

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);

/** Textes de l'interface dans la langue choisie. */
export function useT(): Dictionary {
  return dictionaries[useLocale().locale];
}
