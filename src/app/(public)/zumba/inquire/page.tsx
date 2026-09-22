import { Suspense } from "react";
import { InquiryForm } from "@/components/forms/inquiry-form";
import type { InquiryInput } from "@/lib/validations/forms";

export const metadata = {
  title: "Inquire",
  description:
    "Ask about tattoo, art, dance, karate, Zumba, or free trial. We reply on WhatsApp or call you.",
};

function InquireInner({
  pillar,
}: {
  pillar?: InquiryInput["service_pillar"];
}) {
  return <InquiryForm defaultPillar={pillar ?? "zumba"} />;
}

export default async function ZumbaInquirePage({
  searchParams,
}: {
  searchParams: Promise<{ pillar?: string }>;
}) {
  const params = await searchParams;
  const pillar =
    params.pillar === "tattoo" ||
    params.pillar === "art" ||
    params.pillar === "zumba" ||
    params.pillar === "general"
      ? params.pillar
      : "zumba";

  return (
    <div className="px-4 py-16 sm:px-6">
      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <InquireInner pillar={pillar} />
      </Suspense>
    </div>
  );
}
