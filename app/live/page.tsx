import type { Metadata } from "next";
import { LiveChat, LivePlayer } from "./live-embeds";

const SITE_URL = "https://avengersdoomsday.live";
const PAGE_URL = `${SITE_URL}/live`;
const TITLE = "Avengers: Doomsday Live – Broadcast, Chat & Real-Time Updates";
const DESCRIPTION =
  "Watch the Avengers: Doomsday live broadcast, follow real-time updates and join the fan conversation in the live chat as new announcements happen.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`; // 1200x630

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Avengers Doomsday live",
    "Avengers Doomsday live stream",
    "Avengers Doomsday live chat",
    "Avengers Doomsday live updates",
    "Avengers Doomsday broadcast",
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

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: "Avengers: Doomsday Live",
    description: DESCRIPTION,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: "Avengers: Doomsday", url: SITE_URL },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Live", item: PAGE_URL },
    ],
  },
];

const VIDEO_ID = "f17J3AXVK5w";

export default function LivePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* Main live area */}
      <section className="relative overflow-hidden bg-background">
        <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#EF4444] uppercase mb-4">
            Live Now
          </p>
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_380px]">
            {/* VIDEO */}
            <div className="overflow-hidden border border-white/10 bg-black shadow-2xl shadow-black/30">
              <LivePlayer videoId={VIDEO_ID} />
            </div>

            {/* LIVE CHAT */}
            <div className="flex h-[560px] flex-col overflow-hidden border border-white/10 bg-[#090a0d] shadow-2xl shadow-black/30 lg:h-auto">
              <div className="min-h-0 flex-1 bg-[#090a0d]">
                <LiveChat videoId={VIDEO_ID} />
              </div>
            </div>
          </div>

          {/* VIDEO INFORMATION */}
          <article className="mt-8 max-w-4xl">
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Avengers: Doomsday
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/55 sm:text-base">
              Follow the latest Avengers: Doomsday broadcast, announcements,
              and live updates. The video above is embedded directly from
              YouTube, while the live chat lets viewers follow the
              conversation in real time.
            </p>
          </article>

          {/* Disclaimer */}
          <div className="mt-8 pt-6">
            <p className="max-w-3xl text-xs leading-5 text-white/30">
              Video and chat content are provided through YouTube&apos;s embedded
              player and chat services. Availability depends on the original
              YouTube broadcast.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}