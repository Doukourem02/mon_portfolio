import type { StructureResolver } from "sanity/structure";

const orderedList = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.documentTypeListItem(type)
    .title(title)
    .child(
      S.documentTypeList(type)
        .title(title)
        .defaultOrdering([
          { field: "order", direction: "asc" },
          { field: "_createdAt", direction: "asc" },
        ])
    );

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu du portfolio")
    .items([
      S.listItem()
        .title("Profil & textes du site")
        .id("profile")
        .child(S.document().schemaType("profile").documentId("profile").title("Profil & textes du site")),
      S.divider(),
      orderedList(S, "project", "Projets"),
      orderedList(S, "experience", "Expériences"),
      orderedList(S, "skill", "Compétences"),
      orderedList(S, "certification", "Certifications"),
    ]);
