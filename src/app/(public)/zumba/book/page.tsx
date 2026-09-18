import { Suspense } from "react";
import { ClassBookingForm } from "@/components/forms/class-booking-form";

export const metadata = {
  title: "Book Zumba Class",
  description: "Book a Zumba or dance class. Confirm on WhatsApp — no online payment.",
};

function BookForm({ className }: { className?: string }) {
  return <ClassBookingForm defaultClass={className} />;
}

export default async function ZumbaBookPage({
  searchParams,
}: {
  searchParams: Promise<{ class?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="px-4 py-16 sm:px-6">
      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <BookForm className={params.class} />
      </Suspense>
    </div>
  );
}
