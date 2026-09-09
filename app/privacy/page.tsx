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
          aanvraag. Dat gaat om naam, e-mailadres, en optioneel telefoonnummer,
          bedrijfsnaam en het bericht dat je achterlaat.
        </p>
        <p>
          We bewaren aanvragen zolang dat nodig is om het gesprek te voeren,
          daarna verwijderen we ze of bewaren we ze alleen als daar een
          overeenkomst uit volgt.
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
          Deze pagina is een beknopte verklaring voor de eerste versie van de
          site. Heb je een vraag over privacy, mail ons.
        </p>
      </div>
    </Section>
  );
}
