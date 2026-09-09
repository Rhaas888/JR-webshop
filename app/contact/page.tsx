import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Section, SectionHeading } from "@/components/section";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Vraag een offerte aan voor een webshop of app. We reageren binnen 1 werkdag.",
};

export default function ContactPage() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            kicker="Contact"
            title="Vertel wat je wilt laten bouwen"
            description="Geen lang intake-document. Een paar zinnen is genoeg. We reageren binnen 1 werkdag."
          />
          <dl className="mt-10 space-y-4 text-base">
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
          </dl>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
