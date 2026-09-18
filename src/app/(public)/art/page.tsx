import { ButtonLink } from "@/components/ui/button-link";
import { PortraitPricing } from "@/components/forms/portrait-pricing";
import { InstagramStrip } from "@/components/instagram/instagram-strip";
import { getInstagramEmbeds } from "@/lib/data/queries";
import { siteConfig } from "@/lib/constants/site";

export const metadata = {
  title: "Drawing & Art",
  description: `Blood art, pencil sketches & color portraits at ${siteConfig.name}. Order online — discuss on WhatsApp.`,
};

export default async function ArtHubPage() {
  const embeds = await getInstagramEmbeds("art");

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">
          Drawing & art
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-bebas)] text-5xl tracking-wide sm:text-6xl">
          Portraits & Paintings
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Blood art, pencil sketches and color canvases. Listed prices are
          guidance — confirm framing, courier and blood-tube details on WhatsApp.
          No online payment.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/art/order" className="neon-border">
            Order Portrait
          </ButtonLink>
          <ButtonLink href="/gallery" variant="outline">
            Art Gallery
          </ButtonLink>
          <ButtonLink href="/zumba/inquire?pillar=art" variant="ghost">
            Inquire
          </ButtonLink>
        </div>
      </section>
      <div className="px-4 sm:px-6">
        <PortraitPricing />
      </div>
      <InstagramStrip
        embeds={embeds.length ? embeds : await getInstagramEmbeds("home")}
        title="Art on IG"
      />
    </div>
  );
}
