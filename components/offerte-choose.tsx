"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { pricingDiensten } from "@/lib/pricing";
import { hoverCard } from "@/lib/ui";

export function OfferteChoose() {
  return (
    <Suspense fallback={<OfferteChooseCards chosen={null} />}>
      <OfferteChooseReady />
    </Suspense>
  );
}

function OfferteChooseReady() {
  const searchParams = useSearchParams();
  return <OfferteChooseCards chosen={searchParams.get("interesse")} />;
}

function OfferteChooseCards({ chosen }: { chosen: string | null }) {
  return (
    <div>
      <p className="text-sm font-semibold tracking-wide text-forest">Waarvoor</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">Kies eerst wat je wilt</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {pricingDiensten.map((dienst) => (
          <Link
            key={dienst.id}
            href={`/offerte?interesse=${dienst.id}#offerte-form`}
            className={cn(
              "rounded-[20px] border bg-white p-6",
              hoverCard,
              chosen === dienst.id ? "border-forest/30" : "border-black/8",
            )}
          >
            <p className="text-lg font-semibold tracking-tight">{dienst.label}</p>
            <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">
              {dienst.id === "onderhoud"
                ? `Vanaf ${dienst.packages[0]?.price} per maand`
                : dienst.packages[0]?.price === "Offerte"
                  ? "Vaste prijs vooraf"
                  : `Vanaf ${dienst.packages[0]?.price}`}
            </p>
            <p className="mt-3 text-sm font-medium text-forest">Kies {dienst.label.toLowerCase()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
