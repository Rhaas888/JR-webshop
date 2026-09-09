import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { LogoTicker } from "@/components/logo-ticker";
import { PageIntro } from "@/components/page-intro";
import { ReviewsBoard } from "@/components/reviews/reviews-board";
import { Section } from "@/components/section";
import { ervaringenPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ervaringen",
  description:
    "Reviews via JR Intelligence. Geen Google-widget. Lees wat opdrachtgevers teruggeven over webshop, app en onderhoud.",
};

export default function ErvaringenPage() {
  return (
    <>
      <PageIntro
        kicker={ervaringenPage.kicker}
        title={ervaringenPage.title}
        description={ervaringenPage.intro}
      />
      <Section>
        <ReviewsBoard showForm />
      </Section>
      <LogoTicker />
      <CtaBand title="Zelf een shop of app laten bouwen?" />
    </>
  );
}
