import { Redis } from "@upstash/redis";

// Identifiants Upstash Redis (compteurs vues / j'aime).
// Accepte aussi les noms créés automatiquement par l'intégration Upstash de Vercel.
const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

/**
 * Client Redis, ou `null` si la base n'est pas configurée.
 * Sans configuration, les compteurs restent simplement à 0 (aucune erreur).
 */
export const redis = url && token ? new Redis({ url, token }) : null;

if (!redis && process.env.NODE_ENV !== "production") {
  console.info(
    "ℹ️  Compteurs vues / j'aime désactivés : UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN ne sont pas définis."
  );
}
