import { getTattooDesigns } from "@/lib/data/queries";
import { DesignsManager } from "@/components/admin/designs-manager";

export default async function AdminDesignsPage() {
  const designs = await getTattooDesigns();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide">
        Tattoo Designs
      </h1>
      <p className="mt-2 text-muted-foreground">
        Upload tattoo reference designs for the gallery
      </p>
      <div className="mt-8">
        <DesignsManager designs={designs} />
      </div>
    </div>
  );
}
