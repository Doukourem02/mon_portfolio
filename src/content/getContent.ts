import { cache } from "react";
import { client } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import { imageUrl } from "@/sanity/image";
import { siteContentQuery } from "@/sanity/queries";
import { fallbackContent } from "./fallback";
import type { SiteContent } from "./types";

/** Délai max (en secondes) avant qu'une modification apparaisse si le webhook n'est pas configuré. */
export const CONTENT_REVALIDATE_SECONDS = 60;
export const CONTENT_CACHE_TAG = "sanity";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function fetchFromSanity(): Promise<SiteContent | null> {
  const data: any = await client.fetch(
    siteContentQuery,
    {},
    { next: { revalidate: CONTENT_REVALIDATE_SECONDS, tags: [CONTENT_CACHE_TAG] } }
  );

  // Studio encore vide (import initial pas encore fait) : on garde le contenu local.
  if (!data?.profile) return null;

  const fb = fallbackContent.profile;
  const p = data.profile;

  return {
    profile: {
      name: p.name ?? fb.name,
      title: p.title ?? "",
      avatar: imageUrl(p.avatar) || fb.avatar,
      email: p.email ?? "",
      location: p.location ?? "",
      description: p.description ?? "",
      socialLinks: (p.socialLinks ?? []).filter((l: any) => l?.url && l?.title),
      experienceIntro: p.experienceIntro ?? "",
      ctaTitle: p.ctaTitle ?? fb.ctaTitle,
      ctaText: p.ctaText ?? "",
      githubUsername: p.githubUsername ?? fb.githubUsername,
      githubTitle: p.githubTitle ?? fb.githubTitle,
      socialStats: {
        twitter: {
          followers: p.socialStats?.twitterFollowers ?? 0,
          following: p.socialStats?.twitterFollowing ?? 0,
        },
        instagram: {
          followers: p.socialStats?.instagramFollowers ?? 0,
          following: p.socialStats?.instagramFollowing ?? 0,
        },
      },
    },
    experiences: data.experiences ?? [],
    skills: data.skills ?? [],
    projects: (data.projects ?? []).map((project: any) => {
      const gallery = project.gallery.map(imageUrl).filter(Boolean);
      const image = imageUrl(project.mainImage) || gallery[0] || "";
      return {
        title: project.title ?? "",
        description: project.description ?? "",
        image,
        galleryImages: gallery.length ? gallery : image ? [image] : [],
        liveUrl: project.liveUrl || undefined,
        githubUrl: project.githubUrl || undefined,
        techStack: project.techStack.filter(Boolean),
      };
    }),
    certifications: (data.certifications ?? []).map((cert: any) => {
      const image = imageUrl(cert.image);
      return { title: cert.title ?? "", image, url: cert.url || image };
    }),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Tout le contenu du site. Vient de Sanity quand il est configuré,
 * sinon (ou en cas d'erreur) de src/config/data.ts.
 */
export const getContent = cache(async (): Promise<SiteContent> => {
  if (!isSanityConfigured) return fallbackContent;
  try {
    return (await fetchFromSanity()) ?? fallbackContent;
  } catch (error) {
    console.error("[sanity] Impossible de charger le contenu, utilisation de data.ts :", error);
    return fallbackContent;
  }
});
