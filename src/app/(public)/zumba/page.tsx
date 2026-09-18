import { ZumbaClassCards, ZumbaScheduleTable } from "@/components/zumba/zumba-classes";
import { InstagramStrip } from "@/components/instagram/instagram-strip";
import { ButtonLink } from "@/components/ui/button-link";
import { getInstagramEmbeds } from "@/lib/data/queries";
import { siteConfig } from "@/lib/constants/site";

export const metadata = {
  title: "Zumba & Dance",
  description: `Zumba and dance fitness classes at ${siteConfig.name}. Book or inquire on WhatsApp.`,
};

export default async function ZumbaHubPage() {
  const embeds = await getInstagramEmbeds("zumba");

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">
          Fitness dance
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-bebas)] text-5xl tracking-wide sm:text-6xl">
          Zumba & Dance
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Morning, evening and weekend batches. Book a spot or inquire — fees
          and seats confirmed on WhatsApp. No online payment.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/zumba/book" className="neon-border">
            Book Class
          </ButtonLink>
          <ButtonLink href="/zumba/inquire" variant="outline">
            Inquire / Call
          </ButtonLink>
        </div>

        <div className="mt-12">
          <h2 className="mb-6 font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
            Classes
          </h2>
          <ZumbaClassCards />
        </div>

        <div className="mt-16">
          <h2 className="mb-6 font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
            Weekly Schedule
          </h2>
          <ZumbaScheduleTable />
        </div>
      </section>
      <InstagramStrip
        embeds={embeds.length ? embeds : await getInstagramEmbeds("home")}
        title="Zumba on IG"
      />
    </div>
  );
}
