import { defineArrayMember, defineField } from "sanity";

/** Encadré repliable qui regroupe les traductions anglaises d'un document. */
export const englishFieldset = {
  name: "english",
  title: "🇬🇧 Version anglaise",
  description: "Affichée quand le visiteur choisit EN. Un champ laissé vide reprend le texte français.",
  options: { collapsible: true, collapsed: true },
};

type Kind = "string" | "text" | "stringList";

/** Champ anglais `<name>En`, rangé dans l'encadré « Version anglaise ». */
export function englishField(name: string, title: string, kind: Kind = "string", extra: { group?: string } = {}) {
  const base = { name: `${name}En`, title: `${title} (anglais)`, fieldset: extra.group ? undefined : "english", group: extra.group };
  if (kind === "stringList") return defineField({ ...base, type: "array", of: [defineArrayMember({ type: "string" })] });
  if (kind === "text") return defineField({ ...base, type: "text", rows: 6 });
  return defineField({ ...base, type: "string" });
}
