import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  AlertTriangle,
  BookOpen,
  HelpCircle,
  Sparkles,
  Clock,
  Calendar,
  User,
  Search,
} from "lucide-react";
import {
  getArticleById,
  getAllArticles,
  getRelatedArticles,
} from "@/lib/newsData";

const SITE_URL = "https://avengersdoomsday.live";
const SITE_NAME = "Avengers: Doomsday";
const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    id: article.id,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleById(resolvedParams.id);

  if (!article) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  const url = absoluteUrl(`/news/${article.id}`);
  const image = absoluteUrl(article.heroImage || article.image);

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    authors: [{ name: article.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      section: article.category,
      tags: article.tags,
      images: [{ url: image, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [image],
    },
  };
}

const CATEGORY_LABEL: Record<string, string> = {
  NEWS: "News",
  ANALYSIS: "Analysis",
  GUIDE: "Guide",
  THEORY: "Theory",
  LEAK: "Leak",
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = getArticleById(resolvedParams.id);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article.id, 3);

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case "NEWS":
        return "bg-[#EF4444] text-white";
      case "ANALYSIS":
        return "bg-emerald-500 text-black font-bold";
      case "GUIDE":
        return "bg-[#f5c518] text-black font-bold";
      case "LEAK":
        return "bg-amber-500 text-black font-bold";
      case "THEORY":
        return "bg-indigo-600 text-white font-bold";
      default:
        return "bg-white/20 text-white";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "LEAK":
        return <AlertTriangle className="w-3.5 h-3.5 inline-block mr-1.5" />;
      case "THEORY":
        return <HelpCircle className="w-3.5 h-3.5 inline-block mr-1.5" />;
      case "NEWS":
        return <Sparkles className="w-3.5 h-3.5 inline-block mr-1.5" />;
      case "ANALYSIS":
        return <Search className="w-3.5 h-3.5 inline-block mr-1.5" />;
      case "GUIDE":
        return <BookOpen className="w-3.5 h-3.5 inline-block mr-1.5" />;
      default:
        return null;
    }
  };

  const articleUrl = absoluteUrl(`/news/${article.id}`);
  const wordCount = [
    article.content.intro,
    ...article.content.sections.flatMap((s) => s.paragraphs),
  ]
    .join(" ")
    .split(/\s+/).length;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": article.category === "NEWS" ? "NewsArticle" : "Article",
    "@id": `${articleUrl}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    url: articleUrl,
    headline: article.title.slice(0, 110),
    description: article.description,
    image: [absoluteUrl(article.heroImage || article.image)],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Person", name: article.author },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Avengers: Doomsday Fan Hub",
      url: SITE_URL,
    },
    articleSection: CATEGORY_LABEL[article.category] ?? article.category,
    keywords: article.tags?.join(", "),
    wordCount,
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "News", item: `${SITE_URL}/news` },
      { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      {/* Top Back Navigation Bar */}
      <div className="border-b border-white/10 bg-[#050608]/80 backdrop-blur-md sticky top-16 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3">
          <Link
            href="/news"
            className="inline-flex items-center text-xs font-mono tracking-wider text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2 text-[#EF4444]" />
            Back to News
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative isolate min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] flex items-end overflow-hidden border-b border-white/10">
        {/* Atmospheric Blurred Background Image: clearly visible with subtle blur */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            src={article.heroImage || article.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center blur-md scale-110 opacity-75"
          />
        </div>

        {/* Balanced Dark Overlays: preserves legibility while keeping the hero image visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25 pointer-events-none" />
        <div className="absolute inset-0 bg-[#050608]/25 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 w-full">
          {/* Category Tag */}
          <div className="mb-4">
            <span
              className={`inline-flex items-center text-xs font-mono tracking-[0.2em] px-3 py-1 uppercase font-semibold shadow-lg ${getBadgeStyle(
                article.category
              )}`}
            >
              {getCategoryIcon(article.category)}
              {article.category}
            </span>
          </div>

          {/* Large Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] max-w-4xl drop-shadow-md">
            {article.title}
          </h1>

          {/* Subtitle / Description */}
          <p className="mt-4 text-base sm:text-xl text-neutral-300 leading-relaxed max-w-3xl drop-shadow-sm font-normal">
            {article.description}
          </p>
        </div>
      </section>

      {/* Article Body Wrapper */}
      <article className="mx-auto max-w-[800px] px-4 sm:px-6 pt-10">
        {/* Metadata Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-white/10 mb-10 text-xs sm:text-sm font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#EF4444]" />
            <span>Written by: <strong className="text-white font-medium">{article.author}</strong></span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-neutral-500" />
              <span>{article.readingTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-neutral-500" />
              <time dateTime={article.publishedAt}>{article.date}</time>
            </div>
          </div>
        </div>

        {/* Disclaimer for LEAK or THEORY */}
        {article.disclaimer && (
          <div className={`p-4 sm:p-5 mb-10 border text-sm leading-relaxed flex items-start gap-3.5 ${
            article.category === "LEAK"
              ? "bg-amber-950/30 border-amber-500/40 text-amber-200"
              : "bg-indigo-950/30 border-indigo-500/40 text-indigo-200"
          }`}>
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold font-mono text-xs uppercase tracking-wider mb-1">
                {article.category === "LEAK" ? "UNOFFICIAL REPORT / LEAK NOTICE" : "SPECULATION / FAN THEORY NOTICE"}
              </p>
              <p>{article.disclaimer}</p>
            </div>
          </div>
        )}

        {/* Main Content Paragraphs */}
        <div className="space-y-8 text-neutral-300 text-base sm:text-lg leading-[1.8]">
          <p className="text-lg sm:text-xl text-white font-normal leading-relaxed border-l-2 border-[#EF4444] pl-4 py-1">
            {article.content.intro}
          </p>

          {article.content.sections.map((section, idx) => (
            <section key={idx} className="space-y-6 pt-4">
              {section.heading && (
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white pt-4">
                  {section.heading}
                </h2>
              )}

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-neutral-300 leading-[1.8]">
                  {p}
                </p>
              ))}

              {section.quote && (
                <blockquote className="my-8 border-l-4 border-[#EF4444] bg-[#07090d] p-6 text-white text-lg font-medium italic leading-relaxed">
                  &ldquo;{section.quote}&rdquo;
                </blockquote>
              )}

              {section.image && (
                <figure className="my-8 space-y-3">
                  <div className="relative aspect-video w-full overflow-hidden border border-white/10 bg-[#07090d]">
                    <Image
                      src={section.image.url}
                      alt={section.image.caption || article.title}
                      fill
                      sizes="(max-width: 800px) 100vw, 800px"
                      className="object-cover"
                    />
                  </div>
                  {section.image.caption && (
                    <figcaption className="text-center text-xs font-mono text-neutral-400">
                      {section.image.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </section>
          ))}
        </div>

        {/* Topics */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center gap-2">
            <span className="text-sm text-neutral-500">Topics</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Back to News Action at Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/news"
            className="inline-flex items-center text-sm font-mono tracking-wider text-white bg-white/5 border border-white/10 px-5 py-3 hover:bg-[#EF4444] hover:border-[#EF4444] hover:text-white transition-all uppercase"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to News Listing
          </Link>
        </div>
      </article>

      {/* Related articles: keeps readers on the site and adds internal links */}
      {related.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="mx-auto mt-16 max-w-5xl px-4 sm:px-6"
        >
          <h2
            id="related-heading"
            className="text-2xl font-bold tracking-tight text-white"
          >
            Keep reading
          </h2>

          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/news/${item.id}`}
                  className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444]"
                >
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width:1024px) 300px, (min-width:640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-3 text-xs text-neutral-500">
                    {CATEGORY_LABEL[item.category] ?? item.category}
                  </p>
                  <h3 className="mt-1 text-base font-semibold leading-snug text-white transition-colors group-hover:text-neutral-300">
                    {item.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}