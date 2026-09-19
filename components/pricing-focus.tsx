import Link from "next/link";
import "./pricing-focus.css";

const cards = [
  {
    href: "/prijzen?dienst=webshop",
    title: "Webshop",
    text: "Een shop die verkoopt.",
    tone: "webshop",
  },
  {
    href: "/prijzen?dienst=app",
    title: "App",
    text: "Past bij hoe jij werkt.",
    tone: "app",
  },
  {
    href: "/prijzen?dienst=automatisatie",
    title: "Automatisatie",
    text: "Wat je nu met de hand doet.",
    tone: "auto",
  },
] as const;

export function PricingFocus() {
  return (
    <section className="jr-focus" aria-label="Kies een prijslijst">
      <div className="jr-focus__wrap">
        <div className="jr-focus__intro">
          <h1>Prijzen</h1>
          <p>Kies wat je wilt laten maken</p>
        </div>
        <div className="jr-focus__cards">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`jr-focus__card jr-focus__card--${card.tone}`}
            >
              <span className="jr-focus__media" aria-hidden="true" />
              <span className="jr-focus__overlay" aria-hidden="true" />
              <span className="jr-focus__content">
                <span className="jr-focus__label">{card.title}</span>
                <span className="jr-focus__text">{card.text}</span>
                <span className="jr-focus__hint">Bekijk prijzen</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
