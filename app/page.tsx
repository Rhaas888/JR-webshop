import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { ShowcaseHero } from "@/components/showcase-hero";
import { PricingTable } from "@/components/pricing-table";
import { Process } from "@/components/process";
import { Section, SectionHeading } from "@/components/section";
import { about, prices } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <ShowcaseHero />

      <Section>
        <SectionHeading
          kicker="Diensten"
          title="Webshop of app, verder niets"
          description="We bouwen alleen webshops en apps. Daardoor blijft het ontwerp helder, de prijs duidelijk en de lijnen kort."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <ServiceCard
            title="Webshop laten bouwen"
            price={prices.webshop.label}
            text="Een eigen shop die vertrouwen wekt: producten, checkout, beheer en een ontwerp dat bij je merk past."
            href="/webshop-laten-bouwen"
          />
          <ServiceCard
            title="App laten maken"
            price={prices.app.label}
            text="Software die aansluit op jullie processen. Eerst een werkende versie, daarna verder bouwen waar het waarde heeft."
            href="/app-laten-maken"
          />
        </div>
      </Section>

      <Process />
      <PricingTable />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            kicker="Over ons"
            title={about.title}
            description={about.intro}
          />
          <div>
            {about.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mb-4 text-lg font-medium leading-8 text-foreground last:mb-0"
              >
                {paragraph}
              </p>
            ))}
            <Link
              href="/over-ons"
              className="mt-6 inline-flex text-sm font-medium underline underline-offset-4"
            >
              Meer over JR Intelligence
            </Link>
          </div>
        </div>
      </Section>

      <Faq />
      <CtaBand />
    </>
  );
}

function ServiceCard({
  title,
  price,
  text,
  href,
}: {
  title: string;
  price: string;
  text: string;
  href: string;
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-black/8 p-8">
      <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-base font-semibold text-foreground">{price}</p>
      <p className="mt-4 flex-1 text-base font-medium leading-7 text-foreground">{text}</p>
      <Link
        href={href}
        className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-neutral-800"
      >
        Bekijk deze dienst
      </Link>
    </article>
  );
}
