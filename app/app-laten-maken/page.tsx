import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { Process } from "@/components/process";
import { ShowcaseHero } from "@/components/showcase-hero";
import { Section, SectionHeading } from "@/components/section";
import { appPage, included, prices } from "@/lib/content";

export const metadata: Metadata = {
  title: "App laten maken",
  description:
    "App op maat voor je bedrijf vanaf €999. Web-app of PWA, eerste werkende versie, daarna doorontwikkelen.",
};

export default function AppPage() {
  return (
    <>
      <ShowcaseHero
        line1="App"
        highlight="laten maken"
        line3=""
        description={appPage.intro}
        secondaryHref="/prijzen"
        secondaryLabel="Prijzen"
      />

      <Section>
        <SectionHeading
          kicker="Wat je krijgt"
          title={`${prices.app.label} voor een eerste versie die écht werkt`}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {appPage.points.map((point) => (
            <article key={point.title} className="rounded-2xl border border-black/8 p-6">
              <h3 className="text-lg font-semibold tracking-tight">{point.title}</h3>
              <p className="mt-3 text-base font-medium leading-7 text-foreground">{point.text}</p>
            </article>
          ))}
        </div>
        <ul className="mt-10 grid gap-3 text-base font-medium text-foreground sm:grid-cols-2">
          {included.app.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <SectionHeading kicker="Voor wie" title="Dit past als je..." />
        <ul className="mt-10 space-y-4 text-lg font-medium leading-8 text-foreground">
          {appPage.forWhom.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-foreground" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Process />
      <Faq />

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeading
            kicker="Contact"
            title="Wil je een app laten maken?"
            description="Vertel welk proces je wilt vereenvoudigen. We reageren binnen 1 werkdag."
          />
          <ContactForm defaultInterest="app" />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
