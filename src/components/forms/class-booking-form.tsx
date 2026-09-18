"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import {
  classBookingSchema,
  type ClassBookingInput,
} from "@/lib/validations/forms";
import { classTypes, timeSlots, siteConfig } from "@/lib/constants/site";
import { submitClassBooking } from "@/lib/actions/orders";
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

export function ClassBookingForm({
  defaultClass,
}: {
  defaultClass?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    bookingNumber: string;
    whatsappLink: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ClassBookingInput>({
    resolver: zodResolver(classBookingSchema),
    defaultValues: {
      customer_name: "",
      phone: "",
      email: "",
      class_type: defaultClass ?? "",
      preferred_date: "",
      preferred_time: "",
      notes: "",
    },
  });

  function onSubmit(data: ClassBookingInput) {
    setError(null);
    startTransition(async () => {
      const res = await submitClassBooking(data);
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
            Class Request Received
          </h2>
          <p className="mt-2 text-muted-foreground">
            Ref{" "}
            <span className="font-mono text-primary">{result.bookingNumber}</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Confirm on WhatsApp — fees & seat finalized there. No online payment.
          </p>
          <ExternalButtonLink
            href={result.whatsappLink}
            className="mt-6 w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            Confirm on WhatsApp
          </ExternalButtonLink>
          <ButtonLink href="/zumba" variant="ghost" className="mt-2">
            Back to Zumba
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
          Book a Class
        </CardTitle>
        <CardDescription>
          Zumba & dance at {siteConfig.name}. We confirm fees and timing on
          WhatsApp — no checkout on this site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
          <div className="space-y-2">
            <Label>Class *</Label>
            <Select
              defaultValue={defaultClass}
              onValueChange={(v) => {
                if (typeof v === "string") form.setValue("class_type", v);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classTypes.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              <Label>Time *</Label>
              <Select
                onValueChange={(v) => {
                  if (typeof v === "string") form.setValue("preferred_time", v);
                }}
              >
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
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" {...form.register("notes")} rows={3} />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit & Open WhatsApp"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
