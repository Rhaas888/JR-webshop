import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { LogoTicker } from "@/components/logo-ticker";
import { MaintenanceTeaser } from "@/components/maintenance-teaser";
import { Process } from "@/components/process";
import { ReviewsTeaser } from "@/components/reviews/reviews-board";
import { Section, SectionHeading } from "@/components/section";
import { ShowcaseHero } from "@/components/showcase-hero";
import { TrustStrip } from "@/components/trust-strip";
import { about, prices } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <ShowcaseHero
        primaryHref="/webshop-laten-bouwen"
        primaryLabel="Webshop bouwen"
        secondaryHref="/app-laten-maken"
        secondaryLabel="App bouwen"
      />
      <TrustStrip />
      <LogoTicker />

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
            image="/images/shop-still.png"
            imageAlt="Productstilte voor een rustige webshop"
          />
          <ServiceCard
            title="App laten maken"
            price={prices.app.label}
            text="Software die aansluit op jullie processen. Eerst een werkende versie, daarna verder bouwen waar het waarde heeft."
            href="/app-laten-maken"
            image="/images/app-desk.png"
            imageAlt="Tablet met een overzichtelijk dashboard"
          />
        </div>
      </Section>

      <MaintenanceTeaser />
      <Process />
      <ReviewsTeaser />

      <Section tone="muted">
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
              className="mt-6 inline-flex text-sm font-medium text-forest underline underline-offset-4"
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
  image,
  imageAlt,
}: {
  title: string;
  price: string;
  text: string;
  href: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-black/8">
      <div className="relative aspect-[4/3]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          quality={100}
          className="object-cover"
          sizes="(min-width: 1024px) 520px, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-8">
        <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-base font-semibold text-forest">{price}</p>
        <p className="mt-4 flex-1 text-base font-medium leading-7 text-foreground">{text}</p>
        <Link
          href={href}
          className="mt-8 inline-flex h-11 items-center justify-center rounded-2xl bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-neutral-800"
        >
          Bekijk deze dienst
        </Link>
      </div>
    </article>
  );
}
