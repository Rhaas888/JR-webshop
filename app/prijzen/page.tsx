import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { PricingTable } from "@/components/pricing-table";

export const metadata: Metadata = {
  title: "Prijzen",
  description:
    "Vanaf-prijzen voor een webshop (€499) of app (€999) op maat. Vaste offerte voordat we beginnen.",
};

export default function PrijzenPage() {
  return (
    <>
      <PricingTable tone="white" />
      <Faq />
      <CtaBand title="Wil je een gerichte prijs?" />
    </>
  );
}
