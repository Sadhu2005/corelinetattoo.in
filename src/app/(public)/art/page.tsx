import { ButtonLink } from "@/components/ui/button-link";
import { PageHero } from "@/components/layout/page-hero";
import { PortraitPricing } from "@/components/forms/portrait-pricing";
import { InstagramStrip } from "@/components/instagram/instagram-strip";
import { getInstagramEmbeds } from "@/lib/data/queries";
import { siteConfig, servicePillars, studioImages } from "@/lib/constants/site";

export const metadata = {
  title: "Art Works",
  description: `Blood art, pencil sketches, portrait & wall painting at ${siteConfig.name}. Delivered across India.`,
};

export default async function ArtHubPage() {
  const embeds = await getInstagramEmbeds("art");
  const pillar = servicePillars.find((p) => p.id === "art")!;

  return (
    <div>
      <PageHero
        image={studioImages.art}
        eyebrow="Art works"
        title="Art Works"
        description="Turn special ideas into custom blood art and pencil sketches — perfect personal gifts. Expertly crafted and safely delivered across India."
      >
        <ul className="grid gap-2 sm:grid-cols-2 lg:max-w-3xl lg:grid-cols-3">
          {pillar.items.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-border bg-white/90 px-4 py-3 text-sm shadow-sm"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Instagram:{" "}
          <a
            href="https://www.instagram.com/_ashwath_art_gowda_/"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @_ashwath_art_gowda_
          </a>
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/art/order" className="neon-border">
            Order Art
          </ButtonLink>
          <ButtonLink href="/gallery" variant="outline">
            Gallery
          </ButtonLink>
          <ButtonLink href="/zumba/inquire?pillar=art" variant="ghost">
            Inquire
          </ButtonLink>
        </div>
      </PageHero>
      <div className="px-4 sm:px-6">
        <PortraitPricing />
      </div>
      <InstagramStrip
        embeds={embeds.length ? embeds : await getInstagramEmbeds("home")}
        title="Art on IG"
        accountUrl="https://www.instagram.com/_ashwath_art_gowda_/"
      />
    </div>
  );
}
