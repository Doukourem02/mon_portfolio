"use client";

import { ThemeProvider } from "next-themes";
import { LocaleProvider } from "@/i18n/LocaleProvider";

/** Thème (suit le système par défaut) et langue du site. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
