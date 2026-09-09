import { company, faqGroups } from "@/lib/content";

export function JsonLd() {
  const graph = [
    {
      "@type": "Organization",
      name: company.name,
      url: company.url,
      email: company.email,
      description:
        "JR Intelligence bouwt webshops en apps op maat voor Nederlandse bedrijven.",
    },
    {
      "@type": "WebSite",
      name: company.name,
      url: company.url,
      inLanguage: "nl-NL",
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}

export function FaqJsonLd() {
  const entities = faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  );

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entities,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
