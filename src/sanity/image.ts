import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

type SanityImage = Parameters<typeof builder.image>[0];

/** URL d'une image Sanity (Next.js se charge ensuite du redimensionnement). */
export function imageUrl(source: SanityImage | null | undefined): string {
  if (!source) return "";
  return builder.image(source).auto("format").url();
}
