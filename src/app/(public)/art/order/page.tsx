import { Suspense } from "react";
import { PortraitOrderForm } from "@/components/forms/portrait-order-form";
import { PortraitPricing } from "@/components/forms/portrait-pricing";

export const metadata = {
  title: "Order Portrait",
  description:
    "Order blood art, pencil sketches & color portraits. Confirm on WhatsApp — no online payment.",
};

export default function ArtOrderPage() {
  return (
    <div className="px-4 py-16 sm:px-6">
      <PortraitPricing />
      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <PortraitOrderForm />
      </Suspense>
    </div>
  );
}
