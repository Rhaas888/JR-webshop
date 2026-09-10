import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { LogoTicker } from "@/components/logo-ticker";
import { Process } from "@/components/process";
import { ReviewsTeaser } from "@/components/reviews/reviews-board";
import { ShowcaseHero } from "@/components/showcase-hero";
import { Section, SectionHeading } from "@/components/section";
import { appPage, included, prices } from "@/lib/content";

export const metadata: Metadata = {
  title: "App laten maken",
  description:
    "App op maat voor je bedrijf vanaf €999. Eerst een versie die je kunt gebruiken, daarna bouwen we verder.",
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
      <LogoTicker />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] sm:min-h-[460px] lg:order-last">
            <Image
              src="/images/app-desk.png"
              alt="Tablet met een rustig app-dashboard"
              fill
              quality={100}
              className="object-cover"
              sizes="(min-width: 1024px) 520px, 100vw"
            />
          </div>
          <div>
            <SectionHeading
              kicker="Wat je krijgt"
              title={`${prices.app.label} voor een eerste versie die écht werkt`}
            />
            <div className="mt-10 grid gap-6">
              {appPage.points.map((point) => (
                <article key={point.title} className="rounded-3xl border border-black/8 p-6">
                  <h3 className="text-lg font-semibold tracking-tight">{point.title}</h3>
                  <p className="mt-3 text-base font-medium leading-7 text-foreground">{point.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
        <ul className="mt-10 grid gap-3 text-base font-medium text-foreground sm:grid-cols-2">
          {included.app.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-forest" />
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
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-forest" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Process />
      <ReviewsTeaser />
      <Faq />

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeading
            kicker="Offerte"
            title="Wil je een app laten maken?"
            description="Vertel wat de app moet doen. Binnen 1 werkdag hoor je van ons."
          />
          <ContactForm defaultInterest="app" variant="offerte" />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
