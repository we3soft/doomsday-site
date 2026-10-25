import type { Metadata } from "next";

const SITE_URL = "https://avengersdoomsday.live";
const PAGE_URL = `${SITE_URL}/terms`;
const TITLE = "Terms – Avengers: Doomsday Fan Hub";
const DESCRIPTION =
  "Read the terms and conditions for using the Avengers: Doomsday fan platform, including content usage, fan disclaimers, and guidelines.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`; // 1200x630

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
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
    name: "Terms",
    description: DESCRIPTION,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: "Avengers: Doomsday", url: SITE_URL },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Terms", item: PAGE_URL },
    ],
  },
];

const sections = [
  {
    heading: "1. Acceptance of Terms",
    paragraphs: [
      "By accessing and using Doomsday, you acknowledge and agree to comply with these terms of use. If you do not agree with any part of these terms, please discontinue use of the platform.",
      "We reserve the right to modify or replace these terms at any time. Continued use of the website following any changes signifies your acceptance of the updated terms.",
    ],
  },
  {
    heading: "2. Fan Site & Intellectual Property Disclaimer",
    paragraphs: [
      "Doomsday is an independent, unofficial fan hub and is not affiliated with, endorsed by, or sponsored by Marvel Studios, The Walt Disney Company, or their subsidiaries.",
      "All character names, movie titles, trademarks, and associated media are the property of their respective copyright holders. Fan commentary, speculative theories, and news aggregation are shared under fair use for informational and entertainment purposes.",
    ],
  },
  {
    heading: "3. User Conduct & Acceptable Use",
    paragraphs: [
      "You agree to use this site in a lawful and respectful manner. You must not attempt to compromise website security, spam communication channels, or distribute malicious software.",
      "Any automated scraping or mass extraction of content without prior written permission is prohibited.",
    ],
  },
  {
    heading: "4. Third-Party Links & Embedded Media",
    paragraphs: [
      "Our website contains links to external websites and embedded third-party media (such as YouTube videos and official trailers). We have no control over the content, privacy practices, or availability of external websites.",
      "Accessing external links is done at your own discretion and risk.",
    ],
  },
  {
    heading: "5. Disclaimer of Warranties & Limitation of Liability",
    paragraphs: [
      "All content, countdown schedules, cast information, and news updates are provided on an 'as-is' and 'as-available' basis without warranties of any kind.",
      "Release dates, trailer drops, and casting reports are subject to change by Marvel Studios at any time. Doomsday will not be held liable for any damages or inaccuracies arising from the use of this website.",
    ],
  },
  {
    heading: "6. Contact Information",
    paragraphs: [
      "If you have any questions, copyright notices, or inquiries regarding these Terms, please reach out via our official contact page.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 sm:py-24 lg:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <article className="mx-auto max-w-[900px] text-left">
        {/* Header Section */}
        <header className="mb-14 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#EF4444] uppercase mb-4">
            TERMS
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-bold tracking-tight text-white leading-[1.15] mb-6">
            Terms
          </h1>
          <p className="text-lg sm:text-[19px] text-neutral-300 leading-[1.7]">
            These terms outline the rules and guidelines for visiting and interacting with Doomsday.
          </p>
        </header>

        {/* Content Sections */}
        <div className="space-y-14 sm:space-y-16">
          {sections.map((section) => (
            <section key={section.heading} className="space-y-6">
              <h2 className="text-2xl sm:text-[30px] font-bold tracking-tight text-white">
                {section.heading}
              </h2>

              <div className="space-y-4">
                {section.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-base sm:text-[19px] text-neutral-300 leading-[1.7]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
