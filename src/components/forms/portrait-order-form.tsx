"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import {
  portraitOrderSchema,
  type PortraitOrderInput,
} from "@/lib/validations/forms";
import {
  portraitProducts,
  bloodArtNote,
  deliveryOptions,
  formatInr,
  siteConfig,
} from "@/lib/constants/site";
import { submitPortraitOrder } from "@/lib/actions/orders";
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

export function PortraitOrderForm() {
  const [isPending, startTransition] = useTransition();
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [result, setResult] = useState<{
    orderNumber: string;
    whatsappLink: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const selectedProduct = portraitProducts.find((p) => p.id === selectedProductId);

  const form = useForm<PortraitOrderInput>({
    resolver: zodResolver(portraitOrderSchema),
    defaultValues: {
      customer_name: "",
      phone: "",
      email: "",
      style: "",
      size: "",
      frame: "",
      delivery_type: "",
      address: "",
      notes: "",
    },
  });

  function handleProductChange(productId: string | null) {
    if (!productId) return;
    setSelectedProductId(productId);
    const product = portraitProducts.find((p) => p.id === productId);
    if (product) {
      form.setValue("style", product.style);
      form.setValue("size", product.size);
      form.setValue("frame", product.frame);
    }
  }

  function onSubmit(data: PortraitOrderInput) {
    if (!selectedProductId) {
      setError("Please select an artwork type");
      return;
    }
    setError(null);
    const formData = new FormData();
    if (file) formData.append("reference_image", file);

    startTransition(async () => {
      const res = await submitPortraitOrder(data, formData);
      if (res.success) {
        setResult({
          orderNumber: res.orderNumber,
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
            Order Received!
          </h2>
          <p className="mt-2 text-muted-foreground">
            Your order number is{" "}
            <span className="font-mono text-primary">{result.orderNumber}</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Thank you for contacting {siteConfig.name}. Confirm on WhatsApp to
            proceed.
          </p>
          <ExternalButtonLink
            href={result.whatsappLink}
            className="mt-6 w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            Confirm on WhatsApp
          </ExternalButtonLink>
          <ButtonLink href="/" variant="ghost" className="mt-2">
            Back to Home
          </ButtonLink>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-2xl border-border">
      <CardHeader>
        <CardTitle className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
          Order a Portrait
        </CardTitle>
        <CardDescription>
          Blood art, pencil sketch & color painting. Upload your reference photo.
          Courier available across India.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customer_name">Full Name *</Label>
              <Input id="customer_name" {...form.register("customer_name")} />
              {form.formState.errors.customer_name && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.customer_name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                {...form.register("phone")}
                placeholder="+91 84949 58165"
              />
              {form.formState.errors.phone && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input id="email" type="email" {...form.register("email")} />
          </div>

          <div className="space-y-2">
            <Label>Select Artwork *</Label>
            <Select onValueChange={handleProductChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose portrait type & size" />
              </SelectTrigger>
              <SelectContent>
                {portraitProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.label}
                    {product.priceInr
                      ? ` — ${formatInr(product.priceInr)}`
                      : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedProduct && (
              <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
                <p className="font-medium text-primary">
                  {selectedProduct.priceInr
                    ? formatInr(selectedProduct.priceInr)
                    : "Price on request"}
                </p>
                {selectedProduct.isBloodArt && (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {bloodArtNote}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Delivery *</Label>
            <Select
              onValueChange={(v) => {
                if (typeof v === "string") form.setValue("delivery_type", v);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select delivery option" />
              </SelectTrigger>
              <SelectContent>
                {deliveryOptions.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Courier / Delivery Address *</Label>
            <Textarea
              id="address"
              {...form.register("address")}
              rows={3}
              placeholder="Your full address for courier delivery"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">Reference Photo *</Label>
            <Input
              id="reference"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...form.register("notes")}
              rows={3}
              placeholder="Any special instructions..."
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Order"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
