import { Footer, Header } from "@/components";
import { Providers } from "@/components/Providers";
import { getContent } from "@/content/getContent";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.GOOGLE_ANALYTICS_ID || "";
  const { profile } = await getContent();

  return (
    <Providers>
      {/* 🔝 Site Header */}
      <Header name={profile.name} />

      {/* 🔥 Page Content */}
      {children}

      {/* 🔻 Pied de page (accès discret au Studio) */}
      <Footer name={profile.name} />

      {/* 📊 Analytics */}
      {gaId && <GoogleAnalytics gaId={gaId} />}
      <Analytics />
      <SpeedInsights />
    </Providers>
  );
}
