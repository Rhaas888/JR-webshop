import Link from "next/link";
import { included, prices } from "@/lib/content";
import { Section, SectionHeading } from "@/components/section";

export function PricingTable({
  tone = "muted",
}: {
  tone?: "white" | "muted";
}) {
  return (
    <Section tone={tone}>
      <SectionHeading
        kicker="Prijzen"
        title="Duidelijke vanaf-prijzen, offerte op maat"
        description="Geen uurtje-factuurtje. Je krijgt een vaste prijs voordat we beginnen. Onderstaande bedragen zijn het startpunt."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <PriceCard
          title={prices.webshop.title}
          price={prices.webshop.label}
          summary={prices.webshop.summary}
          items={included.webshop}
          href="/webshop-laten-bouwen"
        />
        <PriceCard
          title={prices.app.title}
          price={prices.app.label}
          summary={prices.app.summary}
          items={included.app}
          href="/app-laten-maken"
        />
      </div>
      <p className="mt-6 text-sm font-medium text-foreground">
        Bouwprijs is eenmalig.{" "}
        <Link href="/onderhoud" className="text-forest underline underline-offset-4">
          Maandelijks onderhoud
        </Link>{" "}
        is optioneel, vanaf €49.
      </p>
      <div className="mt-8 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
        <h3 className="text-lg font-semibold tracking-tight">Niet inbegrepen</h3>
        <p className="mt-2 text-base font-medium text-foreground">
          Extra werk nemen we op in de offerte. Denk aan:
        </p>
        <ul className="mt-4 grid gap-2 text-base font-medium text-foreground sm:grid-cols-2">
          {included.extra.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function PriceCard({
  title,
  price,
  summary,
  items,
  href,
}: {
  title: string;
  price: string;
  summary: string;
  items: readonly string[];
  href: string;
}) {
  return (
    <article className="flex flex-col rounded-3xl border border-black/8 bg-white p-8">
      <p className="text-lg font-semibold text-foreground">{title}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight">{price}</p>
      <p className="mt-3 text-base font-medium leading-7 text-foreground">{summary}</p>
      <ul className="mt-8 flex-1 space-y-3 text-base font-medium text-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-forest" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-8 inline-flex h-11 items-center justify-center rounded-2xl border border-black/10 text-sm font-medium transition-colors hover:bg-neutral-50"
      >
        Meer over {title.toLowerCase()}
      </Link>
    </article>
  );
}
