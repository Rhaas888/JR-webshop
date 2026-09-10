import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { company, offertePage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Offerte aanvragen",
  description:
    "Vraag een prijs aan voor een webshop, app of onderhoud. JR Intelligence reageert binnen 1 werkdag.",
};

export default function OffertePage() {
  return (
    <>
      <PageIntro
        kicker={offertePage.kicker}
        title={offertePage.title}
        description={offertePage.intro}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <ul className="space-y-4 text-base font-medium leading-7 text-foreground">
              <li>Webshop vanaf €499, app vanaf €999.</li>
              <li>Onderhoud vanaf €49 per maand, opzegbaar.</li>
              <li>Vaste offerte voordat we beginnen.</li>
              <li>
                Alleen een vraag? Ga naar{" "}
                <Link href="/contact" className="text-forest underline underline-offset-4">
                  contact
                </Link>
                .
              </li>
            </ul>
            <p className="mt-10 text-sm text-muted-foreground">
              Of mail direct:{" "}
              <a className="underline" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </p>
          </div>
          <ContactForm variant="offerte" />
        </div>
      </Section>
    </>
  );
}
