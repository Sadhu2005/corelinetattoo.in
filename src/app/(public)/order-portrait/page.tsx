import { Suspense } from "react";
import { PortraitOrderForm } from "@/components/forms/portrait-order-form";
import { PortraitPricing } from "@/components/forms/portrait-pricing";

export const metadata = {
  title: "Order Portrait",
  description:
    "Order blood art, pencil sketches & color portraits by Ashwath Artist. A2/A3, couple portraits. Courier across India.",
};

export default function OrderPortraitPage() {
  return (
    <div className="px-4 py-16 sm:px-6">
      <PortraitPricing />
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <PortraitOrderForm />
      </Suspense>
    </div>
  );
}
