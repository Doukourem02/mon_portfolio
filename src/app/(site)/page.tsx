import { Portfolio } from "@/components/Portfolio";
import { getLocalizedContent } from "@/content/getContent";

// Le contenu vient de Sanity : la page est régénérée au plus tard toutes les 60 s,
// et immédiatement à chaque publication grâce au webhook (/api/revalidate).
export const revalidate = 60;

export default async function Page() {
  return <Portfolio content={await getLocalizedContent()} />;
}
