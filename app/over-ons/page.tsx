import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { Container, Section } from "@/components/section";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "JR Intelligence is een compacte studio. We bouwen webshops en apps voor Nederlandse bedrijven die iets eigens willen.",
};

export default function OverOnsPage() {
  return (
    <>
      <Container className="pt-14 pb-6">
        <p className="text-base font-semibold text-foreground">Over ons</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-pretty sm:text-5xl">
          {about.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-foreground">
          {about.intro}
        </p>
      </Container>

      <Container className="pb-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-surface">
          <div className="relative min-h-[320px] sm:min-h-[420px]">
            <Image
              src="/images/about.jpg"
              alt="Rustige werkplek"
              fill
              className="object-cover"
              sizes="(min-width: 1120px) 1120px, 100vw"
            />
          </div>
        </div>
      </Container>

      <Section>
        <div className="max-w-2xl space-y-5 text-lg font-medium leading-8 text-foreground">
          {about.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {about.values.map((value) => (
            <article key={value.title} className="rounded-2xl border border-black/8 p-6">
              <h2 className="text-lg font-semibold tracking-tight">{value.title}</h2>
              <p className="mt-3 text-base font-medium leading-7 text-foreground">{value.text}</p>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand title="Zin om kennis te maken?" />
    </>
  );
}
