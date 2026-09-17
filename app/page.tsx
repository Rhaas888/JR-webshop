import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { LogoTicker } from "@/components/logo-ticker";
import { PricingSwitcher } from "@/components/pricing-switcher";
import { Process } from "@/components/process";
import { ReviewsTeaser } from "@/components/reviews/reviews-board";
import { Section, SectionHeading } from "@/components/section";
import { ShowcaseHero } from "@/components/showcase-hero";
import { TrustStrip } from "@/components/trust-strip";
import { WorkBento } from "@/components/work-bento";
import { about, prices } from "@/lib/content";
import { hoverBtn, hoverCard, brandFill } from "@/lib/ui";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <ShowcaseHero
        primaryHref="/webshop-laten-bouwen"
        primaryLabel="Webshop"
        secondaryHref="/app-laten-maken"
        secondaryLabel="App"
        secondaryFilled
      />
      <LogoTicker />
      <WorkBento />
      <TrustStrip />

      <Section>
        <SectionHeading
          kicker="Diensten"
          title="Webshop of app, verder niets"
          description="We bouwen webshops en apps. Niks anders. Daardoor blijft de prijs duidelijk en heb je direct contact met ons."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <ServiceCard
            title="Webshop laten bouwen"
            price={prices.webshop.label}
            text="Een eigen shop: producten, checkout, beheer en een ontwerp dat bij je merk past."
            href="/prijzen?dienst=webshop"
            image="/images/shop-still.png"
            imageAlt="Productstilte voor een rustige webshop"
          />
          <ServiceCard
            title="App laten maken"
            price={prices.app.label}
            text="Een app die past bij hoe jij werkt. Eerst een versie die je kunt gebruiken, daarna bouwen we verder."
            href="/prijzen?dienst=app"
            image="/images/app-desk.png"
            imageAlt="Tablet met een overzichtelijk dashboard"
          />
        </div>
      </Section>

      <Section tone="muted">
        <PricingSwitcher heading tone="muted" />
      </Section>

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
              className="mt-6 inline-flex text-sm font-medium text-forest underline underline-offset-4 transition-colors hover:text-foreground"
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
    <article className={cn("group flex flex-col overflow-hidden rounded-3xl border border-black/8 bg-white", hoverCard)}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          quality={100}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
          sizes="(min-width: 1024px) 520px, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-8">
        <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-base font-semibold text-forest">{price}</p>
        <p className="mt-4 flex-1 text-base font-medium leading-7 text-foreground">{text}</p>
        <Link
          href={href}
          className={cn(
            "mt-8 inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-medium",
            brandFill,
            hoverBtn,
          )}
        >
          Bekijk prijzen
        </Link>
      </div>
    </article>
  );
}
