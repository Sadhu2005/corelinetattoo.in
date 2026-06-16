import { Star } from "lucide-react";
import { getTestimonials } from "@/lib/data/queries";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Reviews",
  description: "Customer reviews for tattoos and portrait art in Karnataka.",
};

export default async function ReviewsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide">
          Client Reviews
        </h1>
        <p className="mt-4 text-muted-foreground">
          Real feedback from our happy clients
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t.id} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <Badge variant="secondary" className="capitalize">
                  {t.service_type}
                </Badge>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.review_text}&rdquo;
              </p>
              <p className="mt-4 font-medium">{t.customer_name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
