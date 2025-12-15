import type { Metadata } from "next";

export const metaData: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_CURRENT_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Mohamed DOUKOURE Portfolio",
    title:
      "Mohamed DOUKOURE | Full Stack Developer — Web & Mobile | UI/UX Designer",
    description:
      "Découvrez Mohamed DOUKOURE, développeur Full Stack passionné par la création d'expériences numériques exceptionnelles. Spécialisé dans le développement web et mobile avec TypeScript, Node.js, Next.js, React et les technologies modernes, combinant expertise technique et sens du design pour concevoir des applications performantes, intuitives et esthétiques.",
    images: [
      {
        url: "/image.webp",
        alt: "Mohamed DOUKOURE | Full-Stack Web Developer",
        height: 630,
        width: 1200,
      },
    ],
  },
  title:
    "Mohamed DOUKOURE | Full Stack Developer — Web & Mobile | UI/UX Designer",
  description:
    "Découvrez Mohamed DOUKOURE, développeur Full Stack passionné par la création d'expériences numériques exceptionnelles. Spécialisé dans le développement web et mobile avec TypeScript, Node.js, Next.js, React et les technologies modernes, combinant expertise technique et sens du design pour concevoir des applications performantes, intuitives et esthétiques.",
  keywords:
    "Mohamed DOUKOURE, Full-Stack Developer, Full-Stack Web Developer, Software Engineer, ReactJS Developer, NextJS Developer, Node.js Developer, Express.js, MongoDB, Web Development, Portfolio, React developer, Next.js developer, Tailwind CSS, Modern Web Technologies, User-Centric Solutions",
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  authors: {
    name: "Mohamed DOUKOURE",
    url: process.env.NEXT_PUBLIC_CURRENT_SITE_URL || "http://localhost:3000",
  },
};
