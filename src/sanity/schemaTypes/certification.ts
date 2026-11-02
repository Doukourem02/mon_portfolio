import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons/Star";
import { orderField, orderOrdering } from "./orderField";

export const certificationType = defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({ name: "title", title: "Titre", type: "string", validation: (r) => r.required() }),
    defineField({ name: "image", title: "Image du certificat", type: "image", validation: (r) => r.required() }),
    defineField({
      name: "url",
      title: "Lien de vérification",
      description: "Si vide, le clic ouvre l'image du certificat.",
      type: "url",
    }),
    orderField,
  ],
  orderings: [orderOrdering],
  preview: { select: { title: "title", media: "image" } },
});
