import { defineArrayMember, defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons/User";
import { englishField } from "./english";

export const profileType = defineType({
  name: "profile",
  title: "Profil & textes du site",
  type: "document",
  icon: UserIcon,
  groups: [
    { name: "identity", title: "Identité", default: true },
    { name: "social", title: "Réseaux sociaux" },
    { name: "texts", title: "Textes des sections" },
    { name: "github", title: "GitHub & stats" },
    { name: "english", title: "🇬🇧 Anglais" },
  ],
  fields: [
    defineField({ name: "name", title: "Nom complet", type: "string", group: "identity", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Titre / métier", type: "string", group: "identity" }),
    defineField({
      name: "avatar",
      title: "Photo de profil",
      type: "image",
      group: "identity",
      options: { hotspot: true },
    }),
    defineField({ name: "email", title: "Email de contact", type: "string", group: "identity", validation: (r) => r.email() }),
    defineField({ name: "location", title: "Localisation", type: "string", group: "identity" }),
    defineField({ name: "description", title: "Présentation", type: "text", rows: 6, group: "identity" }),

    defineField({
      name: "socialLinks",
      title: "Liens réseaux sociaux",
      description: "Glisse les éléments pour changer l'ordre d'affichage.",
      type: "array",
      group: "social",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Réseau",
              type: "string",
              options: { list: ["GitHub", "LinkedIn", "Twitter", "Instagram"] },
              validation: (r) => r.required(),
            }),
            defineField({ name: "url", title: "Lien", type: "url", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),

    defineField({
      name: "experienceIntro",
      title: "Intro de « Parcours professionnel »",
      type: "text",
      rows: 3,
      group: "texts",
    }),
    defineField({ name: "ctaTitle", title: "Titre de la section contact", type: "string", group: "texts" }),
    defineField({ name: "ctaText", title: "Texte de la section contact", type: "text", rows: 3, group: "texts" }),

    defineField({ name: "githubUsername", title: "Nom d'utilisateur GitHub", type: "string", group: "github" }),
    defineField({ name: "githubTitle", title: "Titre de la section GitHub", type: "string", group: "github" }),
    defineField({
      name: "socialStats",
      title: "Statistiques affichées sous le graphique GitHub",
      type: "object",
      group: "github",
      options: { columns: 2 },
      fields: [
        defineField({ name: "twitterFollowers", title: "Abonnés Twitter", type: "number" }),
        defineField({ name: "twitterFollowing", title: "Abonnements Twitter", type: "number" }),
        defineField({ name: "instagramFollowers", title: "Abonnés Instagram", type: "number" }),
        defineField({ name: "instagramFollowing", title: "Abonnements Instagram", type: "number" }),
      ],
    }),

    // Traductions anglaises (un champ vide reprend le français)
    englishField("title", "Titre / métier", "string", { group: "english" }),
    englishField("description", "Présentation", "text", { group: "english" }),
    englishField("experienceIntro", "Intro de « Parcours professionnel »", "text", { group: "english" }),
    englishField("ctaTitle", "Titre de la section contact", "string", { group: "english" }),
    englishField("ctaText", "Texte de la section contact", "text", { group: "english" }),
    englishField("githubTitle", "Titre de la section GitHub", "string", { group: "english" }),
  ],
  preview: { select: { title: "name", subtitle: "title", media: "avatar" } },
});
