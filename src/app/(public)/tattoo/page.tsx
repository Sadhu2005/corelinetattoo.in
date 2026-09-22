import { ButtonLink } from "@/components/ui/button-link";
import { PageHero } from "@/components/layout/page-hero";
import { InstagramStrip } from "@/components/instagram/instagram-strip";
import { getInstagramEmbeds } from "@/lib/data/queries";
import { servicePillars, studioImages } from "@/lib/constants/site";

export const metadata = {
  title: "Tattoo Studio",
  description:
    "Custom tattoos, flash, cover-ups & body piercings at Coreline Studio Bengaluru. Safe & hygienic. Book on WhatsApp.",
};

export default async function TattooHubPage() {
  const embeds = await getInstagramEmbeds("tattoo");
  const pillar = servicePillars.find((p) => p.id === "tattoo")!;

  return (
    <div>
      <PageHero
        image={studioImages.tattoo}
        eyebrow="Tattoo studio"
        title="Tattoo Studio"
        description="Share your idea — we design a custom tattoo to create a lasting memory. Safe, hygienic tattooing with expert precision. All India booking & consultations available."
      >
        <ul className="grid gap-2 sm:grid-cols-2 lg:max-w-2xl">
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
            href="https://www.instagram.com/coreline_art_tattoos/"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @coreline_art_tattoos
          </a>
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/tattoo/book" className="neon-border">
            Book Session
          </ButtonLink>
          <ButtonLink href="/tattoo/designs" variant="outline">
            Browse Designs
          </ButtonLink>
          <ButtonLink href="/zumba/inquire?pillar=tattoo" variant="ghost">
            Inquire / Call
          </ButtonLink>
        </div>
      </PageHero>
      <InstagramStrip
        embeds={embeds.length ? embeds : await getInstagramEmbeds("home")}
        title="Tattoo on IG"
        accountUrl="https://www.instagram.com/coreline_art_tattoos/"
      />
    </div>
  );
}
