import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { hoverBtn } from "@/lib/ui";
import { cn } from "@/lib/utils";

const filledButtonClass = cn(
  "inline-flex h-[52px] min-w-[8.5rem] items-center justify-center rounded-2xl bg-foreground px-7 text-base font-medium text-background hover:bg-neutral-800",
  hoverBtn,
);
const ghostButtonClass = cn(
  "inline-flex h-[52px] min-w-[8.5rem] items-center justify-center rounded-2xl border border-black/10 bg-white px-7 text-base font-medium hover:bg-neutral-50 hover:border-forest/30",
  hoverBtn,
);

export function ShowcaseHero({
  line1 = "Webshop of app",
  highlight = "op maat",
  line3 = "voor jouw bedrijf",
  description = (
    <>
      Jouw bedrijf is uniek. Je webshop mag dat ook zijn.
      <br />
      Webshops en apps volledig op maat.
    </>
  ),
  primaryHref = "/offerte",
  primaryLabel = "Offerte aanvragen",
  secondaryHref,
  secondaryLabel,
  secondaryFilled = false,
}: {
  line1?: string;
  highlight?: string;
  line3?: string;
  description?: ReactNode;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryFilled?: boolean;
}) {
  return (
    <section className="relative min-h-[calc(100vh-4.5rem)] overflow-hidden bg-[#f2f2f2]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero-collage.png"
          alt=""
          fill
          priority
          className="object-cover grayscale contrast-95"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.9)_36%,rgba(242,242,242,0.96)_68%,#f2f2f2_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4.5rem)] w-full max-w-[1120px] flex-col px-6 pt-16 sm:pt-[5.5rem] lg:pt-[6.5rem]">
        <div className="mx-auto max-w-[38rem] text-center">
          <h1 className="mx-auto max-w-[12em] text-[clamp(2.5rem,5.8vw,4.25rem)] font-bold tracking-[-0.03em] leading-[1.45]">
            {line1}
            <br />
            <span className="relative inline-block whitespace-nowrap">
              {highlight.replaceAll(" ", "\u00a0")}
              <img
                src="/images/underline-scratch.png?v=exact"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute top-[0.82em] left-[-3%] w-[112%] select-none"
              />
            </span>
            {line3 ? (
              <>
                <br />
                {line3}
              </>
            ) : null}
          </h1>
          <p className="mx-auto mt-10 max-w-[34rem] text-base leading-[1.85] tracking-[0.01em] text-muted-foreground sm:text-[17px]">
            {description}
          </p>
          <div className="mt-11 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Link href={primaryHref} className={filledButtonClass}>
              {primaryLabel}
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link
                href={secondaryHref}
                className={secondaryFilled ? filledButtonClass : ghostButtonClass}
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="mt-auto pt-12">
          <Image
            src="/images/hero-devices.png"
            alt="Webshop en app op laptop, telefoon en iPad"
            width={1920}
            height={1080}
            quality={100}
            priority
            sizes="(max-width: 1120px) 100vw, 1200px"
            className="mx-auto mb-[-4%] w-[min(1200px,118%)] max-w-none drop-shadow-[0_28px_48px_rgba(0,0,0,0.16)]"
          />
        </div>
      </div>
    </section>
  );
}
