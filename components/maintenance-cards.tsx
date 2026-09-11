import Link from "next/link";
import { maintenance } from "@/lib/content";
import { cn } from "@/lib/utils";
import { hoverBtn, hoverCard, hoverCardFeatured } from "@/lib/ui";

export function MaintenanceCards({
  ctaHref = "/offerte",
}: {
  ctaHref?: string;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {maintenance.packages.map((pack) => (
        <article
          key={pack.id}
          className={cn(
            "flex flex-col rounded-3xl border p-7 sm:p-8",
            pack.featured
              ? cn("border-forest bg-forest text-white shadow-[0_18px_40px_rgba(27,61,47,0.18)]", hoverCardFeatured)
              : cn("border-black/8 bg-white", hoverCard),
          )}
        >
          {pack.featured ? (
            <p className="text-xs font-semibold tracking-widest uppercase text-white/70">
              Meest gekozen
            </p>
          ) : null}
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">{pack.name}</h3>
          <p className="mt-4 text-4xl font-semibold tracking-tight">
            {pack.price}
            <span className={cn("ml-2 text-base font-medium", pack.featured ? "text-white/70" : "text-muted-foreground")}>
              {pack.period}
            </span>
          </p>
          <p className={cn("mt-3 text-base font-medium leading-7", pack.featured ? "text-white/85" : "text-foreground")}>
            {pack.summary}
          </p>
          <ul className="mt-6 flex-1 space-y-3 text-sm font-medium">
            {pack.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <span
                  className={cn(
                    "mt-1.5 size-1.5 shrink-0 rounded-full",
                    pack.featured ? "bg-white" : "bg-forest",
                  )}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Link
            href={`${ctaHref}?interesse=onderhoud&pakket=${pack.id}`}
            className={cn(
              "mt-8 inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-medium",
              hoverBtn,
              pack.featured
                ? "bg-white text-forest hover:bg-neutral-100"
                : "bg-foreground text-background hover:bg-neutral-800",
            )}
          >
            {pack.cta}
          </Link>
        </article>
      ))}
    </div>
  );
}
