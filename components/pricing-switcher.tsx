"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  compareLabel,
  offerteHref,
  isPricingDienst,
  pricingDiensten,
  type PricingDienst,
} from "@/lib/pricing";
import { hoverBtn, hoverCard, hoverCardFeatured } from "@/lib/ui";

export function PricingSwitcher({
  defaultDienst = "webshop",
  heading = true,
}: {
  defaultDienst?: PricingDienst;
  heading?: boolean;
  tone?: "white" | "muted";
}) {
  return (
    <Suspense fallback={<div className="min-h-[40rem]" />}>
      <PricingSwitcherReady
        defaultDienst={defaultDienst}
        heading={heading}
      />
    </Suspense>
  );
}

function PricingSwitcherReady({
  defaultDienst,
  heading,
}: {
  defaultDienst: PricingDienst;
  heading: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryDienst = searchParams.get("dienst");
  const [activeId, setActiveId] = useState<PricingDienst>(
    isPricingDienst(queryDienst) ? queryDienst : defaultDienst,
  );

  useEffect(() => {
    setActiveId(isPricingDienst(queryDienst) ? queryDienst : defaultDienst);
  }, [defaultDienst, queryDienst]);

  const catalog = useMemo(() => {
    return pricingDiensten.find((item) => item.id === activeId) ?? pricingDiensten[0]!;
  }, [activeId]);

  function selectDienst(id: PricingDienst) {
    setActiveId(id);
    const params = new URLSearchParams(searchParams.toString());
    params.set("dienst", id);
    params.delete("pakket");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div id="prijzen-kiezer" className="scroll-mt-24">
      {heading ? (
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-forest">Prijzen</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-pretty sm:text-4xl">
            Kies een dienst. Daarna een pakket.
          </h2>
          <p className="mt-4 text-lg font-medium leading-8 text-foreground">
            Webshop, app of onderhoud. Je wisselt hier. Onder elke keuze zie je wat erin zit, wat extra is, en hoe je een offerte vraagt.
          </p>
        </div>
      ) : null}

      <div
        className={cn(
          "flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          heading ? "mt-10" : "mt-0",
        )}
        role="tablist"
        aria-label="Kies een dienst"
      >
        {pricingDiensten.map((dienst) => {
          const selected = dienst.id === catalog.id;
          return (
            <button
              key={dienst.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => selectDienst(dienst.id)}
              className={cn(
                "h-11 shrink-0 rounded-2xl px-5 text-sm font-medium",
                hoverBtn,
                selected
                  ? "bg-foreground text-background hover:bg-neutral-800"
                  : "border border-black/10 bg-white text-foreground hover:bg-neutral-50 hover:border-forest/30",
              )}
            >
              {dienst.label}
            </button>
          );
        })}
      </div>

      <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-foreground">
        {catalog.intro}{" "}
        <Link href={catalog.moreHref} className="text-forest underline underline-offset-4">
          {catalog.moreLabel}
        </Link>
        .
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {catalog.packages.map((pack) => (
          <article
            key={pack.id}
            className={cn(
              "flex flex-col rounded-[20px] border p-7 sm:p-8",
              pack.featured
                ? cn("border-forest bg-forest text-white", hoverCardFeatured)
                : cn("border-black/8 bg-white", hoverCard),
            )}
          >
            {pack.featured ? (
              <p className="text-xs font-semibold tracking-widest uppercase text-white/70">
                Meest gekozen
              </p>
            ) : (
              <p className="text-xs font-semibold tracking-widest uppercase text-forest">
                {catalog.label}
              </p>
            )}
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">{pack.name}</h3>
            <p className="mt-4 text-4xl font-semibold tracking-tight">
              {pack.price}
              <span
                className={cn(
                  "ml-2 text-base font-medium",
                  pack.featured ? "text-white/70" : "text-muted-foreground",
                )}
              >
                {pack.period}
              </span>
            </p>
            <p
              className={cn(
                "mt-3 text-base font-medium leading-7",
                pack.featured ? "text-white/85" : "text-foreground",
              )}
            >
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
              href={offerteHref(catalog.offerteInterest, pack.id)}
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

      <div className="mt-14 overflow-hidden rounded-[20px] border border-black/8 bg-white">
        <div className="border-b border-black/8 px-6 py-5 sm:px-8">
          <h3 className="text-lg font-semibold tracking-tight">Wat zit erin</h3>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            Zelfde drie pakketten, naast elkaar. Zo zie je snel het verschil.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-black/8">
                <th className="px-6 py-4 font-semibold sm:px-8">Onderdeel</th>
                {catalog.packages.map((pack) => (
                  <th key={pack.id} className="px-4 py-4 font-semibold">
                    {pack.name}
                    <span className="mt-1 block text-xs font-medium text-muted-foreground">
                      {pack.price}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {catalog.compare.map((row) => (
                <tr key={row.label} className="border-b border-black/6 last:border-0">
                  <td className="px-6 py-3.5 font-medium sm:px-8">{row.label}</td>
                  {row.values.map((value, index) => {
                    const pack = catalog.packages[index];
                    const label = compareLabel(value);
                    const positive = value !== "no";
                    return (
                      <td
                        key={`${row.label}-${pack?.id ?? index}`}
                        className={cn(
                          "px-4 py-3.5 font-medium",
                          positive ? "text-forest" : "text-muted-foreground",
                        )}
                      >
                        {label}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-14">
        <h3 className="text-lg font-semibold tracking-tight">Vragen over deze prijzen</h3>
        <div className="mt-4 border-t border-black/8">
          {catalog.faqs.map((item) => (
            <details key={item.q} className="group border-b border-black/8 py-2">
              <summary className="cursor-pointer list-none py-3 text-base font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span className="mt-1 text-muted-foreground group-open:hidden">+</span>
                  <span className="mt-1 hidden text-muted-foreground group-open:inline">−</span>
                </span>
              </summary>
              <p className="pb-4 text-sm font-medium leading-6 text-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
