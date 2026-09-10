import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { PageIntro } from "@/components/page-intro";
import { Container, Section } from "@/components/section";
import { about, company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "JR Intelligence is een klein team. We bouwen webshops en apps voor Nederlandse bedrijven. Geen templates.",
};

export default function OverOnsPage() {
  return (
    <>
      <PageIntro kicker="Over ons" title={about.title} description={about.intro} />

      <Container className="py-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-surface">
          <div className="relative min-h-[320px] sm:min-h-[460px]">
            <Image
              src="/images/about.jpg"
              alt="Rustige werkplek"
              fill
              quality={100}
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
            <article key={value.title} className="rounded-3xl border border-black/8 p-6">
              <h2 className="text-lg font-semibold tracking-tight">{value.title}</h2>
              <p className="mt-3 text-base font-medium leading-7 text-foreground">{value.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold tracking-wide text-forest">Hoe we werken</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Zo werken we</h2>
            <div className="mt-8 space-y-6">
              {about.howWeWork.map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-base font-medium leading-7 text-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-[2rem] sm:min-h-[380px]">
            <Image
              src="/images/studio-green.png"
              alt="Studio met donkergroen en beige"
              fill
              quality={100}
              className="object-cover"
              sizes="(min-width: 1024px) 520px, 100vw"
            />
          </div>
        </div>
      </Section>

      <Section>
        <p className="text-sm font-semibold tracking-wide text-forest">Wat we niet doen</p>
        <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight">
          Dit doen we niet
        </h2>
        <ul className="mt-8 grid gap-3 text-base font-medium text-foreground sm:grid-cols-2">
          {about.weDont.map((item) => (
            <li key={item} className="rounded-3xl border border-black/8 px-5 py-4">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-base font-medium text-foreground">
          Vragen? Mail{" "}
          <a className="text-forest underline" href={`mailto:${company.email}`}>
            {company.email}
          </a>{" "}
          of ga naar{" "}
          <Link href="/contact" className="text-forest underline underline-offset-4">
            contact
          </Link>
          .
        </p>
      </Section>
      <CtaBand title="Zin om kennis te maken?" />
    </>
  );
}
