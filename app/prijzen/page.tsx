import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { PricingFocus } from "@/components/pricing-focus";
import { PricingPath } from "@/components/price-factors";
import { PricingSwitcher } from "@/components/pricing-switcher";
import { Section } from "@/components/section";
import { isPricingDienst } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Prijzen",
  description:
    "Kies webshop, app of automatisatie. Daarna zie je wat het kost. Vaste prijs vooraf.",
};

const listCopy = {
  webshop: {
    title: "Webshop",
    lede: "Webshop vanaf €499. Kies een pakket. Wat extra is, zeggen we vooraf.",
  },
  app: {
    title: "App",
    lede: "App vanaf €999. Kies een pakket. Wat extra is, zeggen we vooraf.",
  },
  automatisatie: {
    title: "Automatisatie",
    lede: "We kijken eerst wat je nu met de hand doet. Daarna krijg je een vaste prijs.",
  },
  onderhoud: {
    title: "Onderhoud",
    lede: "Onderhoud vanaf €49 per maand. Niet verplicht. Je kunt elke maand stoppen.",
  },
} as const;

export default async function PrijzenPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const raw = params.dienst;
  const dienst = Array.isArray(raw) ? raw[0] : raw;

  if (!dienst || !isPricingDienst(dienst)) {
    return <PricingFocus />;
  }

  const copy = listCopy[dienst];

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1120px] px-6 pt-14 pb-10 sm:pt-16">
          <p className="text-sm font-semibold tracking-wide text-[#059b60]">Prijzen</p>
          <p className="mt-2.5">
            <Link
              href="/prijzen"
              className="text-sm font-semibold text-[#059b60] no-underline hover:underline"
            >
              Terug naar prijzen
            </Link>
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-pretty sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-foreground">
            {copy.lede}
          </p>
        </div>
      </section>
      <Section tone="muted">
        <PricingSwitcher defaultDienst={dienst} heading={false} hideTabs />
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
