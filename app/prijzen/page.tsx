import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { PriceFactors, PricingPath } from "@/components/price-factors";
import { PricingSwitcher } from "@/components/pricing-switcher";
import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Prijzen",
  description:
    "Webshop vanaf €499, app vanaf €999, onderhoud vanaf €49 per maand. Kies een pakket, vergelijk wat erin zit, en vraag een vaste prijs aan.",
};

export default function PrijzenPage() {
  return (
    <>
      <PageIntro
        kicker="Prijzen"
        title="Je ziet wat het kost. Daarna kies je een pakket."
        description="Webshop vanaf €499, app vanaf €999, onderhoud vanaf €49 per maand. Wissel hieronder. Wat extra is, zeggen we vooraf."
      />
      <Section>
        <PriceFactors />
      </Section>
      <Section tone="muted">
        <PricingSwitcher heading tone="muted" />
      </Section>
      <Section>
        <PricingPath />
        <p className="mt-10 text-base font-medium text-foreground">
          Klaar om te kiezen?{" "}
          <Link href="/offerte" className="text-forest underline underline-offset-4">
            Vraag een offerte
          </Link>{" "}
          of ga naar{" "}
          <Link href="/contact" className="text-forest underline underline-offset-4">
            contact
          </Link>
          .
        </p>
      </Section>
      <CtaBand title="Wil je weten wat het kost?" />
    </>
  );
}
