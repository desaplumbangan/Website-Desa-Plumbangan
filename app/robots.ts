import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://desa-plumbangan.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/keystatic/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
