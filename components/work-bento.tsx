"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import "./work-bento.css";

const PROOF_META =
  "https://cdn.shopify.com/s/files/1/1073/7549/3457/files/meta-certified-digital-marketing-associate.png?v=1789765533";
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

function InfoLink() {
  return (
    <Link href="/offerte" className="jr-bento__cta">
      Meer informatie
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
        <div className="jr-bento__shell">
          <article className="jr-bento__feature jr-bento__feature--tall jr-bento__feature--design">
            <div className="jr-bento__copy">
              <Icon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
                </svg>
              </Icon>
              <h2>Design en ontwikkeling</h2>
              <p>We maken het ontwerp en bouwen de shop. Op laptop en op telefoon, zodat het eruitziet zoals jij het wilt.</p>
              <InfoLink />
            </div>
            <div className="jr-bento__graphic jr-bento__graphic--design" aria-hidden="true">
              <div className="jr-mac">
                <div className="jr-mac__lid">
                  <div className="jr-mac__bezel">
                    <span className="jr-mac__cam" />
                    <div className="jr-mac__screen">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/shop-desktop.png" alt="" width={1600} height={1000} />
                    </div>
                  </div>
                </div>
                <div className="jr-mac__base" />
              </div>
              <div className="jr-phone">
                <span className="jr-phone__island" />
                <div className="jr-phone__screen">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/shop-mobile.png" alt="" width={800} height={1600} />
                </div>
                <span className="jr-phone__bar" />
              </div>
            </div>
          </article>

          <article className="jr-bento__feature">
            <Icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 18h6M10 21h4" />
                <path d="M12 3a6 6 0 0 0-3.5 10.7c.5.4.8 1 .9 1.6h5.2c.1-.6.4-1.2.9-1.6A6 6 0 0 0 12 3Z" />
              </svg>
            </Icon>
            <h2>Strategie en structuur</h2>
            <p>We beginnen bij wat jij wilt verkopen en wie het moet kopen. Elke pagina heeft een taak.</p>
            <InfoLink />
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
              <InfoLink />
            </div>
            <div className="jr-bento__graphic jr-bento__graphic--growth" aria-hidden="true">
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

        <div className="jr-bento__proof">
          <figure className="jr-bento__proof-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PROOF_META} alt="Meta Certified Digital Marketing Associate" width={416} height={416} />
          </figure>
          <figure className="jr-bento__proof-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PROOF_GIF} alt="Google Digital Champions" width={600} height={250} />
          </figure>
          <figure className="jr-bento__proof-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PROOF_PARTNER} alt="Google Premier Partner 2026" width={152} height={146} />
          </figure>
        </div>
      </div>
    </section>
  );
}
