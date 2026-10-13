import type { Metadata } from "next";
import NewsListing from "@/components/news/NewsListing";
import { getAllArticles } from "@/lib/newsData";

const SITE_URL = "https://avengersdoomsday.live";
const PAGE_URL = `${SITE_URL}/news`;
const TITLE = "Avengers: Doomsday News, Analysis & Theories (2026)";
const DESCRIPTION =
  "The latest Avengers: Doomsday news, cast and casting analysis, Doctor Doom explainers and clearly labeled fan theories, updated as Marvel Studios announces more.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`; // add public/og-image.jpg (1200x630)

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Avengers Doomsday news",
    "Avengers Doomsday theories",
    "Avengers Doomsday analysis",
    "Doctor Doom MCU news",
    "Marvel news 2026",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Avengers: Doomsday",
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function NewsPage() {
  const articles = getAllArticles();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Avengers: Doomsday News and Analysis",
      description: DESCRIPTION,
      inLanguage: "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "News", item: PAGE_URL },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Avengers: Doomsday news and analysis",
      itemListElement: articles.map((article, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/news/${article.id}`,
        name: article.title,
      })),
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-7xl">
        <NewsListing />
      </div>
    </main>
  );
}