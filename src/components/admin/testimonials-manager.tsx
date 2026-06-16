"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { addTestimonial, deleteTestimonial } from "@/lib/actions/orders";
import type { Testimonial } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function TestimonialsManager({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [serviceType, setServiceType] = useState("tattoo");

  function handleAdd() {
    if (!name || !review) return;
    startTransition(async () => {
      await addTestimonial({
        customer_name: name,
        review_text: review,
        rating: 5,
        service_type: serviceType,
        featured: true,
      });
      setName("");
      setReview("");
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteTestimonial(id);
    });
  }

  return (
    <div>
      <Card className="border-border mb-8">
        <CardContent className="space-y-4 p-6">
          <h2 className="font-semibold">Add Testimonial</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Customer Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Service Type</Label>
              <Input
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                placeholder="tattoo or portrait"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Review</Label>
            <Textarea value={review} onChange={(e) => setReview(e.target.value)} rows={3} />
          </div>
          <Button onClick={handleAdd} disabled={isPending}>
            Add Review
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <Card key={t.id} className="border-border">
            <CardContent className="flex items-start justify-between p-4">
              <div>
                <p className="font-medium">{t.customer_name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  &ldquo;{t.review_text}&rdquo;
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleDelete(t.id)}
                disabled={isPending}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
