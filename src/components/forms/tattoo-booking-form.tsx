"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";
import {
  tattooBookingSchema,
  type TattooBookingInput,
} from "@/lib/validations/forms";
import { tattooSizes, tattooStyles, timeSlots } from "@/lib/constants/site";
import { submitTattooBooking } from "@/lib/actions/orders";
import { ExternalButtonLink, ButtonLink } from "@/components/ui/button-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TattooBookingForm() {
  const searchParams = useSearchParams();
  const preselectedStyle = searchParams.get("style") ?? "";
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    bookingNumber: string;
    whatsappLink: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<TattooBookingInput>({
    resolver: zodResolver(tattooBookingSchema),
    defaultValues: {
      customer_name: "",
      phone: "",
      email: "",
      preferred_date: "",
      preferred_time: "",
      body_placement: "",
      size: "",
      style: preselectedStyle,
      notes: "",
    },
  });

  function onSubmit(data: TattooBookingInput) {
    setError(null);
    const formData = new FormData();
    if (file) formData.append("reference_image", file);

    startTransition(async () => {
      const res = await submitTattooBooking(data, formData);
      if (res.success) {
        setResult({
          bookingNumber: res.bookingNumber,
          whatsappLink: res.whatsappLink,
        });
      } else {
        setError(res.error ?? "Something went wrong");
      }
    });
  }

  if (result) {
    return (
      <Card className="mx-auto max-w-lg border-primary/30 neon-border">
        <CardContent className="flex flex-col items-center p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-primary" />
          <h2 className="mt-4 font-[family-name:var(--font-bebas)] text-3xl">
            Booking Received!
          </h2>
          <p className="mt-2 text-muted-foreground">
            Your booking number is{" "}
            <span className="font-mono text-primary">{result.bookingNumber}</span>
          </p>
          <ExternalButtonLink href={result.whatsappLink} className="mt-6 w-full" target="_blank" rel="noopener noreferrer">
            Confirm on WhatsApp
          </ExternalButtonLink>
          <ButtonLink href="/" variant="ghost" className="mt-2">
            Back to Home
          </ButtonLink>
        </CardContent>
      </Card>
    );
  }

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <Card className="mx-auto max-w-2xl border-border">
      <CardHeader>
        <CardTitle className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
          Book a Tattoo Session
        </CardTitle>
        <CardDescription>
          Choose your date, style, and upload reference images.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customer_name">Full Name *</Label>
              <Input id="customer_name" {...form.register("customer_name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" {...form.register("phone")} placeholder="+91..." />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input id="email" type="email" {...form.register("email")} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="preferred_date">Preferred Date *</Label>
              <Input
                id="preferred_date"
                type="date"
                min={minDate}
                {...form.register("preferred_date")}
              />
            </div>
            <div className="space-y-2">
              <Label>Time Slot *</Label>
              <Select onValueChange={(v) => { if (typeof v === "string") form.setValue("preferred_time", v); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="body_placement">Body Placement *</Label>
            <Input
              id="body_placement"
              {...form.register("body_placement")}
              placeholder="e.g. Left forearm, upper back..."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Tattoo Size *</Label>
              <Select onValueChange={(v) => { if (typeof v === "string") form.setValue("size", v); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {tattooSizes.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tattoo Style *</Label>
              <Select
                defaultValue={preselectedStyle}
                onValueChange={(v) => { if (typeof v === "string") form.setValue("style", v); }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {tattooStyles.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">Reference Image</Label>
            <Input
              id="reference"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" {...form.register("notes")} rows={3} />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Booking...
              </>
            ) : (
              "Book Session"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
