export const reviewTopics = ["webshop", "app", "onderhoud"] as const;

export type ReviewTopic = (typeof reviewTopics)[number];

export type ReviewSeed = {
  name: string;
  role?: string;
  company?: string;
  initials: string;
  rating: 4 | 5;
  text: string;
  topic: ReviewTopic;
  daysAgo: number;
};

export const seededReviews: ReviewSeed[] = [
  {
    name: "Sanne de Wit",
    role: "Eigenaar",
    company: "interieurwinkel",
    initials: "SW",
    rating: 5,
    topic: "webshop",
    daysAgo: 11,
    text: "Eindelijk een shop die op ons merk lijkt, niet op een thema dat je overal ziet. Checkout is rustig, producten passen we zelf aan. Reactie kwam dezelfde werkdag.",
  },
  {
    name: "Thomas Bakker",
    role: "Operations",
    company: "groothandel",
    initials: "TB",
    rating: 5,
    topic: "app",
    daysAgo: 18,
    text: "We zaten vast in Excel. De eerste versie van de app deed precies de kern: orders binnen, status zichtbaar, minder nazoeken. Geen circus, wel iets dat het team nu écht gebruikt.",
  },
  {
    name: "Fatima El Amrani",
    role: "Oprichter",
    company: "mode-label",
    initials: "FA",
    rating: 4,
    topic: "webshop",
    daysAgo: 24,
    text: "Iets langer dan ik hoopte door foto’s aan onze kant. Het resultaat klopt: snel, overzichtelijk, geen gedoe met plugins. Prijs was vooraf helder, dat waardeer ik.",
  },
  {
    name: "Joris Hendriks",
    role: "Eigenaar",
    company: "specialistenzaak",
    initials: "JH",
    rating: 5,
    topic: "onderhoud",
    daysAgo: 31,
    text: "Na livegang Plus genomen. Updates en backups lopen, kleine tekstwijzigingen gaan er gewoon in. Ik hoef er niet meer aan te denken.",
  },
  {
    name: "Eva Mulder",
    role: "Marketing",
    company: "familiebedrijf",
    initials: "EM",
    rating: 5,
    topic: "webshop",
    daysAgo: 39,
    text: "Korte lijnen. Je praat met wie het bouwt. De shop voelt duur zonder duur te doen, en op telefoon is het even strak als op desktop.",
  },
  {
    name: "Koen van Dijk",
    role: "Directeur",
    company: "installatiebedrijf",
    initials: "KD",
    rating: 4,
    topic: "app",
    daysAgo: 47,
    text: "MVP was bewust klein. Dat was even slikken, maar het team gebruikt het. Tweede ronde plannen we nu. Fijn dat ze dat zo eerlijk zeiden.",
  },
  {
    name: "Noor Smeets",
    role: "Eigenaar",
    company: "delicatessen",
    initials: "NS",
    rating: 5,
    topic: "webshop",
    daysAgo: 55,
    text: "Van rommelige oude shop naar iets waar ik klanten naartoe durf te sturen. Betalingen werkten meteen. Handleiding was kort en duidelijk.",
  },
  {
    name: "Daan Veldman",
    role: "Teamlead",
    company: "logistiek",
    initials: "DV",
    rating: 5,
    topic: "app",
    daysAgo: 62,
    text: "Planning zat in losse lijsten. Nu één scherm, op telefoon in de hal. Geen store-gedoe, iedereen heeft de laatste versie.",
  },
  {
    name: "Lotte Berg",
    role: "Eigenaar",
    company: "atelier",
    initials: "LB",
    rating: 4,
    topic: "onderhoud",
    daysAgo: 70,
    text: "Professional is genoeg voor ons: backups, updates, klaar. Geen push naar het duurste pakket. Dat geeft vertrouwen.",
  },
  {
    name: "Amir Hassan",
    role: "Oprichter",
    company: "groothandel online",
    initials: "AH",
    rating: 5,
    topic: "webshop",
    daysAgo: 84,
    text: "Vaste prijs, geen verrassing. Shop staat. Als ze zeggen dat iets extra is, klopt dat ook. Compact team, wel serieus werk.",
  },
];
