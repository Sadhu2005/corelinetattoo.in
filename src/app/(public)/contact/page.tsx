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
  description: `Contact ${siteConfig.name} for tattoo, art & Zumba. WhatsApp, call, courier addresses.`,
};

export default function ContactPage() {
  const wa = whatsappUrl(waMessages.general());

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide">
          Get In Touch
        </h1>
        <p className="mt-4 text-muted-foreground">
          Book or inquire on WhatsApp. Call if you prefer. No online payments —
          we discuss the next steps together.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <ExternalButtonLink href={wa} className="neon-border" target="_blank" rel="noopener noreferrer">
          <MessageCircle className="mr-2 h-4 w-4" />
          WhatsApp
        </ExternalButtonLink>
        <ExternalButtonLink href={telHref()} variant="outline">
          <Phone className="mr-2 h-4 w-4" />
          Call {siteConfig.phone}
        </ExternalButtonLink>
        <ButtonLink href="/services" variant="ghost">
          Book a service
        </ButtonLink>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/20">
              <MessageCircle className="h-6 w-6 text-[#25D366]" />
            </div>
            <h3 className="mt-4 font-semibold">WhatsApp</h3>
            <p className="mt-2 text-sm text-muted-foreground">Fastest for booking</p>
            <ExternalButtonLink href={wa} className="mt-4" size="sm" target="_blank" rel="noopener noreferrer">
              Chat Now
            </ExternalButtonLink>
          </CardContent>
        </Card>

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
            <Phone className="h-12 w-12 text-primary" />
            <h3 className="mt-4 font-semibold">Phone</h3>
            <a href={telHref()} className="mt-2 text-sm text-muted-foreground hover:text-primary">
              {siteConfig.phone}
            </a>
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

      <div className="mt-12 overflow-hidden rounded-lg border border-border">
        <iframe
          src={siteConfig.googleMapsEmbed}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Studio location"
        />
      </div>
    </div>
  );
}
