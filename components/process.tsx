"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { processSteps } from "@/lib/content";
import { RevealHeading } from "@/components/reveal-heading";
import { Section } from "@/components/section";
import { cn } from "@/lib/utils";

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function update() {
      if (media.matches) {
        setProgress(1);
        setActive(processSteps.length - 1);
        return;
      }

      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.28;
      const distance = Math.max(rect.height - viewport * 0.36, 1);
      const raw = (start - rect.top) / distance;
      const next = Math.min(1, Math.max(0, raw));
      setProgress(next);
      setActive(
        Math.min(
          processSteps.length - 1,
          Math.floor(next * processSteps.length + 0.01),
        ),
      );
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const frame = window.requestAnimationFrame(update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <Section>
      <div className="max-w-2xl">
        <p className="text-sm font-semibold tracking-wide text-forest">Proces</p>
        <RevealHeading>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-pretty sm:text-4xl">
            Van eerste gesprek tot live
          </h2>
        </RevealHeading>
        <p className="mt-4 text-lg font-medium leading-8 text-foreground">
          Scroll mee. De raket gaat langs vijf vaste punten. Je weet steeds wat er gebeurt, wat het kost en wanneer het klaar is.
        </p>
      </div>

      <div ref={trackRef} className="relative mt-14 grid gap-10 lg:grid-cols-[88px_1fr]">
        <div className="relative mx-auto hidden h-full min-h-[28rem] w-14 lg:block">
          <div className="absolute top-2 bottom-2 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-forest-soft" />
          <div
            className="absolute top-2 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-forest"
            style={{ height: `calc(${progress * 100}% - 8px)` }}
          />
          <div
            className="absolute left-1/2 z-10 -translate-x-1/2 transition-[top] duration-75 ease-linear motion-reduce:transition-none"
            style={{ top: `calc(${progress * 100}% - 40px)` }}
          >
            <img
              src="/images/process-rocket.png"
              alt=""
              width={52}
              height={160}
              aria-hidden="true"
              className="h-auto w-7 drop-shadow-[0_6px_10px_rgba(27,61,47,0.28)]"
            />
          </div>
        </div>

        <ol className="space-y-4">
          {processSteps.map((item, index) => {
            const isLive = index === processSteps.length - 1;
            return (
              <li
                key={item.step}
                className={cn(
                  "rounded-3xl border p-6 transition-colors sm:p-7",
                  index <= active
                    ? "border-forest/25 bg-forest-soft/50"
                    : "border-black/8 bg-white",
                )}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={cn(
                      "mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                      index <= active
                        ? "bg-forest text-white"
                        : "bg-neutral-100 text-foreground",
                    )}
                  >
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-base font-medium leading-7 text-foreground">
                      {item.text}
                    </p>
                    {isLive ? (
                      <Link
                        href="/onderhoud"
                        className="mt-3 inline-flex text-sm font-medium text-forest underline underline-offset-4"
                      >
                        Daarna optioneel onderhoud
                      </Link>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
