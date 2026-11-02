// L'ID de projet et le dataset ne sont pas secrets (ils apparaissent dans les URL des images).
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "508ep9lw";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-10-01";

/** Vrai quand un projet Sanity est branché (sinon le site affiche src/config/data.ts). */
export const isSanityConfigured = Boolean(projectId);
