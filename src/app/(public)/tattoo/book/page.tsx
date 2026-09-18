import { Suspense } from "react";
import { TattooBookingForm } from "@/components/forms/tattoo-booking-form";

export const metadata = {
  title: "Book Tattoo",
  description: "Book a tattoo session. Confirm details on WhatsApp — no online payment.",
};

export default function TattooBookPage() {
  return (
    <div className="px-4 py-16 sm:px-6">
      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <TattooBookingForm />
      </Suspense>
    </div>
  );
}
