import Link from "next/link";
import { Section } from "@/components/section";
import { hoverBtn } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function CtaBand({
  title = "Klaar om te starten?",
  text = "Vertel kort wat je wilt bouwen. Binnen 1 werkdag hoor je van ons.",
  href = "/offerte",
  cta = "Offerte aanvragen",
}: {
  title?: string;
  text?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <Section tone="muted">
      <div className="rounded-[2rem] bg-foreground px-8 py-14 text-background sm:px-12">
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-pretty sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/70">{text}</p>
        <Link
          href={href}
          className={cn(
            "mt-8 inline-flex h-11 items-center justify-center rounded-2xl bg-white px-5 text-sm font-medium text-foreground hover:bg-neutral-100",
            hoverBtn,
          )}
        >
          {cta}
        </Link>
      </div>
    </Section>
  );
}
