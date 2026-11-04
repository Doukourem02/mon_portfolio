"use client";

import { useLocale, useT } from "@/i18n/LocaleProvider";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";

const THEMES = ["system", "light", "dark"] as const;
type ThemeChoice = (typeof THEMES)[number];
const THEME_ICON = { system: FiMonitor, light: FiSun, dark: FiMoon };

export function Header({ name }: { name: string }) {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const { locale, setLocale } = useLocale();
  const t = useT();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const updateTime = () => setTime(new Date().toLocaleTimeString("fr-FR", { hour12: false }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Avant le montage, le thème réel n'est pas connu : on affiche « automatique ».
  const current: ThemeChoice = mounted && THEMES.includes(theme as ThemeChoice) ? (theme as ThemeChoice) : "system";
  const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
  const ThemeIcon = THEME_ICON[current];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-20 px-4 sm:px-6 py-3 bg-black/50 backdrop-blur-sm font-mono"
    >
      <nav className="w-full flex items-center justify-between gap-3">
        <div className="text-white flex gap-2 items-center min-w-0">
          <Link href="/" className="flex items-center shrink-0">
            <Image src="/logo.ico" alt={`${name} logo`} className="rounded-full h-12 w-12" width={72} height={72} />
          </Link>
          <Link href="/cv" className="text-base sm:text-lg hover:text-blue-400 transition-colors truncate">
            Curriculum.Vitae
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="hidden sm:inline text-gray-400 tabular-nums">{time}</span>

          {/* Langue : un cercle avec la langue actuelle, un clic bascule FR ↔ EN */}
          <button
            type="button"
            onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
            title={t.header.switchTo}
            aria-label={t.header.switchTo}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/80 bg-gray-900/40 text-[11px] font-semibold text-gray-300 transition-colors hover:text-white"
          >
            {locale.toUpperCase()}
          </button>

          {/* Thème : automatique → clair → sombre */}
          <button
            type="button"
            onClick={() => setTheme(next)}
            title={t.header.theme[current]}
            aria-label={t.header.theme[current]}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/80 bg-gray-900/40 text-gray-300 transition-colors hover:text-white"
          >
            <ThemeIcon className="h-4 w-4" />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
