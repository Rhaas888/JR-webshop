import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/section";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description: `Privacyverklaring van ${company.name}.`,
};

export default function PrivacyPage() {
  return (
    <Section>
      <SectionHeading kicker="Juridisch" title="Privacyverklaring" />
      <div className="mt-10 max-w-2xl space-y-5 text-lg font-medium leading-8 text-foreground">
        <p>
          {company.name} verwerkt persoonsgegevens alleen om te reageren op je
          aanvraag of review. Dat gaat om naam, e-mailadres, en optioneel
          telefoonnummer, bedrijfsnaam, budget, planning en het bericht dat je
          achterlaat.
        </p>
        <p>
          Offerte- en contactaanvragen bewaren we zolang dat nodig is om het
          gesprek te voeren. Reviews die je instuurt, plaatsen we pas na een
          check. Afgewezen of ongeplaatste reviews verwijderen we.
        </p>
        <p>
          We verkopen je gegevens niet. Ze worden opgeslagen in onze
          projectadministratie (Convex). Je kunt inzage, correctie of
          verwijdering vragen via{" "}
          <a href={`mailto:${company.email}`} className="text-foreground underline">
            {company.email}
          </a>
          .
        </p>
        <p>
          Reviews op deze site komen uit ons eigen systeem. Het zijn geen
          officiële Google-reviews.
        </p>
        <p>
          Heb je een vraag over privacy, mail ons.
        </p>
      </div>
    </Section>
  );
}
