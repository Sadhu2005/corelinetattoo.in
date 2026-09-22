import { Phone, Mail, MapPin, Package, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import {
  siteConfig,
  instagramAccounts,
  whatsappUrl,
  waMessages,
  courierAddresses,
  telHref,
} from "@/lib/constants/site";
import { ExternalButtonLink, ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} — tattoo, art, dance, karate & Zumba at RR Nagar CELLAR. WhatsApp, call, free trial.`,
};

export default function ContactPage() {
  const wa = whatsappUrl(waMessages.general());
  const trial = whatsappUrl(waMessages.freeTrial());

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide">
          Get In Touch
        </h1>
        <p className="mt-4 text-muted-foreground">
          RR Nagar CELLAR · Tattoo · Art · Dance · Karate · Aerobics. Book or
          free trial on WhatsApp — no online payments.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <ExternalButtonLink
          href={trial}
          className="neon-border"
          target="_blank"
          rel="noopener noreferrer"
        >
          Free Trial Class
        </ExternalButtonLink>
        <ExternalButtonLink href={wa} variant="outline" target="_blank" rel="noopener noreferrer">
          <MessageCircle className="mr-2 h-4 w-4" />
          WhatsApp
        </ExternalButtonLink>
        <ButtonLink href="/services" variant="ghost">
          Book a service
        </ButtonLink>
      </div>

      <div className="mt-12">
        <h2 className="text-center font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
          Call / WhatsApp
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {siteConfig.phones.map((p) => (
            <Card key={p.number} className="border-border">
              <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                <Phone className="h-8 w-8 text-primary" />
                <a
                  href={telHref(`+91 ${p.number}`)}
                  className="text-lg font-medium hover:text-primary"
                >
                  {p.number}
                </a>
                <ExternalButtonLink
                  href={whatsappUrl(waMessages.general(), p.wa)}
                  size="sm"
                  className="w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </ExternalButtonLink>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Card className="border-border">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <InstagramIcon className="h-12 w-12 text-primary" />
            <h3 className="mt-4 font-semibold">Instagram</h3>
            <div className="mt-2 space-y-1">
              {instagramAccounts.map((a) => (
                <a
                  key={a.handle}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-primary hover:underline"
                >
                  @{a.handle}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <MapPin className="h-12 w-12 text-primary" />
            <h3 className="mt-4 font-semibold">Studio</h3>
            <p className="mt-2 text-sm text-muted-foreground">{siteConfig.address}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-primary">
                {siteConfig.email}
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <Package className="h-12 w-12 text-primary" />
            <h3 className="mt-4 font-semibold">Courier</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Pan India for art orders
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-center font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
          Studio & Courier Addresses
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {courierAddresses.map((addr) => (
            <Card key={addr.city} className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  {addr.city}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{addr.contact}</p>
                <p>{addr.phone}</p>
                {addr.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <div className="mb-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
            Find Us
          </h2>
          <ExternalButtonLink
            href={siteConfig.googleMapsUrl}
            variant="outline"
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Open in Google Maps
          </ExternalButtonLink>
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          <iframe
            src={siteConfig.googleMapsEmbed}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Coreline Studio — RR Nagar CELLAR"
          />
        </div>
      </div>
    </div>
  );
}
