import { defineArrayMember, defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons/Case";
import { orderField, orderOrdering } from "./orderField";

export const experienceType = defineType({
  name: "experience",
  title: "Expérience",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({ name: "company", title: "Entreprise", type: "string", validation: (r) => r.required() }),
    defineField({ name: "position", title: "Poste", type: "string", validation: (r) => r.required() }),
    defineField({ name: "period", title: "Période", description: "Ex. : Août 2023 - Octobre 2024", type: "string" }),
    defineField({ name: "shortDesc", title: "Description", type: "text", rows: 4 }),
    defineField({
      name: "bulletPoints",
      title: "Points clés",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    orderField,
  ],
  orderings: [orderOrdering],
  preview: { select: { title: "company", subtitle: "position" } },
});
