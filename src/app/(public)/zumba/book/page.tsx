import { Suspense } from "react";
import { ClassBookingForm } from "@/components/forms/class-booking-form";

export const metadata = {
  title: "Book / Free Trial Class",
  description:
    "Book classical or western dance, Shotokan karate, aerobics & Zumba, or art classes. Free trial — confirm on WhatsApp.",
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
