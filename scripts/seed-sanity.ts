/**
 * Import initial : copie tout le contenu de src/config/data.ts (et les images de /public)
 * dans Sanity. Peut être relancé sans créer de doublons (identifiants fixes).
 *
 *   npm run sanity:seed            -> importe sans écraser ce qui existe déjà
 *   npm run sanity:seed -- --force -> remplace le contenu existant par celui de data.ts
 */
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { fallbackContent } from "../src/content/fallback";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;
const force = process.argv.includes("--force");

if (!projectId || !token) {
  console.error("❌ NEXT_PUBLIC_SANITY_PROJECT_ID et SANITY_WRITE_TOKEN doivent être définis dans .env.local");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2025-10-01", useCdn: false });

const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const key = (s: string) => slug(s).slice(0, 40) || Math.random().toString(36).slice(2, 10);

const uploaded = new Map<string, string>();

/** Envoie une image de /public vers Sanity et renvoie un champ image prêt à l'emploi. */
async function image(publicPath: string | undefined) {
  if (!publicPath || /^https?:\/\//.test(publicPath)) return undefined;
  const file = path.join(process.cwd(), "public", publicPath);
  if (!existsSync(file)) {
    console.warn(`   ⚠️  Image introuvable, ignorée : ${publicPath}`);
    return undefined;
  }
  let assetId = uploaded.get(file);
  if (!assetId) {
    const asset = await client.assets.upload("image", createReadStream(file), {
      filename: path.basename(file),
    });
    assetId = asset._id;
    uploaded.set(file, assetId);
    console.log(`   🖼  ${publicPath}`);
  }
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: assetId } };
}

async function main() {
  const existing = await client.fetch<number>(`count(*[_type in ["profile","project","experience","skill","certification"]])`);
  if (existing > 0 && !force) {
    console.log(`ℹ️  Sanity contient déjà ${existing} document(s). Rien n'a été modifié.`);
    console.log("   Relance avec « npm run sanity:seed -- --force » pour remplacer par le contenu de data.ts.");
    return;
  }

  const { profile, experiences, skills, projects, certifications } = fallbackContent;
  const docs: Record<string, unknown>[] = [];

  console.log("👤 Profil");
  docs.push({
    _id: "profile",
    _type: "profile",
    name: profile.name,
    title: profile.title,
    avatar: await image(profile.avatar),
    email: profile.email,
    location: profile.location,
    description: profile.description,
    socialLinks: profile.socialLinks.map((l) => ({
      _key: key(l.title),
      _type: "socialLink",
      platform: l.title,
      url: l.url,
    })),
    experienceIntro: profile.experienceIntro,
    ctaTitle: profile.ctaTitle,
    ctaText: profile.ctaText,
    githubUsername: profile.githubUsername,
    githubTitle: profile.githubTitle,
    socialStats: {
      twitterFollowers: profile.socialStats.twitter.followers,
      twitterFollowing: profile.socialStats.twitter.following,
      instagramFollowers: profile.socialStats.instagram.followers,
      instagramFollowing: profile.socialStats.instagram.following,
    },
  });

  console.log(`💼 ${experiences.length} expérience(s)`);
  experiences.forEach((e, i) =>
    docs.push({
      _id: `experience-${slug(e.company)}`,
      _type: "experience",
      ...e,
      order: i + 1,
    })
  );

  console.log(`🧠 ${skills.length} compétence(s)`);
  const skillId = (name: string) => `skill-${slug(name)}`;
  skills.forEach((s, i) =>
    docs.push({ _id: skillId(s.name), _type: "skill", ...s, order: i + 1 })
  );

  console.log(`🚀 ${projects.length} projet(s)`);
  for (const [i, p] of projects.entries()) {
    const gallery = [];
    for (const img of p.galleryImages) {
      const value = await image(img);
      if (value) gallery.push({ ...value, _key: key(path.basename(img)) + "-" + gallery.length });
    }
    docs.push({
      _id: `project-${slug(p.title)}`,
      _type: "project",
      title: p.title,
      description: p.description,
      mainImage: await image(p.image),
      gallery,
      liveUrl: p.liveUrl,
      githubUrl: p.githubUrl,
      technologies: p.techStack.map((t) => ({
        _key: key(t.name),
        _type: "reference",
        _ref: skillId(t.name),
      })),
      order: i + 1,
    });
  }

  console.log(`🏅 ${certifications.length} certification(s)`);
  for (const [i, c] of certifications.entries()) {
    docs.push({
      _id: `certification-${slug(c.title)}`,
      _type: "certification",
      title: c.title,
      image: await image(c.image),
      url: /^https?:\/\//.test(c.url) ? c.url : undefined,
      order: i + 1,
    });
  }

  const tx = client.transaction();
  docs.forEach((doc) => tx.createOrReplace(doc as never));
  await tx.commit();
  console.log(`\n✅ ${docs.length} documents importés dans Sanity (${projectId}/${dataset}).`);
}

main().catch((err) => {
  console.error("❌ Import échoué :", err.message ?? err);
  process.exit(1);
});
