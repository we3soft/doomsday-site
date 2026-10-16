import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/newsData";
import { MOVIE_ID, tmdb } from "@/lib/tmdb";

const SITE_URL = "https://avengersdoomsday.live";

// Rebuild the sitemap at most once an hour (matches the TMDB cache window).
export const revalidate = 3600;

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

// "October 2026" -> Date(2026-10-01). Returns undefined if the label cannot be read.
function articleDate(label: string): Date | undefined {
  const m = label.match(/([A-Za-z]+)\.?\s+(?:(\d{1,2})(?:st|nd|rd|th)?,?\s+)?(\d{4})/);
  if (!m) return undefined;
  const month = MONTHS.indexOf(m[1].toLowerCase());
  if (month === -1) return undefined;
  return new Date(Date.UTC(Number(m[3]), month, m[2] ? Number(m[2]) : 1));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = getAllArticles();

  // Newest article date drives the pages that change when news is added
  // (real dates, not "now" on every request, which Google ignores).
  const dates = articles
    .map((a) => articleDate(a.date))
    .filter((d): d is Date => Boolean(d));
  const latestNews = dates.length
    ? new Date(Math.max(...dates.map((d) => d.getTime())))
    : undefined;

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: latestNews, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/news`, lastModified: latestNews, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/cast`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/trailers`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/live`, changeFrequency: "daily", priority: 0.6 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    // /countdown is a redirect to "/", so it is intentionally left out.
  ];

  const newsPages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/news/${article.id}`,
    lastModified: articleDate(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Cast detail pages come from TMDB. If the API is down, the sitemap still works.
  let castPages: MetadataRoute.Sitemap = [];
  try {
    const credits = await tmdb<{ cast: { id: number; order: number }[] }>(
      `/movie/${MOVIE_ID}/credits`
    );
    castPages = (credits?.cast ?? [])
      .sort((a, b) => a.order - b.order)
      .slice(0, 30) // same 30 people shown on /cast
      .map((person) => ({
        url: `${SITE_URL}/cast/${person.id}`,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
  } catch {
    castPages = [];
  }

  return [...staticPages, ...newsPages, ...castPages];
}