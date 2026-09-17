"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function Count({
  value,
  active,
}: {
  value: number;
  active: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(value);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1100);
      setN(Math.round(value * (1 - (1 - t) ** 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return <>{n}</>;
}

const ctaClass =
  "mt-[22px] inline-flex w-fit items-center gap-2 rounded-full bg-[#f5f5f5] px-3.5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.04em] text-black transition-[background-color,color,transform] duration-200 hover:-translate-y-px hover:bg-[#059b60] hover:text-white";

function WishLink() {
  return (
    <Link href="/offerte" className={ctaClass}>
      Bespreek je wensen
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

function Icon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[#059b60] text-white">
      {children}
    </span>
  );
}

export function WorkBento() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className="bg-[#f5f5f5] px-6 pb-14 pt-2 sm:pb-16"
      aria-label="Hoe we bouwen"
    >
      <div className="mx-auto grid w-full max-w-[1120px] gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <article className="rounded-[28px] border border-black/4 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(5,155,96,0.1)] sm:p-8">
          <Icon>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18h6M10 21h4" />
              <path d="M12 3a6 6 0 0 0-3.5 10.7c.5.4.8 1 .9 1.6h5.2c.1-.6.4-1.2.9-1.6A6 6 0 0 0 12 3Z" />
            </svg>
          </Icon>
          <h2 className="mt-[22px] max-w-[16ch] text-[28px] font-semibold tracking-[-0.03em] leading-[1.15] lg:text-[32px]">
            Strategie en structuur
          </h2>
          <p className="mt-3.5 max-w-[34ch] text-[15px] font-medium leading-[1.65] text-neutral-600">
            We beginnen bij wat jij wilt verkopen en wie het moet kopen. Elke pagina heeft een taak.
          </p>
          <WishLink />
        </article>

        <article className="grid overflow-hidden rounded-[28px] border border-black/4 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(5,155,96,0.1)] sm:p-8 lg:grid-cols-[0.9fr_1fr] lg:gap-6">
          <div>
            <Icon>
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
              </svg>
            </Icon>
            <h2 className="mt-[22px] max-w-[16ch] text-[28px] font-semibold tracking-[-0.03em] leading-[1.15] lg:text-[32px]">
              Design en ontwikkeling
            </h2>
            <p className="mt-3.5 max-w-[34ch] text-[15px] font-medium leading-[1.65] text-neutral-600">
              Een ontwerp dat bij je merk past. Snel, duidelijk, en het werkt op telefoon en laptop.
            </p>
            <WishLink />
          </div>
          <div className="relative mt-6 min-h-[210px] overflow-hidden rounded-3xl bg-[radial-gradient(120%_80%_at_80%_20%,rgba(5,155,96,0.18),transparent_55%),linear-gradient(180deg,#eef7f3,#f5f5f5)] lg:mt-0">
            <div className="absolute top-[18%] left-[8%] w-[58%] max-w-[240px] animate-[jrBentoFloat_5.5s_ease-in-out_infinite] motion-reduce:animate-none">
              <div className="grid min-h-[118px] grid-cols-[0.44fr_0.56fr] overflow-hidden rounded-[18px] bg-white shadow-[0_16px_32px_rgba(0,0,0,0.12)]">
                <span className="bg-black" />
                <span className="flex items-end px-3 pb-4 text-[13px] font-bold leading-tight text-black">
                  Jouw verhaal.
                  <br />
                  Sterk in beeld.
                </span>
              </div>
              <div className="mt-2.5 flex gap-1.5 pl-1">
                <i className="size-2 rounded-full bg-black" />
                <i className="size-2 rounded-full bg-[#059b60]" />
                <i className="size-2 rounded-full bg-neutral-300" />
              </div>
            </div>
            <div className="absolute top-[12%] right-[10%] h-[168px] w-[92px] rounded-[22px] bg-white p-[18px_12px] shadow-[0_18px_36px_rgba(0,0,0,0.14)] animate-[jrBentoFloat_4.8s_ease-in-out_infinite] [animation-delay:400ms] motion-reduce:animate-none">
              <div className="absolute inset-2 rounded-2xl bg-[#059b60]" />
              <p className="relative mt-[18px] text-[13px] font-bold leading-tight text-white">
                Mooi op
                <br />
                elk scherm.
              </p>
            </div>
          </div>
        </article>

        <article className="relative overflow-hidden rounded-[28px] border border-black/4 bg-[radial-gradient(90%_80%_at_10%_80%,rgba(5,155,96,0.16),transparent_58%),#fff] p-[18px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(5,155,96,0.1)]">
          <span className="absolute top-2 right-3 z-10 rounded-full bg-black px-3 py-2 text-xs font-semibold text-white">
            Heldere route
          </span>
          <div className="mx-3 mt-7 mb-5 rounded-[22px] bg-white px-4 py-[18px] shadow-[0_14px_36px_rgba(0,0,0,0.08)]">
            <p className="mb-[18px] text-right text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-400">
              Jouw plan
            </p>
            <div className="flex items-center justify-center gap-2">
              {[
                { n: "01", label: "Doel", className: "border border-neutral-200 bg-white text-black" },
                { n: "02", label: "Structuur", className: "bg-black text-white" },
                { n: "03", label: "Conversie", className: "bg-[#059b60] text-white" },
              ].map((node, index) => (
                <div key={node.n} className="flex items-center gap-2">
                  <span
                    className={`flex size-[84px] flex-col items-center justify-center rounded-full text-[13px] font-bold transition duration-500 ${node.className} ${inView ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
                    style={{ transitionDelay: `${index * 140}ms` }}
                  >
                    <small className="text-[10px] font-semibold opacity-70">{node.n}</small>
                    {node.label}
                  </span>
                  {index < 2 ? (
                    <span
                      className={`h-0.5 w-[18px] origin-left bg-neutral-300 transition duration-500 ${inView ? "scale-x-100" : "scale-x-0"}`}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <span className="absolute bottom-2.5 left-4 rounded-full bg-[#059b60] px-3 py-2 text-xs font-semibold text-white">
            Focus op je klant
          </span>
        </article>

        <article className="grid overflow-hidden rounded-[28px] border border-black/4 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(5,155,96,0.1)] sm:p-8 lg:grid-cols-[0.9fr_1fr] lg:gap-6">
          <div>
            <Icon>
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 12a9 9 0 1 0 9-9" />
                <path d="M3 4v5h5" />
              </svg>
            </Icon>
            <h2 className="mt-[22px] max-w-[18ch] text-[28px] font-semibold tracking-[-0.03em] leading-[1.15] lg:text-[32px]">
              <span className="inline-block rounded-md bg-[#059b60] px-1.5 pb-0.5 text-white">SEO</span>
              , snelheid en groei
            </h2>
            <p className="mt-3.5 max-w-[34ch] text-[15px] font-medium leading-[1.65] text-neutral-600">
              Je shop of app moet te vinden zijn en snel laden. Dat zetten we er vanaf het begin in.
            </p>
            <WishLink />
          </div>
          <div className="relative mt-6 grid gap-3 pt-4 lg:mt-0">
            <span className="absolute top-0 right-0 rounded-full bg-[#059b60] px-3 py-2 text-xs font-semibold text-white">
              Goed vindbaar
            </span>
            <div className="relative min-h-[168px] overflow-hidden rounded-[22px] bg-black text-white">
              <svg className="absolute top-[18px] left-3 size-[132px] -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="48" fill="none" stroke="#1f1f1f" strokeWidth="10" />
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="#059b60"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="301.6"
                  strokeDashoffset={inView ? 12.06 : 301.6}
                  className="transition-[stroke-dashoffset] duration-[1200ms] ease-out motion-reduce:transition-none"
                />
              </svg>
              <div className="absolute top-[58px] left-[150px]">
                <strong className="block text-[22px] font-bold">
                  <Count value={96} active={inView} />/100
                </strong>
                <small className="text-xs text-neutral-400">Performance</small>
              </div>
            </div>
            <div className="rounded-[22px] bg-black px-4 py-4 text-white">
              <div className="flex justify-between gap-3 text-[13px] font-semibold">
                <span>Organische groei</span>
                <strong className="text-[#059b60]">
                  +<Count value={38} active={inView} />%
                </strong>
              </div>
              <div className="mt-3.5 grid h-[72px] grid-cols-6 items-end gap-1.5">
                {[38, 58, 46, 72, 64, 88].map((h, i) => (
                  <span
                    key={h}
                    className="origin-bottom rounded-t-[6px] bg-[#059b60] transition-transform duration-1000 ease-out motion-reduce:transition-none"
                    style={{
                      height: `${h}%`,
                      transform: inView ? "scaleY(1)" : "scaleY(0.08)",
                      transitionDelay: `${50 + i * 60}ms`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[11px] font-medium text-neutral-400">
                <span>SEO</span>
                <span>Snelheid</span>
                <span>Conversie</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
