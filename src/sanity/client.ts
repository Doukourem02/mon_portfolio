import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId: projectId || "not-configured",
  dataset,
  apiVersion,
  // Pas de CDN : le cache est géré par Next.js (ISR + webhook de revalidation),
  // ce qui garantit qu'une publication est visible immédiatement.
  useCdn: false,
});
