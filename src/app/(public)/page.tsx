import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { ServicesGrid } from "@/components/home/services-grid";
import { RecentWork } from "@/components/home/recent-work";
import { ReviewsTeaser } from "@/components/home/reviews-teaser";
import { InstagramFollow } from "@/components/instagram/instagram-follow";
import { InstagramStrip } from "@/components/instagram/instagram-strip";
import {
  getSiteStats,
  getFeaturedPortfolio,
  getTestimonials,
  getInstagramEmbeds,
} from "@/lib/data/queries";
import { siteConfig, whatsappUrl, waMessages } from "@/lib/constants/site";
import { ExternalButtonLink, ButtonLink } from "@/components/ui/button-link";

export default async function HomePage() {
  const [stats, portfolio, testimonials, instagramEmbeds] = await Promise.all([
    getSiteStats(),
    getFeaturedPortfolio(6),
    getTestimonials(true),
    getInstagramEmbeds("home"),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: "'ALPHA', Kenchena Halli Main Road, BEML 5th Stage",
      addressLocality: "RR Nagar, Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Stats stats={stats} />
      <ServicesGrid />
      <InstagramStrip embeds={instagramEmbeds} title="Studio Reels" />
      <RecentWork items={portfolio} />
      <ReviewsTeaser testimonials={testimonials} />
      <section className="relative overflow-hidden border-t border-border py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#fdecef]/40 to-[#e8eaef]/60" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide">
            Take Your Free Trial Class Today
          </h2>
          <p className="mt-3 text-muted-foreground">
            Or book tattoo & art on WhatsApp. Fees, blood art, and class
            timings confirmed there — no online payment.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <ExternalButtonLink
              href={whatsappUrl(waMessages.freeTrial())}
              className="neon-border"
              target="_blank"
              rel="noopener noreferrer"
            >
              Free Trial Class
            </ExternalButtonLink>
            <ButtonLink href="/services" variant="outline">
              Browse Services
            </ButtonLink>
          </div>
        </div>
      </section>
      <InstagramFollow />
    </>
  );
}
