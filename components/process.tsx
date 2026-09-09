import { processSteps } from "@/lib/content";
import { Section, SectionHeading } from "@/components/section";

export function Process() {
  return (
    <Section>
      <SectionHeading
        kicker="Proces"
        title="Van eerste gesprek tot live, zonder ruis"
        description="Vijf stappen. Je weet steeds waar je aan toe bent: wat we bouwen, wat het kost en wanneer het klaar is."
      />
      <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-black/8 bg-black/8 sm:grid-cols-2 lg:grid-cols-5">
        {processSteps.map((item) => (
          <li key={item.step} className="bg-white p-6 sm:p-7">
            <p className="text-sm font-semibold tracking-widest text-foreground">
              {item.step}
            </p>
            <h3 className="mt-4 text-lg font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="mt-3 text-base font-medium leading-7 text-foreground">
              {item.text}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
