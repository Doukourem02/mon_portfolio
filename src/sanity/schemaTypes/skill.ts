import { createElement } from "react";
import { defineField, defineType } from "sanity";
import { BulbOutlineIcon } from "@sanity/icons/BulbOutline";
import { getSkillIcon, iconColors, skillIcons } from "@/lib/icons";
import { orderField, orderOrdering } from "./orderField";

export const SKILL_CATEGORIES = ["Frontend", "Backend & Databases", "CMS", "Tools & DevOps", "Design"];

export const skillType = defineType({
  name: "skill",
  title: "Compétence",
  type: "document",
  icon: BulbOutlineIcon,
  fields: [
    defineField({ name: "name", title: "Nom", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "icon",
      title: "Icône",
      type: "string",
      options: {
        list: Object.entries(skillIcons)
          .map(([value, { label }]) => ({ title: label, value }))
          .sort((a, b) => a.title.localeCompare(b.title)),
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "color",
      title: "Couleur de l'icône",
      type: "string",
      options: { list: iconColors },
      initialValue: "text-white",
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: { list: SKILL_CATEGORIES },
      initialValue: "Frontend",
    }),
    orderField,
  ],
  orderings: [orderOrdering],
  preview: {
    select: { title: "name", subtitle: "category", icon: "icon" },
    prepare: ({ title, subtitle, icon }) => ({
      title,
      subtitle,
      media: createElement(getSkillIcon(icon)),
    }),
  },
});
