"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { inquirySchema, type InquiryInput } from "@/lib/validations/forms";
import { siteConfig, servicePillars } from "@/lib/constants/site";
import { submitInquiry } from "@/lib/actions/orders";
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

export function InquiryForm({
  defaultPillar = "general",
}: {
  defaultPillar?: InquiryInput["service_pillar"];
}) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    inquiryNumber: string;
    whatsappLink: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      customer_name: "",
      phone: "",
      email: "",
      service_pillar: defaultPillar,
      message: "",
    },
  });

  function onSubmit(data: InquiryInput) {
    setError(null);
    startTransition(async () => {
      const res = await submitInquiry(data);
      if (res.success) {
        setResult({
          inquiryNumber: res.inquiryNumber,
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
            Inquiry Sent
          </h2>
          <p className="mt-2 text-muted-foreground">
            Ref{" "}
            <span className="font-mono text-primary">{result.inquiryNumber}</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Continue on WhatsApp or wait for a call from {siteConfig.name}.
          </p>
          <ExternalButtonLink
            href={result.whatsappLink}
            className="mt-6 w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open WhatsApp
          </ExternalButtonLink>
          <ButtonLink href="/contact" variant="ghost" className="mt-2">
            Contact page
          </ButtonLink>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-2xl border-border">
      <CardHeader>
        <CardTitle className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
          Inquire / Request a Call
        </CardTitle>
        <CardDescription>
          Ask about tattoo, art, or Zumba. We reply on WhatsApp or call you —
          no online payment.
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
            <Label>About *</Label>
            <Select
              defaultValue={defaultPillar}
              onValueChange={(v) => {
                if (v === "tattoo" || v === "art" || v === "zumba" || v === "general") {
                  form.setValue("service_pillar", v);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select topic" />
              </SelectTrigger>
              <SelectContent>
                {servicePillars.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.title}
                  </SelectItem>
                ))}
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              {...form.register("message")}
              rows={4}
              placeholder="Tell us what you need..."
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
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
