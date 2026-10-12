import type { Metadata } from "next";
import NewsListing from "@/components/news/NewsListing";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Stay updated with the latest news, developments, leaks, and theories regarding Avengers: Doomsday and space missions.",
};

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <NewsListing />
      </div>
    </main>
  );
}
