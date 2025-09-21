export interface KnowledgeArticle {
  slug: string;
  title: string;
  description: string;
  updated: string;
  keywords: string[];
  category: string;
}

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: "steckdosen-adapter",
    title: "Steckdosen-Adapter nach Land",
    description: "Überblick über Steckdosen-Typen und Netzspannung für Reisen in Europa und weltweit.",
    updated: "2025-01-12",
    keywords: ["Steckdosen", "Adapter", "Reise", "Netzspannung"],
    category: "Reisen & Infrastruktur",
  },
  {
    slug: "papierformate",
    title: "Papierformate DIN A0–A10",
    description: "Alle DIN-Papierformate inklusive Abmessungen, Fläche und Umrechnung.",
    updated: "2025-01-12",
    keywords: ["Papierformate", "DIN A", "Druck"],
    category: "Druck & Medien",
  },
  {
    slug: "bildschirmaufloesungen",
    title: "Übersicht gängiger Bildschirmauflösungen",
    description: "Monitor- und Displayauflösungen für HD, Full HD, 4K, 5K und mehr.",
    updated: "2025-01-12",
    keywords: ["Bildschirmauflösung", "Monitor", "Display"],
    category: "Hardware & Technik",
  },
  {
    slug: "kleidung-groessentabellen",
    title: "Kleidung-Größentabellen",
    description: "Konfektionsgrößen für Damen, Herren und Kinder in DE, EU, UK und US.",
    updated: "2025-01-12",
    keywords: ["Kleidung", "Größentabelle", "Mode"],
    category: "Mode & Alltag",
  },
];

export function getKnowledgeArticle(slug: string): KnowledgeArticle | undefined {
  return knowledgeArticles.find((article) => article.slug === slug);
}
