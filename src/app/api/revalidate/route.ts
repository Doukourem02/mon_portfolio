import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { CONTENT_CACHE_TAG } from "@/content/getContent";

/**
 * Appelée par le webhook Sanity à chaque publication :
 * vide le cache pour que la modification soit visible tout de suite.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET manquant" }, { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret, true);
    if (!isValidSignature) {
      return NextResponse.json({ message: "Signature invalide" }, { status: 401 });
    }

    revalidateTag(CONTENT_CACHE_TAG, { expire: 0 });
    revalidatePath("/", "layout");
    return NextResponse.json({ revalidated: true, type: body?._type ?? null, now: Date.now() });
  } catch (error) {
    console.error("[revalidate]", error);
    return NextResponse.json({ message: "Erreur de revalidation" }, { status: 500 });
  }
}
