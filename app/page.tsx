import type { Metadata } from "next";
import Image from "next/image";
import Countdown from "@/components/countdown/Countdown";

const SITE_URL = "https://avengersdoomsday.live";
const TITLE = "Avengers: Doomsday Countdown 2026 – Release Date, Cast, Trailers";
const DESCRIPTION =
  "Live countdown to Avengers: Doomsday, in theaters December 18, 2026. Track the Doomsday clock, see the cast, watch trailers and read the latest news and theories.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`; // 1200x630

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Avengers Doomsday countdown",
    "Avengers Doomsday release date",
    "Avengers Doomsday countdown timer",
    "how many days until Avengers Doomsday",
    "Avengers Doomsday cast",
    "Avengers Doomsday trailer",
    "Avengers Doomsday news",
    "Avengers Doomsday December 18 2026",
    "Doctor Doom MCU",
    "Marvel Doomsday",
    "AvangersDoomsdaycountdown",
    "Avangers",
    "Endgame"
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Avengers: Doomsday",
    locale: "en_US",
    images: [
      { url: OG_IMAGE, width: 1200, height: 630, alt: "Avengers: Doomsday countdown" },
    ],
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
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "en-US",
    about: { "@id": `${SITE_URL}/#movie` },
    primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
  },
  {
    "@context": "https://schema.org",
    "@type": "Movie",
    "@id": `${SITE_URL}/#movie`,
    name: "Avengers: Doomsday",
    url: SITE_URL,
    description:
      "Avengers: Doomsday is an upcoming Marvel Studios superhero film directed by Anthony and Joe Russo, scheduled for theatrical release on December 18, 2026.",
    datePublished: "2026-12-18",
    genre: ["Superhero", "Science Fiction", "Action"],
    director: [
      { "@type": "Person", name: "Anthony Russo" },
      { "@type": "Person", name: "Joe Russo" },
    ],
    productionCompany: { "@type": "Organization", name: "Marvel Studios" },
    image: OG_IMAGE,
  },
];

export default function Home() {
  return (
    <main className="bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden lg:min-h-[calc(100svh-4.5rem)]">
        {/* Hero image */}
        <Image
          src="/doomsday-hero (1).avif"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 -z-10 bg-[#050608]/65" />

        {/* Top-to-bottom cinematic fade */}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-[#050608]/80 via-[#050608]/45 to-[#050608]" />

        {/* Side fade */}
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#050608]/35 via-transparent to-[#050608]/35" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col items-center justify-center px-5 py-10 text-center sm:px-6 sm:py-12 lg:min-h-[calc(100svh-4.5rem)]">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
            Avengers: Doomsday
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-7xl">
            Countdown to Doomsday
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-muted drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] sm:mt-5 sm:text-base sm:leading-7">
            The release date, countdown, live updates, cast, trailers, and
            everything we know about Avengers: Doomsday.
          </p>

          <Countdown />

          <p className="mt-6 text-xs text-subtle sm:mt-8 sm:text-sm">
            December 18, 2026
          </p>
        </div>
      </section>
    </main>
  );
}