import { ButtonLink } from "@/components/ui/button-link";
import { InstagramStrip } from "@/components/instagram/instagram-strip";
import { getInstagramEmbeds } from "@/lib/data/queries";
import { siteConfig } from "@/lib/constants/site";

export const metadata = {
  title: "Tattoo",
  description: `Custom tattoos at ${siteConfig.name}. Book a session — discuss design & price on WhatsApp.`,
};

export default async function TattooHubPage() {
  const embeds = await getInstagramEmbeds("tattoo");

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">
          Tattoo studio
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-bebas)] text-5xl tracking-wide sm:text-6xl">
          Custom Tattoos
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Minimal, anime, religious, sleeves and custom work. Book a session —
          design and pricing finalized on WhatsApp. No online payment.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
      </section>
      <InstagramStrip embeds={embeds.length ? embeds : await getInstagramEmbeds("home")} title="Tattoo on IG" />
    </div>
  );
}
