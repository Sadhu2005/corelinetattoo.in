import { Suspense } from "react";
import { TattooBookingForm } from "@/components/forms/tattoo-booking-form";

export const metadata = {
  title: "Book Tattoo",
  description:
    "Book a tattoo session in Mysore/Karnataka. Choose date, style, size and upload references.",
};

export default function BookTattooPage() {
  return (
    <div className="px-4 py-16 sm:px-6">
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <TattooBookingForm />
      </Suspense>
    </div>
  );
}
