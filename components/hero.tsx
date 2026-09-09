import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/section";

export function Hero({
  kicker,
  title,
  highlight,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  imageSrc,
  imageAlt,
}: {
  kicker?: string;
  title: string;
  highlight?: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  imageSrc: string;
  imageAlt: string;
}) {
  const parts = highlight ? title.split(highlight) : [title];
  const left = parts[0] ?? title;
  const right = parts[1];

  return (
    <Container className="pt-10 pb-8 sm:pt-14">
      <div className="grid overflow-hidden rounded-[2rem] bg-surface lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:py-16">
          {kicker ? (
            <p className="text-base font-semibold text-foreground">{kicker}</p>
          ) : null}
          <h1 className="mt-3 max-w-lg text-4xl font-semibold tracking-tight text-pretty sm:text-5xl">
            {highlight && right !== undefined ? (
              <>
                {left}
                <span className="underline decoration-black decoration-2 underline-offset-[10px]">
                  {highlight}
                </span>
                {right}
              </>
            ) : (
              title
            )}
          </h1>
          <p className="mt-5 max-w-md text-lg font-medium leading-8 text-foreground">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryHref}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-neutral-800"
            >
              {primaryLabel}
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link
                href={secondaryHref}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-black/10 bg-white px-5 text-sm font-medium transition-colors hover:bg-neutral-50"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
        <div className="relative min-h-[260px] lg:min-h-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 520px, 100vw"
          />
        </div>
      </div>
    </Container>
  );
}
