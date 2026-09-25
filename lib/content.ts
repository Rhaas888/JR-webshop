export const company = {
  name: "JR Intelligence",
  email: "info@jr-intelligence.com",
  url: "https://jr-intelligence.com",
  tagline: "Webshop of app op maat.",
} as const;

export const navLinks = [
  { href: "/webshop-laten-bouwen", label: "Webshop" },
  { href: "/app-laten-maken", label: "App" },
  { href: "/prijzen", label: "Prijzen" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
] as const;

export const extraNavLinks = [
  { href: "/onderhoud", label: "Onderhoud" },
  { href: "/ervaringen", label: "Ervaringen" },
  { href: "/faq", label: "FAQ" },
  { href: "/offerte", label: "Offerte" },
] as const;

export const footerGroups = [
  {
    title: "Diensten",
    links: [
      { href: "/webshop-laten-bouwen", label: "Webshop laten bouwen" },
      { href: "/app-laten-maken", label: "App laten maken" },
      { href: "/onderhoud", label: "Onderhoud" },
      { href: "/prijzen", label: "Prijzen" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/over-ons", label: "Over ons" },
      { href: "/ervaringen", label: "Ervaringen" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;

export const prices = {
  webshop: {
    from: 499,
    label: "vanaf €499",
    title: "Webshop",
    summary: "Een webshop die past bij je merk en klaar is om te verkopen.",
  },
  app: {
    from: 999,
    label: "vanaf €999",
    title: "App",
    summary: "Een app die past bij hoe jij werkt.",
  },
} as const;

export const included = {
  webshop: [
    "Ontwerp op maat, geen template",
    "Producten, checkout en betalingen",
    "Je past zelf producten en teksten aan",
    "Werkt op telefoon, tablet en desktop",
    "Snel, overzichtelijk, vindbaar in Google",
    "We zetten hem live en laten kort zien hoe het werkt",
  ],
  app: [
    "Eerst een gesprek, dan een duidelijk plan",
    "Een eerste versie die je kunt gebruiken",
    "Werkt op telefoon, tablet en desktop",
    "Een testversie voor jou en je team",
    "We zetten hem live, met een korte uitleg",
    "Daarna kunnen we verder bouwen",
  ],
  extra: [
    "Koppelingen met ERP, boekhouding of voorraad",
    "Meerdere talen of extra merken",
    "App Store / Play Store publicatie",
    "Doorlopend onderhoud en doorontwikkeling",
  ],
} as const;

export const processSteps = [
  {
    step: "01",
    title: "Kennismaking",
    text: "We horen wat je wilt, voor wie, en wat er nu al is. Binnen 1 werkdag een reactie.",
  },
  {
    step: "02",
    title: "Concept",
    text: "Je weet wat we bouwen, wat het kost en wanneer het live kan.",
  },
  {
    step: "03",
    title: "Bouwen",
    text: "Je kijkt tussendoor mee. Geen verrassingen achteraf.",
  },
  {
    step: "04",
    title: "Live",
    text: "We testen en zetten hem live. Jij houdt de toegang.",
  },
  {
    step: "05",
    title: "Nazorg",
    text: "Na live blijven we even beschikbaar voor kleine fixes. Daarna onderhoud, als je dat wilt.",
  },
] as const;

export const interestOptions = [
  { value: "webshop", label: "Webshop laten bouwen" },
  { value: "app", label: "App laten maken" },
  { value: "onderhoud", label: "Onderhoud" },
  { value: "automatisatie", label: "Automatisatie" },
  { value: "anders", label: "Iets anders" },
] as const;

export type Interest = (typeof interestOptions)[number]["value"];

export const budgetOptions = [
  { value: "tot-500", label: "Tot €500" },
  { value: "500-1500", label: "€500 tot €1.500" },
  { value: "1500-5000", label: "€1.500 tot €5.000" },
  { value: "onbekend", label: "Nog niet bekend" },
] as const;

export const timelineOptions = [
  { value: "zo-snel-mogelijk", label: "Zo snel mogelijk" },
  { value: "1-2-maanden", label: "Over 1 tot 2 maanden" },
  { value: "3-plus", label: "Over 3 maanden of later" },
  { value: "onbekend", label: "Nog niet bekend" },
] as const;

export const trustItems = [
  {
    title: "Snel contact",
    text: "Binnen 1 werkdag hoor je van ons.",
  },
  {
    title: "Eén duidelijke prijs",
    text: "Vooraf weet je precies waar je aan toe bent.",
  },
  {
    title: "Volledig op maat",
    text: "Geen templates. We bouwen het zoals jij het wilt.",
  },
  {
    title: "Alles blijft van jou",
    text: "Jij houdt de volledige toegang en het eigenaarschap.",
  },
] as const;

export const styleBrands = [
  { name: "Haven", src: "/images/brands/haven.svg" },
  { name: "Kaap", src: "/images/brands/kaap.svg" },
  { name: "Lumen", src: "/images/brands/lumen.svg" },
  { name: "Groenveld", src: "/images/brands/groenveld.svg" },
  { name: "Mist", src: "/images/brands/mist.svg" },
  { name: "Kust", src: "/images/brands/kust.svg" },
  { name: "Atelier", src: "/images/brands/atelier.svg" },
  { name: "Noord", src: "/images/brands/noord.svg" },
] as const;

export const ticker = {
  kicker: "Stijl",
  title: "Shops en apps in deze stijl",
  caption:
    "Zo kunnen shops en apps eruitzien. Dit zijn geen klanten. Echte logo’s zetten we erbij als die er zijn.",
} as const;

export const maintenance = {
  kicker: "Onderhoud",
  title: "Drie pakketten, maandelijks opzegbaar",
  intro:
    "Als je shop live is, kun je zelf verder. Wil je dat wij updates, backups en kleine wijzigingen doen? Dan kies je een vast bedrag per maand. Niet verplicht.",
  note: "De eerste weken na oplevering horen bij de bouw. Onderhoud start pas als je dat wilt.",
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
      name: "Professional Plus",
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
        "Alles uit Professional Plus",
        "6 uur per maand inbegrepen",
        "Voorrang bij storingen",
        "Kwartaalgesprek over wat beter kan",
        "Ruimte in de planning om verder te bouwen",
      ],
      cta: "Kies Care",
      featured: false,
    },
  ],
} as const;

export const faqs = [
  {
    q: "Hoeveel kost een webshop of app?",
    a: "Een webshop start vanaf €499, een app vanaf €999. De prijs hangt af van koppelingen, aantal schermen en hoe bijzonder het moet zijn. Je krijgt altijd een vaste prijs voordat we beginnen.",
    group: "prijzen",
  },
  {
    q: "Hoe lang duurt het?",
    a: "Een overzichtelijke webshop staat vaak in 3 tot 6 weken live. Een eerste versie van een app in 4 tot 8 weken. Grotere koppelingen vragen meer tijd. Dat spreken we vooraf af.",
    group: "proces",
  },
  {
    q: "Krijg ik een native app in de stores?",
    a: "Standaard bouwen we een web-app: één versie, op telefoon, tablet en desktop, zonder store-gedoe. Wil je wél in de App Store of Play Store, dan nemen we dat als extra mee.",
    group: "app",
  },
  {
    q: "Kan ik het zelf beheren?",
    a: "Ja. Bij een webshop pas je zelf producten en teksten aan. Een app krijgt de schermen die jij nodig hebt. Voor dagelijks gebruik heb je geen technische kennis nodig.",
    group: "samenwerking",
  },
  {
    q: "Werken jullie met templates?",
    a: "Nee. We bouwen het zoals jij het wilt. Geen template.",
    group: "samenwerking",
  },
  {
    q: "Wat is mijn rol als opdrachtgever?",
    a: "Jij kent je bedrijf. Wij doen de techniek en het ontwerp. We vragen je op vaste momenten mee te kijken, zodat we snel kunnen bijsturen.",
    group: "samenwerking",
  },
] as const;

export const faqGroups = [
  {
    id: "prijzen",
    title: "Prijzen",
    items: [
      faqs[0],
      {
        q: "Zit onderhoud in de bouwprijs?",
        a: "De eerste weken na live wel. Kleine fixes horen erbij. Daarna kun je zelf verder, of een maandelijks pakket nemen vanaf €49. Onderhoud is nooit verplicht.",
      },
      {
        q: "Hoe werkt betalen?",
        a: "We splitsen de bouw in duidelijke termijnen, bijvoorbeeld start en live. Je betaalt niet in het wilde weg. Onderhoud factureren we maandelijks. Dat kun je opzeggen.",
      },
      {
        q: "Waarom zijn jullie vanaf-prijzen lager dan bij veel bureaus?",
        a: "We zijn een klein team. Geen groot bureau eromheen. De prijs is voor ontwerp en bouw. Koppelingen of extra merken komen erbij. Dat zeggen we vooraf.",
      },
    ],
  },
  {
    id: "proces",
    title: "Proces",
    items: [
      faqs[1],
      {
        q: "Wat gebeurt er na mijn offerte-aanvraag?",
        a: "Binnen 1 werkdag een reactie. Als het past, plannen we een kort gesprek. Daarna een vaste offerte met wat we bouwen, de prijs en de planning. Pas als jij akkoord bent, beginnen we.",
      },
      {
        q: "Kan ik tussentijds meekijken?",
        a: "Ja. Je ziet tussentijdse versies. Niet ineens alles aan het eind.",
      },
    ],
  },
  {
    id: "webshop",
    title: "Webshop",
    items: [
      {
        q: "Bouwen jullie op Shopify of helemaal zelf?",
        a: "We kiezen wat bij jouw shop past. Geen standaard thema dat iedereen herkent. Betalingen, producten en beheer regel je zelf na oplevering.",
      },
      {
        q: "Kan ik later producten of talen toevoegen?",
        a: "Producten en teksten beheer je zelf. Extra talen, merken of zware koppelingen nemen we op in de offerte of in onderhoudsuren.",
      },
    ],
  },
  {
    id: "app",
    title: "App",
    items: [
      faqs[2],
      {
        q: "Wat is die eerste versie precies?",
        a: "De kleinste versie die je in de praktijk kunt gebruiken. Geen dummy. Daarna bouwen we door op wat écht gebruikt wordt, niet op aannames.",
      },
    ],
  },
  {
    id: "onderhoud",
    title: "Onderhoud",
    items: [
      {
        q: "Wat als ik geen pakket neem?",
        a: "Dan beheer je zelf, of je mailt ons voor los werk. Dat kan. We dwingen geen abonnement af.",
      },
      {
        q: "Kan ik van pakket wisselen of stoppen?",
        a: "Ja. Maandelijks opzegbaar, of overstappen naar een ruimer of kleiner pakket. Geen jaarcontract.",
      },
    ],
  },
  {
    id: "samenwerking",
    title: "Samenwerking",
    items: [
      faqs[3],
      faqs[4],
      faqs[5],
      {
        q: "Van wie is de code?",
        a: "Van jou, na betaling. Je krijgt de toegang. Wij sluiten je niet op in een systeem waar je niet uit kunt.",
      },
      {
        q: "Zijn de reviews op deze site van Google?",
        a: "Nee. Het zijn reviews via JR Intelligence. We doen niet alsof het officiële Google-reviews zijn.",
      },
    ],
  },
] as const;

export const webshopPage = {
  title: "Webshop laten bouwen",
  kicker: "Webshop",
  intro:
    "Een webshop die overzichtelijk is, snel laadt en eruitziet alsof hij van jou is. Geen standaard thema.",
  points: [
    {
      title: "Makkelijk bestellen",
      text: "Duidelijke productpagina’s en een rustige checkout. Bezoekers raken niet kwijt.",
    },
    {
      title: "Zelf aanpassen",
      text: "Producten, teksten en foto’s beheer je zelf. Geen ticket voor elke kleine wijziging.",
    },
    {
      title: "Snel en veilig",
      text: "Snel, veilig en vindbaar. Dat hoort er gewoon bij.",
    },
  ],
  forWhom: [
    "Ondernemers die online willen verkopen zonder een rommelige shop",
    "Bedrijven die hun huidige shop willen vervangen",
    "Merken die een eigen look willen, geen herkenbaar template",
  ],
} as const;

export const appPage = {
  title: "App laten maken",
  kicker: "App",
  intro:
    "Standaard software past vaak niet bij hoe jij werkt. Wij maken een app die dat wel doet. Intern, voor klanten, of allebei. Eerst een versie die je kunt gebruiken, daarna bouwen we verder.",
  points: [
    {
      title: "Past bij hoe jij werkt",
      text: "Geen standaard pakket waar jij je omheen moet wringen. De app volgt hoe jij al werkt.",
    },
    {
      title: "Snel een eerste versie",
      text: "We beginnen met de kern. Je kunt hem gebruiken, in plaats van maanden te wachten tot alles ‘af’ is.",
    },
    {
      title: "Eén app, elk apparaat",
      text: "Werkt op telefoon, tablet en desktop. Altijd de laatste versie, zonder App Store gedoe.",
    },
  ],
  forWhom: [
    "Bedrijven die hetzelfde werk steeds opnieuw doen",
    "Teams die Excel, papier of losse tools willen vervangen",
    "Bedrijven die klanten of leveranciers een eigen inlog willen geven",
  ],
} as const;

export const about = {
  title: "Wie we zijn",
  intro:
    "JR Intelligence is een klein team. We bouwen webshops en apps voor Nederlandse bedrijven. Geen templates, gewoon iets dat bij jouw bedrijf past.",
  body: [
    "We maken rustige sites en apps. Geen groot team, geen eindeloze overleggen. Je hebt direct contact met ons, je weet wat het kost, en je kunt het zelf bijhouden.",
    "We zijn nog klein. Geen groot portfolio, wel de tijd voor jou. Als we niet de juiste partij zijn, zeggen we dat gewoon.",
  ],
  howWeWork: [
    {
      title: "Eén aanspreekpunt",
      text: "Je praat met wie het bouwt. Geen extra laag ertussen.",
    },
    {
      title: "Eerst afspreken, dan bouwen",
      text: "We schrijven op wat live gaat, wat het kost en wanneer. Daarna bouwen we.",
    },
    {
      title: "Je kunt het zelf bijhouden",
      text: "Je krijgt toegang en een korte uitleg. Voor een tekstwijziging hoef je niet bij ons aan te kloppen.",
    },
  ],
  weDont: [
    "Marketingcampagnes of advertenties draaien",
    "Maanden vergaderen zonder te bouwen",
    "Een template vermommen als maatwerk",
    "Je vastzetten in een systeem waar je niet uit kunt",
  ],
  values: [
    {
      title: "Overzichtelijk",
      text: "Bezoekers zien meteen wat ze moeten doen. Geen drukke pagina’s.",
    },
    {
      title: "Eerlijk over prijs",
      text: "Vanaf-prijzen op de site, een vaste offerte vooraf. Geen verrassing achteraf.",
    },
    {
      title: "Dichtbij",
      text: "Je praat met wie het bouwt. Vragen verdwijnen niet in een ticketsysteem.",
    },
  ],
} as const;

export const offertePage = {
  kicker: "Offerte",
  title: "Vraag een prijs aan",
  intro:
    "Vertel kort wat je wilt bouwen. Kies een pakket als je dat al weet. We reageren binnen 1 werkdag.",
} as const;

export const contactPage = {
  kicker: "Contact",
  title: "Stel een vraag",
  intro:
    "Twijfel je nog, of wil je eerst even praten? Mail of gebruik het formulier. Voor een prijs is de offertepagina handiger.",
} as const;

export const ervaringenPage = {
  kicker: "Ervaringen",
  title: "Wat klanten zeggen",
  intro:
    "Reviews via ons. Geen Google-widget, geen gekochte sterren.",
  badge: "Reviews via JR Intelligence",
} as const;

export const faqPage = {
  kicker: "FAQ",
  title: "Veelgestelde vragen",
  intro:
    "Prijzen, doorlooptijd, onderhoud en van wie de shop is. Staat je vraag er niet bij, stuur een bericht. We reageren binnen 1 werkdag.",
} as const;

export const homeCopy = {
  servicesTitle: "Webshop of app, verder niets",
  servicesIntro: "We bouwen webshops en apps. Niks anders. Daardoor blijft de prijs duidelijk en heb je direct contact met ons.",
  webshopCard:
    "Een eigen shop: producten, checkout, beheer en een ontwerp dat bij je merk past.",
  appCard:
    "Een app die past bij hoe jij werkt. Eerst een versie die je kunt gebruiken, daarna bouwen we verder.",
  maintenanceTitle: "Shop live. Daarna houden we hem bij, als je dat wilt.",
  processTitle: "Van eerste gesprek tot live",
  processIntro:
    "Vijf stappen. Je weet steeds wat er gebeurt, wat het kost en wanneer het klaar is.",
  footerBlurb: "Webshops en apps op maat. Geen ingewikkeld gedoe.",
  ctaTitle: "Klaar om te starten?",
  ctaText: "Vertel kort wat je wilt bouwen. Binnen 1 werkdag hoor je van ons.",
  pricingTitle: "Je weet vooraf wat het kost",
  pricingIntro:
    "Geen uurtje-factuurtje. Je krijgt een vaste prijs voordat we beginnen. Dit zijn de startprijzen.",
} as const;
