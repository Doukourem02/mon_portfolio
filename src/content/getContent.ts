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

export type Locale = "fr" | "en";
export type LocalizedContent = Record<Locale, SiteContent>;

/* eslint-disable @typescript-eslint/no-explicit-any */
/** Champ traduit : version anglaise (`<champ>En`) si elle est remplie, sinon le français. */
function tr(doc: any, field: string, locale: Locale): any {
  if (locale === "en") {
    const en = doc?.[`${field}En`];
    if (Array.isArray(en) ? en.length > 0 : typeof en === "string" ? en.trim() !== "" : en != null) return en;
  }
  return doc?.[field];
}

async function fetchRaw(): Promise<any | null> {
  const data: any = await client.fetch(
    siteContentQuery,
    {},
    { next: { revalidate: CONTENT_REVALIDATE_SECONDS, tags: [CONTENT_CACHE_TAG] } }
  );
  // Studio encore vide (import initial pas encore fait) : on garde le contenu local.
  return data?.profile ? data : null;
}

function buildContent(data: any, locale: Locale): SiteContent {
  const fb = fallbackContent.profile;
  const p = data.profile;

  return {
    profile: {
      name: p.name ?? fb.name,
      title: tr(p, "title", locale) ?? "",
      avatar: imageUrl(p.avatar) || fb.avatar,
      email: p.email ?? "",
      location: p.location ?? "",
      description: tr(p, "description", locale) ?? "",
      socialLinks: (p.socialLinks ?? []).filter((l: any) => l?.url && l?.title),
      experienceIntro: tr(p, "experienceIntro", locale) ?? "",
      ctaTitle: tr(p, "ctaTitle", locale) ?? fb.ctaTitle,
      ctaText: tr(p, "ctaText", locale) ?? "",
      githubUsername: p.githubUsername ?? fb.githubUsername,
      githubTitle: tr(p, "githubTitle", locale) ?? fb.githubTitle,
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
    experiences: (data.experiences ?? []).map((e: any) => ({
      company: e.company ?? "",
      position: tr(e, "position", locale) ?? "",
      period: tr(e, "period", locale) ?? "",
      shortDesc: tr(e, "shortDesc", locale) ?? "",
      bulletPoints: tr(e, "bulletPoints", locale) ?? [],
    })),
    skills: data.skills ?? [],
    projects: (data.projects ?? []).map((project: any) => {
      const gallery = project.gallery.map(imageUrl).filter(Boolean);
      const image = imageUrl(project.mainImage) || gallery[0] || "";
      return {
        title: project.title ?? "",
        description: tr(project, "description", locale) ?? "",
        image,
        // Sans captures, l'image principale sert de galerie… sauf s'il y a une vidéo (c'est alors sa couverture).
        galleryImages: gallery.length ? gallery : image && !project.videos?.length ? [image] : [],
        videos: (project.videos ?? []).map((v: any) => ({
          url: v.url,
          poster: imageUrl(v.poster) || undefined,
          title: v.title || undefined,
        })),
        liveUrl: project.liveUrl || undefined,
        githubUrl: project.githubUrl || undefined,
        kind: tr(project, "kind", locale) || undefined,
        status: project.status || undefined,
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

const getRaw = cache(async () => {
  if (!isSanityConfigured) return null;
  try {
    return await fetchRaw();
  } catch (error) {
    console.error("[sanity] Impossible de charger le contenu, utilisation de data.ts :", error);
    return null;
  }
});

/**
 * Tout le contenu du site dans une langue. Vient de Sanity quand il est configuré,
 * sinon (ou en cas d'erreur) de src/config/data.ts (en français uniquement).
 */
export async function getContent(locale: Locale = "fr"): Promise<SiteContent> {
  const raw = await getRaw();
  return raw ? buildContent(raw, locale) : fallbackContent;
}

/** Le contenu en français et en anglais, pour changer de langue sans recharger la page. */
export async function getLocalizedContent(): Promise<LocalizedContent> {
  const [fr, en] = await Promise.all([getContent("fr"), getContent("en")]);
  return { fr, en };
}
