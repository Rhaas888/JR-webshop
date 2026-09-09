import { faqs } from "@/lib/content";
import { Section, SectionHeading } from "@/components/section";

export function Faq() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          kicker="Vragen"
          title="Veelgestelde vragen"
          description="Kort en concreet. Staat je vraag er niet bij? Stuur een bericht, we reageren binnen één werkdag."
        />
        <div className="border-t border-black/8">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group border-b border-black/8 py-2"
            >
              <summary className="cursor-pointer list-none py-3 text-lg font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span className="mt-1 text-muted-foreground group-open:hidden">
                    +
                  </span>
                  <span className="mt-1 hidden text-muted-foreground group-open:inline">
                    −
                  </span>
                </span>
              </summary>
              <p className="pb-4 text-base font-medium leading-7 text-foreground">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
