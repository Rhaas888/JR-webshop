import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { LogoTicker } from "@/components/logo-ticker";
import { MaintenanceCards } from "@/components/maintenance-cards";
import { PageIntro } from "@/components/page-intro";
import { PricingTable } from "@/components/pricing-table";
import { Section, SectionHeading } from "@/components/section";
import { maintenance } from "@/lib/content";

export const metadata: Metadata = {
  title: "Prijzen",
  description:
    "Vanaf-prijzen voor een webshop (€499) of app (€999) op maat. Onderhoud vanaf €49 per maand. Vaste offerte voordat we beginnen.",
};

export default function PrijzenPage() {
  return (
    <>
      <PageIntro
        kicker="Prijzen"
        title="Bouwen eenmalig. Onderhoud alleen als je het wilt."
        description="Webshop vanaf €499, app vanaf €999. Daarna kun je zelf verder, of een maandpakket nemen. Geen verborgen uren."
      />
      <PricingTable tone="white" />
      <Section tone="muted">
        <SectionHeading
          kicker={maintenance.kicker}
          title="Maandelijks onderhoud"
          description={maintenance.intro}
        />
        <div className="mt-12">
          <MaintenanceCards />
        </div>
        <p className="mt-8 text-sm leading-6 text-muted-foreground">
          {maintenance.note}{" "}
          <Link href="/onderhoud" className="text-forest underline underline-offset-4">
            Uitleg per pakket
          </Link>
          .
        </p>
      </Section>
      <LogoTicker />
      <Faq />
      <CtaBand title="Wil je weten wat het kost?" />
    </>
  );
}
