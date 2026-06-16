import { getTestimonials } from "@/lib/data/queries";
import { TestimonialsManager } from "@/components/admin/testimonials-manager";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide">
        Testimonials
      </h1>
      <p className="mt-2 text-muted-foreground">
        Manage client reviews
      </p>
      <div className="mt-8">
        <TestimonialsManager testimonials={testimonials} />
      </div>
    </div>
  );
}
