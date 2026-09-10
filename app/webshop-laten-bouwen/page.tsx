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
import { included, prices, webshopPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Webshop laten bouwen",
  description:
    "Webshop op maat vanaf €499. Ontwerp, checkout en beheer. Geen templates.",
};

export default function WebshopPage() {
  return (
    <>
      <ShowcaseHero
        line1="Webshop"
        highlight="laten bouwen"
        line3=""
        description={webshopPage.intro}
        secondaryHref="/prijzen"
        secondaryLabel="Prijzen"
      />
      <LogoTicker />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              kicker="Wat je krijgt"
              title={`${prices.webshop.label} voor een shop die klaar is om te verkopen`}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
              {webshopPage.points.map((point) => (
                <article key={point.title} className="rounded-3xl border border-black/8 p-6">
                  <h3 className="text-lg font-semibold tracking-tight">{point.title}</h3>
                  <p className="mt-3 text-base font-medium leading-7 text-foreground">{point.text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] sm:min-h-[460px]">
            <Image
              src="/images/shop-still.png"
              alt="Rustige productfotografie voor een webshop"
              fill
              quality={100}
              className="object-cover"
              sizes="(min-width: 1024px) 520px, 100vw"
            />
          </div>
        </div>
        <ul className="mt-10 grid gap-3 text-base font-medium text-foreground sm:grid-cols-2">
          {included.webshop.map((item) => (
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
          {webshopPage.forWhom.map((item) => (
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
            title="Wil je een webshop laten bouwen?"
    description: 'Beschrijf kort je assortiment en wat je nu mist. Binnen 1 werkdag hoor je van ons.',
          />
          <ContactForm defaultInterest="webshop" variant="offerte" />
        </div>
      </Section>
      <CtaBand title="Liever eerst de prijzen zien?" />
    </>
  );
}
