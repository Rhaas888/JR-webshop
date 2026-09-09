import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { LogoTicker } from "@/components/logo-ticker";
import { MaintenanceCards } from "@/components/maintenance-cards";
import { PageIntro } from "@/components/page-intro";
import { Section, SectionHeading } from "@/components/section";
import { faqGroups, maintenance } from "@/lib/content";

export const metadata: Metadata = {
  title: "Onderhoud webshop of app",
  description:
    "Drie onderhoudspakketten voor je webshop of app: Professional €49, Plus €99 en Care €199 per maand. Opzegbaar, niet verplicht.",
};

export default function OnderhoudPage() {
  const onderhoudFaqs = faqGroups.find((group) => group.id === "onderhoud")?.items ?? [];

  return (
    <>
      <PageIntro
        kicker={maintenance.kicker}
        title={maintenance.title}
        description={maintenance.intro}
      />
      <Section>
        <MaintenanceCards />
        <p className="mt-8 max-w-2xl text-sm leading-6 text-muted-foreground">
          {maintenance.note} Twijfel je?{" "}
          <Link href="/contact" className="text-forest underline underline-offset-4">
            Stel een vraag
          </Link>{" "}
          of vraag meteen een{" "}
          <Link href="/offerte?interesse=onderhoud" className="text-forest underline underline-offset-4">
            onderhoudsofferte
          </Link>
          .
        </p>
      </Section>

      <Section tone="muted">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative min-h-[280px] overflow-hidden rounded-[2rem] sm:min-h-[380px]">
            <Image
              src="/images/studio-green.png"
              alt="Onderhoud in een rustige, opgeruimde studio"
              fill
              quality={100}
              className="object-cover"
              sizes="(min-width: 1024px) 520px, 100vw"
            />
          </div>
          <div>
            <SectionHeading
              kicker="Waarom"
              title="Niet omdat het moet. Omdat het stil moet blijven werken."
              description="Updates, backups en kleine wijzigingen stapelen. Een vast bedrag is voorspelbaarder dan losse uurtjes — en je kunt elke maand stoppen."
            />
          </div>
        </div>
      </Section>

      <LogoTicker />
      <Faq items={onderhoudFaqs} />
      <CtaBand title="Onderhoud inplannen?" text="Kies een pakket of beschrijf wat je nodig hebt. We reageren binnen één werkdag." />
    </>
  );
}
