import { getContent } from "@/content/getContent";

export const revalidate = 3600;

export async function GET() {
  try {
    const { socialLinks } = (await getContent()).profile;
    if (!socialLinks?.length) return Response.json({ error: "No social links found!" });
    return Response.json(socialLinks);
  } catch {
    return Response.json({ error: "Something went wrong!" });
  }
}
