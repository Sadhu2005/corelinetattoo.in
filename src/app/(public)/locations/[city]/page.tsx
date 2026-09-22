import { ButtonLink } from "@/components/ui/button-link";
import { ExternalButtonLink } from "@/components/ui/button-link";
import {
  siteConfig,
  whatsappUrl,
  waMessages,
  servicePillars,
} from "@/lib/constants/site";

export function generateStaticParams() {
  return [{ city: "hassan" }, { city: "bengaluru" }];
}

const cityCopy: Record<
  string,
  { title: string; blurb: string; keywords: string }
> = {
  hassan: {
    title: "Coreline Studio — Hassan Courier",
    blurb:
      "Art courier pickup in Hassan. Studio classes & tattoo at RR Nagar, Bengaluru. Book or inquire on WhatsApp.",
    keywords: "Portrait Courier Hassan, Coreline Hassan, Blood Art Hassan",
  },
  bengaluru: {
    title: "Coreline Studio Bengaluru — RR Nagar",
    blurb:
      "Tattoo, art works, classical & western dance, Shotokan karate, aerobics & Zumba at RR Nagar CELLAR. Free trial class — book on WhatsApp.",
    keywords:
      "Tattoo RR Nagar, Zumba Bangalore, Karate Bengaluru, Dance Classes RR Nagar",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const copy = cityCopy[city] ?? cityCopy.hassan;
  return {
    title: copy.title,
    description: copy.blurb,
    keywords: copy.keywords.split(", "),
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const copy = cityCopy[city] ?? cityCopy.hassan;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs uppercase tracking-[0.25em] text-primary">
        {siteConfig.name}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-bebas)] text-5xl tracking-wide">
        {copy.title}
      </h1>
      <p className="mt-4 text-muted-foreground">{copy.blurb}</p>
      <ul className="mt-8 space-y-3">
        {servicePillars.map((p) => (
          <li key={p.id}>
            <ButtonLink href={p.href} variant="outline" className="w-full justify-start">
              {p.title} — {p.short}
            </ButtonLink>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ExternalButtonLink
          href={whatsappUrl(waMessages.freeTrial())}
          className="neon-border"
          target="_blank"
          rel="noopener noreferrer"
        >
          Free Trial Class
        </ExternalButtonLink>
        <ExternalButtonLink
          href={whatsappUrl(waMessages.general())}
          variant="outline"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </ExternalButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Full contact
        </ButtonLink>
      </div>
    </div>
  );
}
