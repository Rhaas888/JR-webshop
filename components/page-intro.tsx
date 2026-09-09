import type { ReactNode } from "react";
import { RevealHeading } from "@/components/reveal-heading";
import { Container } from "@/components/section";

export function PageIntro({
  kicker,
  title,
  description,
  children,
}: {
  kicker: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-forest-soft/60">
      <Container className="pt-14 pb-16 sm:pt-16 sm:pb-20">
        <p className="text-sm font-semibold tracking-wide text-forest">{kicker}</p>
        <RevealHeading>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-pretty sm:text-5xl">
            {title}
          </h1>
        </RevealHeading>
        <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-foreground">
          {description}
        </p>
        {children}
      </Container>
    </section>
  );
}
