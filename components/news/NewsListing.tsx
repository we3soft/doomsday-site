"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { sampleArticles } from "@/lib/newsData";

type CategoryFilter = "Latest" | "Leaks" | "Theories";

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: "Latest", label: "Latest" },
  { id: "Leaks", label: "Leaks" },
  { id: "Theories", label: "Theories" },
];

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

// "October 2026" -> "2026-10-01" so the visible date can also be machine-readable.
function toIsoDate(label: string): string | undefined {
  const m = label.match(/([A-Za-z]+)\.?\s+(?:(\d{1,2})(?:st|nd|rd|th)?,?\s+)?(\d{4})/);
  if (!m) return undefined;
  const month = MONTHS.indexOf(m[1].toLowerCase());
  if (month === -1) return undefined;
  const day = m[2] ? Number(m[2]) : 1;
  return new Date(Date.UTC(Number(m[3]), month, day)).toISOString().slice(0, 10);
}

export default function NewsListing() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("Latest");

  // Filter articles based on selected category control
  // "Latest" orders newest first; "Leaks" maps to "LEAK"; "Theories" maps to "THEORY"
  const filteredArticles = useMemo(() => {
    if (selectedCategory === "Leaks") {
      return sampleArticles.filter((article) => article.category === "LEAK");
    }
    if (selectedCategory === "Theories") {
      return sampleArticles.filter((article) => article.category === "THEORY");
    }
    // "Latest": displays all articles in chronological order (newest first)
    return sampleArticles;
  }, [selectedCategory]);

  const leadArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);

  return (
    <div className="w-full text-white">
      {/* Section Heading: "Top news" with vertical yellow bar and right-facing chevron */}
      <div className="flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
        <span
          className="w-1 sm:w-1.5 h-6 sm:h-7 bg-[#f5c518] rounded-xs shrink-0"
          aria-hidden="true"
        />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
          Top news
          <span className="sr-only"> about Avengers: Doomsday</span>
          <ChevronRight
            className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.5]"
            aria-hidden="true"
          />
        </h1>
      </div>

      {/* Main Two-Column Layout (Desktop: ~65% articles, ~35% MORE NEWS. Mobile: stacked) */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-10 lg:gap-12">
        {/* Right Section: "MORE NEWS" (on desktop sits on the right; on smaller screens stacks below heading, above articles) */}
        <aside
          className="w-full lg:w-[32%] xl:w-[30%] order-1 lg:order-2 shrink-0"
          aria-label="More news categories"
        >
          <div className="border border-neutral-800 rounded-lg p-5 sm:p-6 bg-transparent">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4 font-sans">
              MORE NEWS
            </h2>

            {/* Pill-shaped outlined controls */}
            <div
              className="flex flex-wrap gap-2 sm:gap-2.5"
              role="group"
              aria-label="Filter news by category"
            >
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    aria-pressed={isSelected}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c518] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                      isSelected
                        ? "border-white bg-white text-black font-semibold shadow-sm"
                        : "border-neutral-700 bg-transparent text-white hover:border-neutral-400 hover:bg-white/5"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Left Section: Articles (roughly 65% width on desktop) */}
        <section
          className="w-full lg:w-[65%] xl:w-[68%] order-2 lg:order-1 min-w-0"
          aria-label="Articles list"
        >
          {filteredArticles.length === 0 ? (
            <div className="py-16 text-center text-neutral-400 text-sm">
              <p>No articles found in this category.</p>
            </div>
          ) : (
            <div>
              {/* Lead Article (Full width across the left section) */}
              {leadArticle && (
                <article>
                  <Link
                    href={`/news/${leadArticle.id}`}
                    className="group flex flex-row items-start gap-4 sm:gap-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c518] rounded-sm"
                  >
                    {/* Exact Ratio Thumbnail: 16:9 landscape aspect-video */}
                    <div className="relative w-[170px] sm:w-[210px] lg:w-[230px] aspect-video shrink-0 overflow-hidden rounded-[4px] bg-neutral-900">
                      <Image
                        src={leadArticle.image}
                        alt={leadArticle.title}
                        fill
                        sizes="(max-width: 640px) 170px, 230px"
                        priority
                        className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Lead Article Details: Bold headline, 3-line excerpt, metadata */}
                    <div className="flex flex-col justify-between min-w-0 flex-1 self-stretch py-0.5">
                      <div>
                        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white leading-snug group-hover:text-neutral-300 transition-colors font-sans line-clamp-2 sm:line-clamp-none">
                          {leadArticle.title}
                        </h2>
                        <p className="mt-2 text-xs sm:text-sm text-neutral-300 line-clamp-3 leading-relaxed font-sans">
                          {leadArticle.description}
                        </p>
                      </div>

                      {/* Date/Source Metadata */}
                      <div className="mt-2.5 flex items-center gap-1.5 text-xs text-neutral-400 font-sans">
                        <time dateTime={toIsoDate(leadArticle.date)}>
                          {leadArticle.date}
                        </time>
                        {leadArticle.author && (
                          <>
                            <span aria-hidden="true">•</span>
                            <span>{leadArticle.author}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              )}

              {/* Smaller Articles Grid (2 columns on sm/desktop, 1 column on narrow screens) */}
              {remainingArticles.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7 mt-8 sm:mt-10">
                  {remainingArticles.map((article) => (
                    <article key={article.id}>
                      <Link
                        href={`/news/${article.id}`}
                        className="group flex flex-row items-start gap-3 sm:gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c518] rounded-sm"
                      >
                        {/* Exact Ratio Thumbnail: 16:9 landscape aspect-video */}
                        <div className="relative w-[110px] sm:w-[125px] aspect-video shrink-0 overflow-hidden rounded-[4px] bg-neutral-900">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            sizes="(max-width: 640px) 110px, 125px"
                            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* Article Details: Bold headline, date/source metadata */}
                        <div className="flex flex-col justify-between min-w-0 flex-1 self-stretch py-0.5">
                          <div>
                            <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-3 group-hover:text-neutral-300 transition-colors font-sans">
                              {article.title}
                            </h3>
                          </div>

                          {/* Date/Source Metadata */}
                          <div className="mt-2 flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-400 font-sans">
                            <time dateTime={toIsoDate(article.date)}>
                              {article.date}
                            </time>
                            {article.author && (
                              <>
                                <span aria-hidden="true">•</span>
                                <span>{article.author}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}