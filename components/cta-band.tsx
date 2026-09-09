import Link from "next/link";
import { Section } from "@/components/section";

export function CtaBand({
  title = "Klaar om te starten?",
  text = "Vertel kort wat je wilt bouwen. We reageren binnen één werkdag met een voorstel of een paar scherpe vragen.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <Section tone="muted">
      <div className="rounded-[2rem] bg-foreground px-8 py-14 text-background sm:px-12">
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-pretty sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/70">{text}</p>
        <Link
          href="/contact"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-sm font-medium text-foreground transition-colors hover:bg-neutral-100"
        >
          Offerte aanvragen
        </Link>
      </div>
    </Section>
  );
}
