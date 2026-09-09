export const company = {
  name: "JR Intelligence",
  email: "info@jr-intelligence.com",
  tagline: "Webshop of app op maat, zonder ruis.",
} as const;

export const navLinks = [
  { href: "/webshop-laten-bouwen", label: "Webshop" },
  { href: "/app-laten-maken", label: "App" },
  { href: "/prijzen", label: "Prijzen" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
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

export const faqs = [
  {
    q: "Hoeveel kost een webshop of app?",
    a: "Een webshop start vanaf €499, een app vanaf €999. De uiteindelijke prijs hangt af van koppelingen, aantal schermen en hoe uniek het proces is. We geven altijd een vaste prijs voordat we beginnen.",
  },
  {
    q: "Hoe lang duurt het?",
    a: "Een overzichtelijke webshop staat vaak in 3 tot 6 weken live. Een eerste versie van een app in 4 tot 8 weken. Grotere koppelingen vragen meer tijd; dat spreken we vooraf af.",
  },
  {
    q: "Krijg ik een native app in de stores?",
    a: "Standaard bouwen we een web-app of PWA: één versie, op telefoon, tablet en desktop, zonder store-gedoe. Wil je wél in de App Store of Play Store, dan nemen we dat als extra mee.",
  },
  {
    q: "Kan ik het zelf beheren?",
    a: "Ja. Webshops leveren we op met een duidelijk CMS. Apps krijgen de schermen en rollen die jullie nodig hebben. Geen technische kennis vereist voor dagelijks gebruik.",
  },
  {
    q: "Werken jullie met templates?",
    a: "Nee. We ontwerpen en bouwen op maat, zodat het product bij jullie merk en processen past. Dat houdt de code schoon en de ervaring overzichtelijk.",
  },
  {
    q: "Wat is mijn rol als opdrachtgever?",
    a: "Jij levert de kennis van je bedrijf. Wij nemen de techniek en het ontwerp. We vragen je op vaste momenten mee te kijken en te testen, zodat we snel kunnen bijsturen.",
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
