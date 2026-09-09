import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { company, contactPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Stel een vraag aan JR Intelligence. We reageren binnen 1 werkdag. Voor een prijsvoorstel gebruik je de offertepagina.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        kicker={contactPage.kicker}
        title={contactPage.title}
        description={contactPage.intro}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <dl className="space-y-4 text-base">
              <div>
                <dt className="font-semibold">E-mail</dt>
                <dd className="mt-1 font-medium text-foreground">
                  <a href={`mailto:${company.email}`} className="hover:underline">
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Reactietijd</dt>
                <dd className="mt-1 font-medium text-foreground">Binnen 1 werkdag</dd>
              </div>
              <div>
                <dt className="font-semibold">Offerte</dt>
                <dd className="mt-1 font-medium text-foreground">
                  Voor een gerichte prijs:{" "}
                  <Link href="/offerte" className="text-forest underline underline-offset-4">
                    offerte aanvragen
                  </Link>
                  .
                </dd>
              </div>
            </dl>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
