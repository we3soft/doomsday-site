import type { MetadataRoute } from "next";

const SITE_URL = "https://avengersdoomsday.live";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All crawlers. /_next/ is intentionally NOT blocked: Google needs your
        // CSS and JavaScript files to render and rank the pages properly.
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Google AdSense crawler: must be able to read every page to serve ads.
        userAgent: "Mediapartners-Google",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}