import { Phone, Mail, MapPin, Package } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import {
  siteConfig,
  instagramAccounts,
  whatsappUrl,
  courierAddresses,
} from "@/lib/constants/site";
import { ExternalButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Contact",
  description:
    "Contact Ashwath Artist for blood art, portraits & tattoos. WhatsApp, courier to Bengaluru & Hassan.",
};

export default function ContactPage() {
  const waMessage = whatsappUrl(
    `Hi ${siteConfig.name}! Thank you for contacting. I'd like to know more about your artwork.`
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide">
          Get In Touch
        </h1>
        <p className="mt-4 text-muted-foreground">
          Thank you for contacting {siteConfig.name}. Book via WhatsApp or
          courier your reference photos.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/20">
              <Phone className="h-6 w-6 text-[#25D366]" />
            </div>
            <h3 className="mt-4 font-semibold">WhatsApp</h3>
            <p className="mt-2 text-sm text-muted-foreground">Fastest response</p>
            <ExternalButtonLink
              href={waMessage}
              className="mt-4"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
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
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="mt-2 text-sm text-muted-foreground hover:text-primary"
            >
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
              Pan India delivery available
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-center font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
          Courier Addresses
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Send samples, blood tubes, or reference materials to either address
        </p>
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
    </div>
  );
}
