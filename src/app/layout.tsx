import "./globals.css";
import { inter, jetbrainsMono } from "@/config/fonts";
import { metaData } from "@/config/metadata";

export const metadata = metaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-black text-white">{children}</body>
    </html>
  );
}
