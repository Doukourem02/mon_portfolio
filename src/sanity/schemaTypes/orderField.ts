import { defineField } from "sanity";

/** Champ « Ordre » commun : plus le nombre est petit, plus l'élément apparaît haut. */
export const orderField = defineField({
  name: "order",
  title: "Ordre d'affichage",
  description: "Plus le nombre est petit, plus l'élément apparaît en haut (1, 2, 3…).",
  type: "number",
  initialValue: 100,
});

export const orderOrdering = {
  title: "Ordre d'affichage",
  name: "orderAsc",
  by: [{ field: "order", direction: "asc" as const }],
};
