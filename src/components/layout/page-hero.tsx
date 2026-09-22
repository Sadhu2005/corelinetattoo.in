import Image from "next/image";
import type { ReactNode } from "react";

export function PageHero({
  image,
  eyebrow,
  title,
  description,
  children,
}: {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[42vh] sm:min-h-[48vh]">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f5f6f8] via-[#f5f6f8]/80 to-[#f5f6f8]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f6f8]/90 via-[#f5f6f8]/55 to-transparent" />
      </div>
      <div className="relative z-10 mx-auto -mt-28 max-w-7xl px-4 pb-10 sm:-mt-36 sm:px-6 sm:pb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
        <h1 className="mt-3 font-[family-name:var(--font-bebas)] text-5xl tracking-wide text-foreground sm:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
