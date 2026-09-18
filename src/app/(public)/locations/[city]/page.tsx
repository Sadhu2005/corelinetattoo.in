import { ButtonLink } from "@/components/ui/button-link";
import { ExternalButtonLink } from "@/components/ui/button-link";
import {
  siteConfig,
  whatsappUrl,
  waMessages,
  telHref,
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
    title: "Coreline Studio Hassan",
    blurb:
      "Tattoo, custom portraits and Zumba classes in Hassan, Karnataka. Book or inquire on WhatsApp.",
    keywords: "Tattoo Hassan, Zumba Hassan, Portrait Artist Hassan",
  },
  bengaluru: {
    title: "Coreline Studio Bengaluru",
    blurb:
      "Tattoo, drawing & art, and dance fitness — serving Bengaluru with courier for portraits. Book on WhatsApp.",
    keywords: "Tattoo Bengaluru, Zumba Bangalore, Portrait Artist Bengaluru",
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
          href={whatsappUrl(waMessages.general())}
          className="neon-border"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </ExternalButtonLink>
        <ExternalButtonLink href={telHref()} variant="outline">
          Call {siteConfig.phone}
        </ExternalButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Full contact
        </ButtonLink>
      </div>
    </div>
  );
}
