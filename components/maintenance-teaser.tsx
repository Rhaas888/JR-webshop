import Image from "next/image";
import Link from "next/link";
import { maintenance } from "@/lib/content";
import { Section } from "@/components/section";
import { RevealHeading } from "@/components/reveal-heading";

export function MaintenanceTeaser() {
  return (
    <Section tone="muted">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative min-h-[280px] overflow-hidden rounded-[2rem] sm:min-h-[360px]">
          <Image
            src="/images/studio-green.png"
            alt="Rustige studio met donkergroen en beige"
            fill
            quality={100}
            className="object-cover"
            sizes="(min-width: 1024px) 520px, 100vw"
          />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide text-forest">{maintenance.kicker}</p>
          <RevealHeading>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-pretty sm:text-4xl">
              Shop live. Daarna houden we hem bij, als je dat wilt.
            </h2>
          </RevealHeading>
          <p className="mt-4 text-lg font-medium leading-8 text-foreground">
            {maintenance.intro}
          </p>
          <ul className="mt-6 space-y-2 text-base font-medium">
            {maintenance.packages.map((pack) => (
              <li key={pack.id} className="flex items-baseline justify-between gap-4 border-b border-black/8 py-2">
                <span>{pack.name}</span>
                <span className="text-forest">
                  {pack.price}
                  <span className="text-muted-foreground">/{pack.period.replace("per ", "")}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/onderhoud"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-2xl bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-neutral-800"
          >
            Bekijk onderhoud
          </Link>
        </div>
      </div>
    </Section>
  );
}
