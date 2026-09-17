"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import "./work-bento.css";

const PROOF_GIF =
  "https://cdn.shopify.com/s/files/1/1073/7549/3457/files/google-digital-champions.gif?v=1789670038";
const PROOF_PARTNER =
  "https://cdn.shopify.com/s/files/1/1073/7549/3457/files/google-premier-partner-2026.svg?v=1789670036";

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
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function Count({ value, active }: { value: number; active: boolean }) {
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

function WishLink() {
  return (
    <Link href="/offerte" className="jr-bento__cta">
      Bespreek je wensen
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

function Icon({ children }: { children: ReactNode }) {
  return (
    <span className="jr-bento__icon" aria-hidden="true">
      {children}
    </span>
  );
}

export function WorkBento() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="jr-bento" aria-label="Aanpak en erkenning">
      <div className="jr-bento__bleed">
        <div className="jr-bento__proof">
          <figure className="jr-bento__proof-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/jr-invoice.jpg" alt="JR Intelligence" width={900} height={814} />
          </figure>
          <figure className="jr-bento__proof-card jr-bento__proof-card--gif">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PROOF_GIF} alt="Google Digital Champions" width={600} height={250} />
          </figure>
          <figure className="jr-bento__proof-card jr-bento__proof-card--badge">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PROOF_PARTNER} alt="Google Premier Partner 2026" width={152} height={146} />
          </figure>
        </div>

        <div className="jr-bento__shell">
          <article className="jr-bento__feature jr-bento__feature--tall">
            <Icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 18h6M10 21h4" />
                <path d="M12 3a6 6 0 0 0-3.5 10.7c.5.4.8 1 .9 1.6h5.2c.1-.6.4-1.2.9-1.6A6 6 0 0 0 12 3Z" />
              </svg>
            </Icon>
            <h2>Strategie en structuur</h2>
            <p>We beginnen bij wat jij wilt verkopen en wie het moet kopen. Elke pagina heeft een taak.</p>
            <WishLink />
            <div className="jr-bento__graphic" aria-hidden="true">
              <span className="jr-bento__chip jr-bento__chip--dark">Heldere route</span>
              <div className="jr-bento__window">
                <div className="jr-bento__browserbar">
                  <i />
                  <i />
                  <i />
                  <small>Jouw plan</small>
                </div>
                <div className="jr-bento__nodes">
                  <span className="jr-bento__node jr-bento__node--light">
                    <small>01</small>
                    <strong>Doel</strong>
                  </span>
                  <span className="jr-bento__line">
                    <i />
                  </span>
                  <span className="jr-bento__node jr-bento__node--dark">
                    <small>02</small>
                    <strong>Structuur</strong>
                  </span>
                  <span className="jr-bento__line">
                    <i />
                  </span>
                  <span className="jr-bento__node jr-bento__node--brand">
                    <small>03</small>
                    <strong>Conversie</strong>
                  </span>
                </div>
              </div>
              <span className="jr-bento__chip jr-bento__chip--brand">Focus op je klant</span>
            </div>
          </article>

          <article className="jr-bento__feature jr-bento__feature--design">
            <div className="jr-bento__copy">
              <Icon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
                </svg>
              </Icon>
              <h2>Design en ontwikkeling</h2>
              <p>Een ontwerp dat bij je merk past. Snel, duidelijk, en het werkt op telefoon en laptop.</p>
              <WishLink />
            </div>
            <div className="jr-bento__graphic jr-bento__graphic--design" aria-hidden="true">
              <div className="jr-bento__device jr-bento__device--desktop">
                <div className="jr-bento__device-nav">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="jr-bento__device-hero">
                  <strong>
                    Jouw verhaal.
                    <br />
                    Sterk in beeld.
                  </strong>
                </div>
                <div className="jr-bento__device-cards">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="jr-bento__device jr-bento__device--mobile">
                <div className="jr-bento__mobile-top">
                  <i />
                  <span />
                </div>
                <div className="jr-bento__mobile-hero">
                  <strong>
                    Mooi op
                    <br />
                    elk scherm.
                  </strong>
                </div>
                <div className="jr-bento__mobile-lines">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
          </article>

          <article className="jr-bento__feature jr-bento__feature--growth">
            <div className="jr-bento__copy">
              <Icon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 12a9 9 0 1 0 9-9" />
                  <path d="M3 4v5h5" />
                </svg>
              </Icon>
              <h2>
                <span className="jr-bento__mark">SEO</span>, snelheid en groei
              </h2>
              <p>Je shop of app moet te vinden zijn en snel laden. Dat zetten we er vanaf het begin in.</p>
              <WishLink />
            </div>
            <div className="jr-bento__graphic jr-bento__graphic--growth" aria-hidden="true">
              <span className="jr-bento__chip jr-bento__chip--brand jr-bento__chip--float">Goed vindbaar</span>
              <div className="jr-bento__score">
                <strong>
                  <Count value={96} active={inView} />
                  /100
                </strong>
                <small>Performance</small>
              </div>
              <div className="jr-bento__chart">
                <div className="jr-bento__chart-top">
                  <span>Organische groei</span>
                  <strong>
                    +<Count value={38} active={inView} />%
                  </strong>
                </div>
                <div className="jr-bento__bars">
                  <i style={{ ["--h" as string]: "34%", ["--d" as string]: "0s" }} />
                  <i style={{ ["--h" as string]: "52%", ["--d" as string]: "0.18s" }} />
                  <i style={{ ["--h" as string]: "44%", ["--d" as string]: "0.32s" }} />
                  <i style={{ ["--h" as string]: "68%", ["--d" as string]: "0.46s" }} />
                  <i style={{ ["--h" as string]: "78%", ["--d" as string]: "0.6s" }} />
                  <i style={{ ["--h" as string]: "96%", ["--d" as string]: "0.74s" }} />
                </div>
                <div className="jr-bento__bar-labels">
                  <span>SEO</span>
                  <span>Snelheid</span>
                  <span>Conversie</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
