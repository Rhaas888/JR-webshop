import { priceFactors, pricingPath } from "@/lib/pricing";
import { hoverCard } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function PriceFactors() {
  return (
    <div>
      <p className="text-sm font-semibold tracking-wide text-forest">Hoe de prijs tot stand komt</p>
      <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-pretty sm:text-4xl">
        Geen verborgen uren. Eerst afspreken, dan bouwen.
      </h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {priceFactors.map((item) => (
          <article
            key={item.title}
            className={cn("rounded-[20px] border border-black/6 bg-white px-6 py-7", hoverCard)}
          >
            <h3 className="text-[15px] font-semibold tracking-tight text-forest">{item.title}</h3>
            <p className="mt-4 text-sm font-medium leading-[1.65] text-muted-foreground">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function PricingPath() {
  return (
    <div>
      <p className="text-sm font-semibold tracking-wide text-forest">Van prijs naar offerte</p>
      <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight">Zo werkt het</h2>
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {pricingPath.map((item) => (
          <li
            key={item.step}
            className={cn("rounded-[20px] border border-black/6 bg-white px-6 py-7", hoverCard)}
          >
            <p className="text-sm font-semibold text-forest">{item.step}</p>
            <h3 className="mt-3 text-lg font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-3 text-sm font-medium leading-6 text-muted-foreground">{item.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
