export type PricingDienst = "webshop" | "app" | "onderhoud";

export type CompareValue = "yes" | "no" | "basis" | string;

export type PricingPackage = {
  id: string;
  name: string;
  price: string;
  period: string;
  summary: string;
  features: string[];
  cta: string;
  featured: boolean;
};

export type PricingCatalog = {
  id: PricingDienst;
  label: string;
  intro: string;
  moreHref: string;
  moreLabel: string;
  offerteInterest: PricingDienst;
  packages: PricingPackage[];
  compare: { label: string; values: [CompareValue, CompareValue, CompareValue] }[];
  faqs: { q: string; a: string }[];
};

export const pricingDiensten: PricingCatalog[] = [
  {
    id: "webshop",
    label: "Webshop",
    intro:
      "Een shop die klaar is om te verkopen. Kies hoe groot je wilt beginnen. De prijs hangt af van producten, extra talen en koppelingen.",
    moreHref: "/webshop-laten-bouwen",
    moreLabel: "Meer over webshop",
    offerteInterest: "webshop",
    packages: [
      {
        id: "start",
        name: "Start",
        price: "€499",
        period: "eenmalig",
        summary: "Een eigen shop. Producten, checkout en een ontwerp dat bij je merk past.",
        features: [
          "Ontwerp op maat, geen template",
          "Tot 30 producten",
          "Checkout en iDEAL",
          "Je past zelf producten en teksten aan",
          "Werkt op telefoon, tablet en desktop",
          "We zetten hem live en laten kort zien hoe het werkt",
        ],
        cta: "Kies Start",
        featured: false,
      },
      {
        id: "groei",
        name: "Groei",
        price: "vanaf €1.499",
        period: "eenmalig",
        summary: "Meer producten, extra taal en verzending erbij.",
        features: [
          "Alles uit Start",
          "Onbeperkt producten",
          "Extra taal",
          "Verzendkoppeling",
          "Reviews op de shop",
          "Hulp bij de eerste producten",
        ],
        cta: "Kies Groei",
        featured: true,
      },
      {
        id: "maatwerk",
        name: "Op maat",
        price: "Offerte",
        period: "vaste prijs vooraf",
        summary: "Koppelingen, extra merken, of een grotere shop.",
        features: [
          "Alles uit Groei",
          "Koppeling met boekhouding of voorraad",
          "Extra merken of shops",
          "Extra betaalmethoden",
          "We plannen het samen",
          "Je weet vooraf wat het kost",
        ],
        cta: "Vraag een prijs aan",
        featured: false,
      },
    ],
    compare: [
      { label: "Ontwerp op maat", values: ["yes", "yes", "yes"] },
      { label: "Aantal producten", values: ["Tot 30", "Onbeperkt", "Onbeperkt"] },
      { label: "Checkout en iDEAL", values: ["yes", "yes", "yes"] },
      { label: "Zelf producten beheren", values: ["yes", "yes", "yes"] },
      { label: "Extra taal", values: ["no", "yes", "yes"] },
      { label: "Verzendkoppeling", values: ["basis", "yes", "yes"] },
      { label: "Boekhouding of voorraad", values: ["no", "no", "yes"] },
      { label: "Meerdere merken", values: ["no", "no", "yes"] },
    ],
    faqs: [
      {
        q: "Wat kost een webshop?",
        a: "Start begint bij €499. Groei vanaf €1.499. Heb je koppelingen of extra merken nodig, dan maken we een vaste prijs voordat we beginnen.",
      },
      {
        q: "Waar hangt de prijs van af?",
        a: "Van hoeveel producten je hebt, of je een extra taal wilt, en of we moeten koppelen met boekhouding, voorraad of verzending. Extra’s zetten we in de offerte. Geen verrassingen achteraf.",
      },
      {
        q: "Zit onderhoud in de bouwprijs?",
        a: "De eerste weken na live wel. Kleine fixes horen erbij. Daarna kun je zelf verder, of een maandpakket nemen. Dat is nooit verplicht.",
      },
      {
        q: "Kan ik later omhoog?",
        a: "Ja. We beginnen met wat je nu nodig hebt. Extra’s kunnen later, met een nieuwe vaste prijs.",
      },
    ],
  },
  {
    id: "app",
    label: "App",
    intro:
      "Een app die past bij hoe jij werkt. Eerst een versie die je kunt gebruiken, daarna bouwen we verder als dat nodig is.",
    moreHref: "/app-laten-maken",
    moreLabel: "Meer over app",
    offerteInterest: "app",
    packages: [
      {
        id: "start",
        name: "Start",
        price: "€999",
        period: "eenmalig",
        summary: "De kern van je proces. Een eerste versie die je écht kunt gebruiken.",
        features: [
          "Eerst een gesprek, dan een duidelijk plan",
          "De kern van je proces",
          "Werkt op telefoon, tablet en desktop",
          "Een testversie voor jou en je team",
          "Korte uitleg bij live",
          "Daarna kunnen we verder bouwen",
        ],
        cta: "Kies Start",
        featured: false,
      },
      {
        id: "groei",
        name: "Groei",
        price: "vanaf €1.999",
        period: "eenmalig",
        summary: "Meer schermen, rollen, en een app die het team dagelijks gebruikt.",
        features: [
          "Alles uit Start",
          "Extra schermen en rollen",
          "Inloggen voor je team of klanten",
          "Meldingen",
          "We bouwen door op wat je gebruikt",
          "Je kijkt tussendoor mee",
        ],
        cta: "Kies Groei",
        featured: true,
      },
      {
        id: "maatwerk",
        name: "Op maat",
        price: "Offerte",
        period: "vaste prijs vooraf",
        summary: "Koppelingen, App Store, of een grotere app.",
        features: [
          "Alles uit Groei",
          "Koppeling met je huidige software",
          "App Store of Play Store, als je dat wilt",
          "Meer gebruikers en rechten",
          "We plannen het samen",
          "Je weet vooraf wat het kost",
        ],
        cta: "Vraag een prijs aan",
        featured: false,
      },
    ],
    compare: [
      { label: "Eerste versie die je kunt gebruiken", values: ["yes", "yes", "yes"] },
      { label: "Werkt op telefoon, tablet en desktop", values: ["yes", "yes", "yes"] },
      { label: "Testversie voor je team", values: ["yes", "yes", "yes"] },
      { label: "Extra schermen en rollen", values: ["no", "yes", "yes"] },
      { label: "Inloggen voor klanten", values: ["no", "yes", "yes"] },
      { label: "Koppeling met je software", values: ["no", "basis", "yes"] },
      { label: "App Store of Play Store", values: ["no", "no", "yes"] },
    ],
    faqs: [
      {
        q: "Wat kost een app?",
        a: "Start begint bij €999. Dat is een eerste versie die je kunt gebruiken. Groei vanaf €1.999. Koppelingen of de stores rekenen we apart, vooraf.",
      },
      {
        q: "Waar hangt de prijs van af?",
        a: "Van hoeveel de app moet doen, wie er inlogt, en of we moeten koppelen met software die je al hebt. We beginnen vaak klein, zodat je niet te veel koopt.",
      },
      {
        q: "Krijg ik een app in de stores?",
        a: "Standaard bouwen we een web-app. Die werkt in de browser, op telefoon en desktop. Wil je wél in de App Store of Play Store, dan nemen we dat als extra mee.",
      },
      {
        q: "Wat als ik later meer wil?",
        a: "Dan bouwen we door. Eerst de kern, daarna wat je écht gebruikt. Elke ronde krijgt een vaste prijs.",
      },
    ],
  },
  {
    id: "onderhoud",
    label: "Onderhoud",
    intro:
      "Als je shop of app live is, kun je zelf verder. Wil je dat wij updates en kleine wijzigingen doen? Dan kies je een vast bedrag per maand. Niet verplicht.",
    moreHref: "/onderhoud",
    moreLabel: "Meer over onderhoud",
    offerteInterest: "onderhoud",
    packages: [
      {
        id: "professional",
        name: "Professional",
        price: "€49",
        period: "per maand",
        summary: "Updates, backups en we houden de shop bij.",
        features: [
          "Updates van platform en plugins",
          "Dagelijkse backups",
          "We houden in de gaten of de shop online blijft",
          "Beveiliging en SSL",
          "Eén contactmoment per maand",
        ],
        cta: "Kies Professional",
        featured: false,
      },
      {
        id: "plus",
        name: "Plus",
        price: "€99",
        period: "per maand",
        summary: "Onderhoud plus ruimte voor kleine aanpassingen.",
        features: [
          "Alles uit Professional",
          "2 uur kleine wijzigingen per maand",
          "Maandelijks kort rapport",
          "Voorrang op vragen",
          "Hulp bij content of producten",
        ],
        cta: "Kies Plus",
        featured: true,
      },
      {
        id: "care",
        name: "Care",
        price: "€199",
        period: "per maand",
        summary: "Als je vaker wilt bijsturen, zonder elke keer een nieuwe offerte.",
        features: [
          "Alles uit Plus",
          "6 uur per maand inbegrepen",
          "Voorrang bij storingen",
          "Kwartaalgesprek over wat beter kan",
          "Ruimte in de planning om verder te bouwen",
        ],
        cta: "Kies Care",
        featured: false,
      },
    ],
    compare: [
      { label: "Updates en backups", values: ["yes", "yes", "yes"] },
      { label: "Shop online houden", values: ["yes", "yes", "yes"] },
      { label: "Wijzigingen per maand", values: ["Nee", "2 uur", "6 uur"] },
      { label: "Kort rapport", values: ["no", "yes", "yes"] },
      { label: "Voorrang bij vragen", values: ["no", "yes", "yes"] },
      { label: "Voorrang bij storingen", values: ["no", "no", "yes"] },
      { label: "Maandelijks opzegbaar", values: ["yes", "yes", "yes"] },
    ],
    faqs: [
      {
        q: "Wat kost onderhoud?",
        a: "Professional €49, Plus €99, Care €199 per maand. Je kunt elke maand stoppen. Geen jaarcontract.",
      },
      {
        q: "Moet ik onderhoud nemen?",
        a: "Nee. Na live kun je zelf verder. Onderhoud is er als je wilt dat wij het bijhouden.",
      },
      {
        q: "Wat als ik geen pakket neem?",
        a: "Dan beheer je zelf, of je mailt ons voor los werk. Dat kan.",
      },
      {
        q: "Kan ik later wisselen?",
        a: "Ja. Omhoog, omlaag of stoppen. Maandelijks.",
      },
    ],
  },
];

export const priceFactors = [
  {
    title: "Wat je nodig hebt",
    text: "Een webshop, een app, of allebei. We rekenen alleen wat jij laat bouwen.",
  },
  {
    title: "Wat er extra bij moet",
    text: "Extra taal, koppelingen of merken maken het duurder. Dat zeggen we vooraf.",
  },
  {
    title: "Eerst op papier, dan bouwen",
    text: "Je krijgt een vaste prijs voordat we beginnen. Geen uurtje-factuurtje.",
  },
  {
    title: "Onderhoud is apart",
    text: "Bouwen is eenmalig. Maandpakketten zijn optioneel en opzegbaar.",
  },
];

export const pricingPath = [
  {
    step: "01",
    title: "Kies een dienst",
    text: "Webshop, app of onderhoud. Je wisselt hierboven.",
  },
  {
    step: "02",
    title: "Kies een pakket",
    text: "Start, Groei of Op maat. Twijfel je, kies Start. We zeggen het als je meer nodig hebt.",
  },
  {
    step: "03",
    title: "Wij reageren",
    text: "Binnen 1 werkdag. Daarna een vaste offerte, pas bouwen als jij akkoord bent.",
  },
];

export function isPricingDienst(value: string | null): value is PricingDienst {
  return value === "webshop" || value === "app" || value === "onderhoud";
}

export function getPricingCatalog(id: PricingDienst): PricingCatalog {
  const found = pricingDiensten.find((item) => item.id === id);
  if (!found) {
    throw new Error("Onbekende dienst");
  }
  return found;
}

export function getPackage(dienst: PricingDienst, packageId: string | null) {
  if (!packageId) return null;
  return getPricingCatalog(dienst).packages.find((item) => item.id === packageId) ?? null;
}

export function offerteHref(dienst: PricingDienst, packageId: string, shopify = false) {
  const base = shopify ? "/pages/offerte" : "/offerte";
  return `${base}?interesse=${dienst}&pakket=${packageId}`;
}

export function compareLabel(value: CompareValue): string {
  if (value === "yes") return "Ja";
  if (value === "no") return "Nee";
  if (value === "basis") return "Basis";
  return value;
}
