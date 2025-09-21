import type { MetadataRoute } from "next";
import { knowledgeArticles } from "@/data/knowledge";
import { getLiveTools } from "@/data/tools";

const baseUrl = "https://tech-teddy.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/a-z",
    "/wissen",
    "/impressum",
    "/datenschutz",
    "/quiz/allgemeinwissen",
  ];

  const toolRoutes = getLiveTools().map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: tool.lastUpdated,
  }));

  const knowledgeRoutes = knowledgeArticles.map((article) => ({
    url: `${baseUrl}/wissen/${article.slug}`,
    lastModified: article.updated,
  }));

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
  }));

  return [...staticEntries, ...toolRoutes, ...knowledgeRoutes];
}
