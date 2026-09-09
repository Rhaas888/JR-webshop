import type { ReactNode } from "react";
import { RevealHeading } from "@/components/reveal-heading";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1120px] px-6", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "muted";
}) {
  return (
    <section
      className={cn(
        "py-20 sm:py-24",
        tone === "muted" ? "bg-surface" : "bg-background",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {kicker ? (
        <p className="text-sm font-semibold tracking-wide text-forest">
          {kicker}
        </p>
      ) : null}
      <RevealHeading>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-pretty sm:text-4xl">
          {title}
        </h2>
      </RevealHeading>
      {description ? (
        <p className="mt-4 text-lg font-medium leading-8 text-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
