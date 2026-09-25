import { trustItems } from "@/lib/content";
import "./expect.css";

const icons = [ChatIcon, TagIcon, PenIcon, ShieldIcon];

export function Expect() {
  return (
    <section className="jr-expect" aria-label="Dit kun je van ons verwachten">
      <img
        className="jr-expect__mark"
        src="/images/jr-mark.png"
        alt=""
        width={526}
        height={432}
        aria-hidden="true"
      />
      <div className="jr-expect__wrap">
        <div className="jr-expect__intro">
          <p className="jr-expect__kicker">Samenwerken</p>
          <h2>
            Dit kun je van ons
            <br />
            <span>verwachten</span>
          </h2>
          <p className="jr-expect__lede">
            Je praat met wie het bouwt. Je weet vooraf wat het kost. En wat we maken, blijft van jou.
          </p>
        </div>
        <div className="jr-expect__grid">
          {trustItems.map((item, index) => {
            const Icon = icons[index] ?? ChatIcon;
            return (
              <article key={item.title} className="jr-expect__card">
                <div className="jr-expect__top">
                  <span className="jr-expect__index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="jr-expect__icon" aria-hidden="true">
                    <Icon />
                  </span>
                </div>
                <p className="jr-expect__title">{item.title}</p>
                <p className="jr-expect__text">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 1 1 18 0Z" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.5 3H4v8.5L13.3 20.8a1.5 1.5 0 0 0 2.1 0l5.4-5.4a1.5 1.5 0 0 0 0-2.1L12.5 3Z" />
      <circle cx="7.5" cy="7.5" r="1.2" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 5 6v6c0 5 3.4 8.4 7 9.8 3.6-1.4 7-4.8 7-9.8V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
