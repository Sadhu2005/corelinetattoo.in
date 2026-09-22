import { TattooDesignsBrowser } from "@/components/gallery/tattoo-designs-browser";
import { getTattooDesigns } from "@/lib/data/queries";

export const metadata = {
  title: "Tattoo Designs",
  description: "Browse tattoo design styles — book on WhatsApp.",
};

export default async function TattooDesignsPage() {
  const designs = await getTattooDesigns();
  return <TattooDesignsBrowser designs={designs} />;
}
