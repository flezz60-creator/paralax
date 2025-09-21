import type { MetadataRoute } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://tech-teddy.de";
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
