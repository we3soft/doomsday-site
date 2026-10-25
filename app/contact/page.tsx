import type { Metadata } from "next";

const SITE_URL = "https://avengersdoomsday.live";
const PAGE_URL = `${SITE_URL}/contact`;
const TITLE = "Contact Us – Avengers: Doomsday Fan Hub";
const DESCRIPTION =
  "Get in touch with the Avengers: Doomsday fan site team. Reach out for inquiries, feedback, suggestions, or site support.";
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
    "@type": "ContactPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: "Contact Us",
    description: DESCRIPTION,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: "Avengers: Doomsday", url: SITE_URL },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Contact", item: PAGE_URL },
    ],
  },
];

export default function ContactPage() {
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
            CONTACT
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-bold tracking-tight text-white leading-[1.15] mb-6">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-[19px] text-neutral-300 leading-[1.7]">
            If you have any questions, feedback, suggestions, or inquiries related to this site, the content on this platform, feel free to reach out. We’re always happy to connect with fellow movie updaters and creators.
          </p>
        </header>

        {/* Content Sections */}
        <div className="space-y-14 sm:space-y-16">
          {/* Email */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-[30px] font-bold tracking-tight text-white">
              Email
            </h2>
            <div className="space-y-4">
              <p className="text-base sm:text-[19px] text-neutral-300 leading-[1.7]">
                For general inquiries, support, or collaboration requests, you can contact us at:
              </p>
              <p className="text-base sm:text-[19px] leading-[1.7]">
                <a
                  href="mailto:info.we3soft@gmail.com"
                  className="font-medium text-[#EF4444] hover:underline"
                >
                  info.we3soft@gmail.com
                </a>
              </p>
            </div>
          </section>

          {/* Support */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-[30px] font-bold tracking-tight text-white">
              Support
            </h2>
            <div className="space-y-4">
              <p className="text-base sm:text-[19px] text-neutral-300 leading-[1.7]">
                If you are experiencing any issues with site functionality, please include as much detail as possible in your message so we can assist you efficiently.
              </p>
            </div>
          </section>

          {/* Feedback & Suggestions */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-[30px] font-bold tracking-tight text-white">
              Feedback &amp; Suggestions
            </h2>
            <div className="space-y-4">
              <p className="text-base sm:text-[19px] text-neutral-300 leading-[1.7]">
                this site is a continuously evolving creative project. If you have ideas for new new, updates theories, or content you’d like to see, we’d love to hear your suggestions.
              </p>
            </div>
          </section>

          {/* Response Time */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-[30px] font-bold tracking-tight text-white">
              Response Time
            </h2>
            <div className="space-y-4">
              <p className="text-base sm:text-[19px] text-neutral-300 leading-[1.7]">
                We aim to respond to all inquiries within. During peak periods, responses may take slightly longer, but we will always get back to you as soon as possible.
              </p>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
