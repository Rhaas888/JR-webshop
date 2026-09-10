export const company = {
  name: "JR Intelligence",
  email: "info@jr-intelligence.com",
  url: "https://jr-intelligence.com",
  tagline: "Webshop of app op maat, zonder ruis.",
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
    summary: "Een strakke webshop die past bij je merk en klaar is om te verkopen.",
  },
  app: {
    from: 999,
    label: "vanaf €999",
    title: "App",
    summary: "Een web-app of PWA die aansluit op hoe jullie écht werken.",
  },
} as const;

export const included = {
  webshop: [
    "Ontwerp op maat, geen template",
    "Producten, checkout en betalingen",
    "Zelf beheerbaar CMS",
    "Responsive op telefoon, tablet en desktop",
    "SEO-basis: snelheid, structuur, metadata",
    "Oplevering en korte inwerkperiode",
  ],
  app: [
    "Kennismaking en scherp concept",
    "Eerste werkende versie (MVP)",
    "Web-app of PWA, bruikbaar op elk apparaat",
    "Testomgeving voor jullie team",
    "Oplevering met korte handleiding",
    "Ruimte voor doorontwikkeling na livegang",
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
    text: "We horen wat je wilt bereiken, voor wie, en wat er nu al is. Binnen één werkdag een reactie.",
  },
  {
    step: "02",
    title: "Concept",
    text: "Heldere scope, schermen en prioriteiten. Je weet wat we bouwen, wat het kost en wanneer het live kan.",
  },
  {
    step: "03",
    title: "Bouwen",
    text: "Korte sprints, tussentijds meekijken. Geen verrassingen aan het eind van het traject.",
  },
  {
    step: "04",
    title: "Live",
    text: "We testen, leveren op en zetten de shop of app live. Jij houdt de regie over content en gebruik.",
  },
  {
    step: "05",
    title: "Nazorg",
    text: "Na livegang blijven we beschikbaar. Kleine fixes, daarna optioneel onderhoud of extra functionaliteit.",
  },
] as const;

export const interestOptions = [
  { value: "webshop", label: "Webshop laten bouwen" },
  { value: "app", label: "App laten maken" },
  { value: "onderhoud", label: "Onderhoud" },
  { value: "anders", label: "Iets anders" },
] as const;

export type Interest = (typeof interestOptions)[number]["value"];

export const budgetOptions = [
  { value: "tot-500", label: "Tot €500" },
  { value: "500-1500", label: "€500 – €1.500" },
  { value: "1500-5000", label: "€1.500 – €5.000" },
  { value: "onbekend", label: "Nog niet bekend" },
] as const;

export const timelineOptions = [
  { value: "zo-snel-mogelijk", label: "Zo snel mogelijk" },
  { value: "1-2-maanden", label: "Over 1–2 maanden" },
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
    title: "Geen templates",
    text: "Ontwerp en code op maat. Jouw merk.",
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
    "Voorbeelden van de uitstraling waarin we werken. Geen klantenlijst — echte logo’s plaatsen we hier zodra die er zijn.",
} as const;

export const maintenance = {
  kicker: "Onderhoud",
  title: "Drie pakketten, maandelijks opzegbaar",
  intro:
    "Na livegang kun je zelf verder. Wil je dat wij updates, backups en kleine wijzigingen bijhouden, kies dan een vast maandtarief. Niet verplicht — wel rust.",
  note: "De eerste weken na oplevering horen bij de bouw. Onderhoud start pas als je dat wilt.",
  packages: [
    {
      id: "professional",
      name: "Professional",
      price: "€49",
      period: "per maand",
      summary: "De shop of app blijft veilig, snel en up-to-date.",
      features: [
        "Updates van platform en plugins",
        "Dagelijkse backups",
        "Uptime-monitoring",
        "SSL en basisbeveiliging",
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
      summary: "Voor wie doorlopend wil bijsturen zonder losse offertes.",
      features: [
        "Alles uit Professional Plus",
        "6 uur per maand inbegrepen",
        "Prioriteit bij storingen",
        "Kwartaalgesprek over verbeteringen",
        "Doorontwikkel-slot in de planning",
      ],
      cta: "Kies Care",
      featured: false,
    },
  ],
} as const;

export const faqs = [
  {
    q: "Hoeveel kost een webshop of app?",
    a: "Een webshop start vanaf €499, een app vanaf €999. De uiteindelijke prijs hangt af van koppelingen, aantal schermen en hoe uniek het proces is. We geven altijd een vaste prijs voordat we beginnen.",
    group: "prijzen",
  },
  {
    q: "Hoe lang duurt het?",
    a: "Een overzichtelijke webshop staat vaak in 3 tot 6 weken live. Een eerste versie van een app in 4 tot 8 weken. Grotere koppelingen vragen meer tijd; dat spreken we vooraf af.",
    group: "proces",
  },
  {
    q: "Krijg ik een native app in de stores?",
    a: "Standaard bouwen we een web-app of PWA: één versie, op telefoon, tablet en desktop, zonder store-gedoe. Wil je wél in de App Store of Play Store, dan nemen we dat als extra mee.",
    group: "app",
  },
  {
    q: "Kan ik het zelf beheren?",
    a: "Ja. Webshops leveren we op met een duidelijk CMS. Apps krijgen de schermen en rollen die jullie nodig hebben. Geen technische kennis vereist voor dagelijks gebruik.",
    group: "samenwerking",
  },
  {
    q: "Werken jullie met templates?",
    a: "Nee. We ontwerpen en bouwen op maat, zodat het product bij jullie merk en processen past. Dat houdt de code schoon en de ervaring overzichtelijk.",
    group: "samenwerking",
  },
  {
    q: "Wat is mijn rol als opdrachtgever?",
    a: "Jij levert de kennis van je bedrijf. Wij nemen de techniek en het ontwerp. We vragen je op vaste momenten mee te kijken en te testen, zodat we snel kunnen bijsturen.",
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
        a: "De eerste weken na livegang wel: kleine fixes horen erbij. Daarna kun je zelf verder, of een maandelijks pakket nemen vanaf €49. Onderhoud is nooit verplicht.",
      },
      {
        q: "Hoe werkt betalen?",
        a: "We splitsen de bouw in duidelijke termijnen, bijvoorbeeld start en livegang. Je betaalt niet in het wilde weg. Abonnementen voor onderhoud factureren we maandelijks en zijn opzegbaar.",
      },
      {
        q: "Waarom zijn jullie vanaf-prijzen lager dan bij veel bureaus?",
        a: "We zijn een compacte studio. Geen accountlaag, geen uren in pitchdecks. De prijs dekt ontwerp en bouw, niet een groot team eromheen. Unieke koppelingen of extra merken komen bovenop — dat zeggen we vooraf.",
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
        a: "Binnen één werkdag een reactie. Als het past, plannen we een kort gesprek. Daarna een vaste offerte met scope, prijs en planning. Pas als jij akkoord bent, beginnen we.",
      },
      {
        q: "Kan ik tussentijds meekijken?",
        a: "Ja. We werken in korte sprints. Je ziet tussentijdse versies, geen big bang aan het eind.",
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
        q: "Wat is een MVP precies?",
        a: "De kleinste versie die jullie in de praktijk kunnen gebruiken. Geen dummy. Daarna bouwen we door op wat écht gebruikt wordt, niet op aannames.",
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
        a: "Nee. Het zijn reviews via JR Intelligence, in een herkenbare kaartvorm. We kopiëren geen Google-widget en doen niet alsof het officiële Google-reviews zijn.",
      },
    ],
  },
] as const;

export const webshopPage = {
  title: "Webshop laten bouwen",
  kicker: "Webshop",
  intro:
    "Een webshop moet overzichtelijk zijn, snel laden en vertrouwen wekken. Wij bouwen shops die er strak uitzien en klaar zijn om te verkopen — voor merken en bedrijven die geen standaard thema willen.",
  points: [
    {
      title: "Gericht op conversie",
      text: "Duidelijke productpagina’s, een rustige checkout en een pad dat bezoekers niet laat verdwalen.",
    },
    {
      title: "Zelf aanpassen",
      text: "Producten, teksten en foto’s beheer je zelf. Geen ticket voor elke kleine wijziging.",
    },
    {
      title: "Technisch in orde",
      text: "Snel, veilig en vindbaar. SSL, schone structuur en een SEO-basis horen er standaard bij.",
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
    "Standaard software wringt vaak met hoe jullie werken. Wij maken een app die aansluit op jullie processen: intern, voor klanten, of allebei. Eerst een werkende versie, daarna verder bouwen.",
  points: [
    {
      title: "Op jullie werkwijze",
      text: "Geen pakket waar je je proces omheen moet wringen. De app volgt hoe het team al werkt.",
    },
    {
      title: "Snel een eerste versie",
      text: "We starten met de kern. Je kunt testen in de praktijk in plaats van maanden te wachten op ‘af’.",
    },
    {
      title: "Eén app, elk apparaat",
      text: "Als progressive web app werkt het op telefoon, tablet en desktop. Altijd up-to-date, zonder store-updates.",
    },
  ],
  forWhom: [
    "MKB dat repetitief werk wil digitaliseren",
    "Teams die Excel, papier of losse tools willen vervangen",
    "Bedrijven die klanten of leveranciers een portaal willen geven",
  ],
} as const;

export const about = {
  title: "Wie we zijn",
  intro:
    "JR Intelligence is een compacte studio. We bouwen webshops en apps voor Nederlandse bedrijven die iets eigens willen — niet nóg een template.",
  body: [
    "We houden van rustig ontwerp, heldere teksten en techniek die je niet in de weg zit. Geen dikke teams, geen eindeloze overleggen. Wel korte lijnen, een vaste prijs en een product waar je zelf mee verder kunt.",
    "We zitten nog aan het begin: geen opgeblazen portfolio, wel de aandacht die een eerste reeks opdrachtgevers verdient. Als we niet de juiste partij zijn, zeggen we dat ook.",
  ],
  howWeWork: [
    {
      title: "Eén aanspreekpunt",
      text: "Je praat met de mensen die ontwerpen en bouwen. Vragen blijven niet hangen in een accountlaag.",
    },
    {
      title: "Eerst scope, dan code",
      text: "We schrijven op wat live gaat, wat het kost en wanneer. Daarna bouwen. Geen moving target.",
    },
    {
      title: "Opleveren om zelf verder te kunnen",
      text: "CMS, toegang, korte handleiding. Je bent niet afhankelijk van ons voor een tekstwijziging.",
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
      text: "Strakke interfaces, weinig ruis. Bezoekers en gebruikers moeten meteen weten wat ze moeten doen.",
    },
    {
      title: "Eerlijk over prijs",
      text: "Vanaf-prijzen op de site, een vaste offerte vooraf. Geen verrassing achteraf.",
    },
    {
      title: "Dichtbij",
      text: "Je praat met de mensen die het bouwen. Vragen gaan niet verloren in een ticket-systeem.",
    },
  ],
} as const;

export const offertePage = {
  kicker: "Offerte",
  title: "Vraag een gerichte prijs aan",
  intro:
    "Kort wat je wilt bouwen, wanneer en in welke bandbreedte. Geen intake van twintig pagina’s. We reageren binnen één werkdag.",
} as const;

export const contactPage = {
  kicker: "Contact",
  title: "Stel een vraag",
  intro:
    "Twijfel je nog, of wil je eerst sparren? Mail of gebruik het formulier. Voor een prijsvoorstel is de offertepagina scherper.",
} as const;

export const ervaringenPage = {
  kicker: "Ervaringen",
  title: "Wat opdrachtgevers teruggeven",
  intro:
    "Reviews via JR Intelligence. Geen Google-widget, geen ingekochte sterren. De kaarten zijn bewust herkenbaar, de bron is van ons.",
  badge: "Reviews via JR Intelligence",
} as const;

export const faqPage = {
  kicker: "FAQ",
  title: "Antwoorden, zonder omwegen",
  intro:
    "Prijzen, doorlooptijd, onderhoud en eigenaarschap. Staat je vraag er niet bij, stuur een bericht. We reageren binnen één werkdag.",
} as const;
