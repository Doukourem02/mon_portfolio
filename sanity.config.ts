"use client";

/**
 * Configuration du Studio Sanity, accessible sur /studio.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { StudioLayout } from "./src/sanity/adminFlag";

const SINGLETONS = new Set(["profile"]);

export default defineConfig({
  name: "default",
  title: "Portfolio – Mohamed DOUKOURE",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Le profil est unique : on ne peut pas en créer un deuxième.
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.has(schemaType)
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
  },
  // Mémorise sur l'appareil qu'un éditeur est connecté (affiche l'engrenage sur le site).
  studio: { components: { layout: StudioLayout } },
  plugins: [structureTool({ structure, title: "Contenu" }), visionTool({ defaultApiVersion: apiVersion })],
});
