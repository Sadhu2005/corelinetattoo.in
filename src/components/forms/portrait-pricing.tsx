import {
  portraitProducts,
  bloodArtNote,
  formatInr,
  siteConfig,
} from "@/lib/constants/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function PortraitPricing() {
  return (
    <div className="mx-auto mb-10 max-w-2xl">
      <Card className="border-primary/20 border-border">
        <CardHeader className="text-center">
          <CardTitle className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
            Portrait Pricing
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Thank you for contacting {siteConfig.name}. All prices below include
            framing or canvas as noted. Courier available across India.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {portraitProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-border bg-card/50 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium">{product.label}</p>
                {product.isBloodArt && (
                  <Badge variant="outline" className="mt-2 border-primary/40 text-primary">
                    5ml blood in purple tube required
                  </Badge>
                )}
              </div>
              <p className="shrink-0 text-sm font-semibold text-primary">
                {product.priceInr ? formatInr(product.priceInr) : "Enquire"}
              </p>
            </div>
          ))}
          <p className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-primary">Blood art note:</span>{" "}
            {bloodArtNote}
          </p>
          <p className="text-center text-xs text-muted-foreground">
            All kinds of creative paintings are done on request.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
