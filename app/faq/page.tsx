import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { FaqJsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { faqGroups, faqPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Veelgestelde vragen",
  description:
    "Antwoorden over prijzen, doorlooptijd, webshop, app, onderhoud en samenwerking met JR Intelligence.",
};

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd />
      <PageIntro kicker={faqPage.kicker} title={faqPage.title} description={faqPage.intro} />
      <Section>
        <div className="space-y-14">
          {faqGroups.map((group) => (
            <section key={group.id} id={group.id}>
              <h2 className="text-2xl font-semibold tracking-tight">{group.title}</h2>
              <div className="mt-6 border-t border-black/8">
                {group.items.map((item) => (
                  <details key={item.q} className="group border-b border-black/8 py-2">
                    <summary className="cursor-pointer list-none py-3 text-lg font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                      <span className="flex items-start justify-between gap-4">
                        {item.q}
                        <span className="mt-1 text-muted-foreground group-open:hidden">+</span>
                        <span className="mt-1 hidden text-muted-foreground group-open:inline">−</span>
                      </span>
                    </summary>
                    <p className="pb-4 text-base font-medium leading-7 text-foreground">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-12 text-base font-medium text-foreground">
          Klaar om te starten?{" "}
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
      <CtaBand />
    </>
  );
}
