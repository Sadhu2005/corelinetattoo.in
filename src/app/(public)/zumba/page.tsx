import { ZumbaClassCards, ZumbaScheduleTable } from "@/components/zumba/zumba-classes";
import { PageHero } from "@/components/layout/page-hero";
import { InstagramStrip } from "@/components/instagram/instagram-strip";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/button-link";
import { getInstagramEmbeds } from "@/lib/data/queries";
import {
  siteConfig,
  servicePillars,
  studioImages,
  whatsappUrl,
  waMessages,
} from "@/lib/constants/site";

export const metadata = {
  title: "Classes — Dance, Karate, Zumba & Art",
  description: `Classical & western dance, Shotokan karate, aerobics & Zumba, art & drawing at ${siteConfig.name}. Free trial class.`,
};

export default async function ZumbaHubPage() {
  const embeds = await getInstagramEmbeds("zumba");
  const pillar = servicePillars.find((p) => p.id === "zumba")!;

  return (
    <div>
      <PageHero
        image={studioImages.classes}
        eyebrow="Coreline Studios includes"
        title="Classes & Studio"
        description="Unleash your potential — classical dance, western dance, Shotokan karate, aerobics & Zumba, art & drawing. Take your free trial class today at RR Nagar CELLAR."
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
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ExternalButtonLink
            href={whatsappUrl(waMessages.freeTrial())}
            className="neon-border"
            target="_blank"
            rel="noopener noreferrer"
          >
            Free Trial Class
          </ExternalButtonLink>
          <ButtonLink href="/zumba/book" variant="outline">
            Book a Class
          </ButtonLink>
          <ButtonLink href="/zumba/inquire" variant="ghost">
            Inquire / Call
          </ButtonLink>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="mt-4">
          <h2 className="mb-6 font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
            Programs
          </h2>
          <ZumbaClassCards />
        </div>

        <div className="mt-16">
          <h2 className="mb-6 font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
            Schedule Overview
          </h2>
          <ZumbaScheduleTable />
        </div>
      </section>

      <InstagramStrip
        embeds={embeds.length ? embeds : await getInstagramEmbeds("home")}
        title="Studio on IG"
        accountUrl="https://www.instagram.com/coreline__studios/"
      />
    </div>
  );
}
