import { defineArrayMember, defineField, defineType } from "sanity";
import { ProjectsIcon } from "@sanity/icons/Projects";
import { orderField, orderOrdering } from "./orderField";

export const projectType = defineType({
  name: "project",
  title: "Projet",
  type: "document",
  icon: ProjectsIcon,
  fields: [
    defineField({ name: "title", title: "Titre", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 8 }),
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
    orderField,
  ],
  orderings: [orderOrdering],
  preview: { select: { title: "title", media: "mainImage" } },
});
