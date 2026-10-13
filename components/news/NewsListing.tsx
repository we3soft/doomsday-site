"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import {
  getAllArticles,
  type NewsArticle,
  type NewsCategory,
} from "@/lib/newsData";

type Filter = "ALL" | NewsCategory;

const PAGE_SIZE = 9;

const CATEGORY_META: Record<
  NewsCategory,
  { label: string; badge: string; description: string }
> = {
  NEWS: {
    label: "News",
    badge: "bg-[#EF4444] text-white",
    description: "Announcements and confirmed updates",
  },
  ANALYSIS: {
    label: "Analysis",
    badge: "bg-emerald-500 text-black",
    description: "Context and explainers",
  },
  GUIDE: {
    label: "Guides",
    badge: "bg-[#f5c518] text-black",
    description: "Practical how-tos",
  },
  THEORY: {
    label: "Theories",
    badge: "bg-indigo-600 text-white",
    description: "Fan speculation, clearly marked",
  },
  LEAK: {
    label: "Leaks",
    badge: "bg-amber-500 text-black",
    description: "Unconfirmed reports",
  },
};

const CATEGORY_ORDER: NewsCategory[] = [
  "NEWS",
  "ANALYSIS",
  "GUIDE",
  "THEORY",
  "LEAK",
];

function Badge({ category }: { category: NewsCategory }) {
  const meta = CATEGORY_META[category];
  return (
    <span
      className={`inline-block rounded-sm px-2.5 py-1 text-xs font-semibold ${meta.badge}`}
    >
      {meta.label === "Guides"
        ? "Guide"
        : meta.label === "Theories"
          ? "Theory"
          : meta.label === "Leaks"
            ? "Leak"
            : meta.label}
    </span>
  );
}

function Meta({ article }: { article: NewsArticle }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400">
      <time dateTime={article.publishedAt}>{article.date}</time>
      <span>{article.readingTime.replace("Minutes Read", "min read")}</span>
    </p>
  );
}

export default function NewsListing() {
  const articles = useMemo(() => getAllArticles(), []);
  const [filter, setFilter] = useState<Filter>("ALL");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const counts = useMemo(() => {
    const map = new Map<NewsCategory, number>();
    articles.forEach((a) => map.set(a.category, (map.get(a.category) ?? 0) + 1));
    return map;
  }, [articles]);

  const availableCategories = CATEGORY_ORDER.filter((c) => counts.has(c));

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (filter !== "ALL" && a.category !== filter) return false;
      if (!q) return true;
      const haystack = [a.title, a.description, ...(a.tags ?? [])]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [articles, filter, query]);

  const searching = query.trim().length > 0;
  const featured = !searching ? results[0] : undefined;
  const rest = featured ? results.slice(1) : results;
  const shown = rest.slice(0, visible);
  const hasMore = rest.length > visible;

  const selectFilter = (next: Filter) => {
    setFilter(next);
    setVisible(PAGE_SIZE);
  };

  const clearAll = () => {
    setFilter("ALL");
    setQuery("");
    setVisible(PAGE_SIZE);
  };

  return (
    <div className="w-full text-white">
      {/* Page header */}
      <header className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            News and analysis
          </h1>
          <p className="mt-3 text-base leading-7 text-neutral-300 sm:text-lg">
            Announcements, explainers and clearly labeled theories about
            Avengers: Doomsday, written by independent Marvel fans.
          </p>
        </div>

        <div className="relative w-full lg:w-80">
          <label htmlFor="news-search" className="sr-only">
            Search articles
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
            aria-hidden="true"
          />
          <input
            id="news-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder="Search Doom, cast, theories"
            className="w-full rounded-full border border-white/15 bg-white/[0.04] py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-neutral-500 focus:border-[#EF4444] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444]/40"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>

      {/* Category filters */}
      <div
        className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 [scrollbar-width:none]"
        role="group"
        aria-label="Filter articles by category"
      >
        {([
          { id: "ALL" as Filter, label: "All", count: articles.length },
          ...availableCategories.map((c) => ({
            id: c as Filter,
            label: CATEGORY_META[c].label,
            count: counts.get(c) ?? 0,
          })),
        ]).map((item) => {
          const selected = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectFilter(item.id)}
              aria-pressed={selected}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                selected
                  ? "border-white bg-white text-black"
                  : "border-white/15 text-neutral-200 hover:border-white/40 hover:bg-white/5"
              }`}
            >
              {item.label}
              <span
                className={`ml-2 text-xs ${selected ? "text-neutral-600" : "text-neutral-500"}`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {results.length} {results.length === 1 ? "article" : "articles"} shown
      </p>

      {results.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
          <h2 className="text-xl font-semibold text-white">
            No articles match your search
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-neutral-400">
            Try a different keyword, or clear the filters to see every article.
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-6 rounded-full bg-[#EF4444] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          {/* Featured story */}
          {featured && (
            <article className="mt-10">
              <Link
                href={`/news/${featured.id}`}
                className="group grid gap-6 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10"
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(min-width:1024px) 60vw, 100vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <div>
                    <Badge category={featured.category} />
                  </div>
                  <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-neutral-300 sm:text-3xl lg:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 line-clamp-4 text-base leading-7 text-neutral-300">
                    {featured.description}
                  </p>
                  <div className="mt-5 space-y-1">
                    <p className="text-sm text-neutral-200">
                      By {featured.author}
                    </p>
                    <Meta article={featured} />
                  </div>
                </div>
              </Link>
            </article>
          )}

          {/* Article grid */}
          {shown.length > 0 && (
            <section
              aria-label="Articles"
              className={featured ? "mt-14 border-t border-white/10 pt-10" : "mt-10"}
            >
              {featured && (
                <h2 className="mb-6 text-xl font-bold tracking-tight text-white">
                  More stories
                </h2>
              )}
              <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((article) => (
                  <li key={article.id}>
                    <article className="h-full">
                      <Link
                        href={`/news/${article.id}`}
                        className="group flex h-full flex-col rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444]"
                      >
                        <div className="relative aspect-video overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
                            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                        <div className="mt-4 flex flex-1 flex-col">
                          <div>
                            <Badge category={article.category} />
                          </div>
                          <h3 className="mt-3 text-lg font-bold leading-snug text-white transition-colors group-hover:text-neutral-300">
                            {article.title}
                          </h3>
                          <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-400">
                            {article.description}
                          </p>
                          <div className="mt-auto pt-4">
                            <Meta article={article} />
                          </div>
                        </div>
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444]"
              >
                Show more articles
              </button>
            </div>
          )}
        </>
      )}

      <p className="mt-16 max-w-3xl text-xs leading-5 text-neutral-500">
        Doomsday is an independent fan site and is not affiliated with Marvel
        Studios or Disney. Articles labeled Theory are speculation, and
        anything unconfirmed is marked as a report.
      </p>
    </div>
  );
}