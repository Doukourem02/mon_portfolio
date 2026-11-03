/**
 * Studio Sanity : l'interface d'administration du portfolio (/studio).
 */
import { StudioClient } from "@/sanity/StudioClient";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <StudioClient />;
}
