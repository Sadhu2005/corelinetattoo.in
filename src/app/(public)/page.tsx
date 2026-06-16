import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { RecentWork } from "@/components/home/recent-work";
import { ReviewsTeaser } from "@/components/home/reviews-teaser";
import { InstagramFollow } from "@/components/instagram/instagram-follow";
import { InstagramEmbed } from "@/components/instagram/instagram-embed";
import {
  getSiteStats,
  getFeaturedPortfolio,
  getTestimonials,
  getInstagramEmbeds,
} from "@/lib/data/queries";
import { siteConfig } from "@/lib/constants/site";

export default async function HomePage() {
  const [stats, portfolio, testimonials, instagramEmbeds] = await Promise.all([
    getSiteStats(),
    getFeaturedPortfolio(6),
    getTestimonials(true),
    getInstagramEmbeds(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    name: siteConfig.name,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mysore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    telephone: siteConfig.phone,
    url: siteConfig.url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Stats stats={stats} />
      <RecentWork items={portfolio} />
      {instagramEmbeds.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-center mb-8">
              Latest from Instagram
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {instagramEmbeds.slice(0, 3).map((embed) => (
                <InstagramEmbed
                  key={embed.id}
                  postUrl={embed.post_url}
                  accountHandle={embed.account_handle}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      <ReviewsTeaser testimonials={testimonials} />
      <InstagramFollow />
    </>
  );
}
