import { ToolDefinition } from "@/data/tools";

interface ToolSchemaProps {
  tool: ToolDefinition;
}

export function ToolSchema({ tool }: ToolSchemaProps) {
  if (tool.status === "planned") {
    return null;
  }

  const baseUrl = `https://tech-teddy.de/tools/${tool.slug}`;

  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: tool.applicationCategory,
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "EUR",
    },
    description: tool.description,
    url: baseUrl,
    dateModified: tool.lastUpdated,
    inLanguage: "de-DE",
    author: {
      "@type": "Organization",
      name: "Tech Teddy",
      url: "https://tech-teddy.de",
    },
    keywords: tool.keywords,
  };

  const faqSchema = tool.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: tool.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
    </>
  );
}
