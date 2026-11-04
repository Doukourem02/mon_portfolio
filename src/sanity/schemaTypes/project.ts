import { defineArrayMember, defineField, defineType } from "sanity";
import { ProjectsIcon } from "@sanity/icons/Projects";
import { englishField, englishFieldset } from "./english";
import { orderField, orderOrdering } from "./orderField";

export const projectType = defineType({
  name: "project",
  title: "Projet",
  type: "document",
  icon: ProjectsIcon,
  fieldsets: [englishFieldset],
  fields: [
    defineField({ name: "title", title: "Titre", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "kind",
      title: "Type de projet",
      description: "Affiché en petit au-dessus du titre. Ex. : Site e-commerce, Application mobile, Plateforme web.",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Statut",
      description: "Si vide : « En production » quand il y a un lien de démo, sinon « En développement ».",
      type: "string",
      options: {
        list: [
          { title: "En production", value: "production" },
          { title: "En développement", value: "development" },
          { title: "Terminé", value: "done" },
        ],
        layout: "radio",
      },
    }),
    defineField({ name: "description", title: "Description", description: "Les retours à la ligne sont conservés : sépare les paragraphes par une ligne vide, fais des listes avec « • ».", type: "text", rows: 12 }),
    defineField({
      name: "mainImage",
      title: "Image principale",
      description: "Affichée sur la carte du projet. Si vide, la première image de la galerie est utilisée.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Galerie (captures d'écran)",
      description: "Glisse-dépose plusieurs images d'un coup. L'ordre ici = l'ordre dans la galerie.",
      type: "array",
      of: [defineArrayMember({ type: "image" })],
      options: { layout: "grid" },
    }),
    defineField({ name: "liveUrl", title: "Lien de la démo", description: "Laisser vide si pas encore déployé.", type: "url" }),
    defineField({ name: "githubUrl", title: "Lien GitHub", type: "url" }),
    defineField({
      name: "technologies",
      title: "Technologies utilisées",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "skill" }] })],
    }),
    englishField("kind", "Type de projet"),
    englishField("description", "Description", "text"),
    orderField,
  ],
  orderings: [orderOrdering],
  preview: { select: { title: "title", media: "mainImage" } },
});
