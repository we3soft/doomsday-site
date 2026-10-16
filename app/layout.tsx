import type { Metadata, Viewport } from "next";
import { DM_Mono, Inter } from "next/font/google";
import Script from "next/script";

import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://avengersdoomsday.live";
const SITE_NAME = "Avengers: Doomsday";
const OG_IMAGE = "/og-image.jpg"; // public/og-image.jpg, 1200x630

// Set in .env.local and in your hosting dashboard (leave unset until you have them):
//   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...   (Google Search Console)
//   NEXT_PUBLIC_BING_SITE_VERIFICATION=...     (Bing Webmaster Tools)
//   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const BING_VERIFICATION = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

const DEFAULT_TITLE = "Avengers: Doomsday Countdown & Live Updates";
const DEFAULT_DESCRIPTION =
  "Track the Avengers: Doomsday countdown, release date, cast, trailers, live updates, news, and everything you need to know.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: "%s | Avengers: Doomsday",
  },

  description: DEFAULT_DESCRIPTION,

  applicationName: SITE_NAME,
  authors: [{ name: "Avengers: Doomsday Fan Hub", url: SITE_URL }],
  creator: "Avengers: Doomsday Fan Hub",
  publisher: "Avengers: Doomsday Fan Hub",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },

  keywords: [
    "Avengers Doomsday",
    "Avengers Doomsday countdown",
    "Avengers Doomsday release date",
    "Avengers Doomsday cast",
    "Avengers Doomsday trailer",
    "Avengers Doomsday news",
    "Avengers 5",
    "Marvel Doomsday",
    "Doctor Doom MCU",
    "Robert Downey Jr Doctor Doom",
    "Avengers Doomsday 2026",
    "MCU Phase 6",
    "Avengers Doomsday live updates",
    "Doomsday countdown timer",
    "Avengers Doomsday leaks",
    "Avengers Doomsday theories",
    "Russo Brothers Avengers",
    "Marvel Studios 2026",
  ],

  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description:
      "Fan hub for Avengers: Doomsday. Live countdown, cast, official trailers, news, and theories, all in one place.",
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Avengers: Doomsday countdown",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description:
      "Fan hub for Avengers: Doomsday. Live countdown, cast, official trailers, news, and theories.",
    images: [OG_IMAGE],
  },

  verification: {
    ...(GOOGLE_VERIFICATION && { google: GOOGLE_VERIFICATION }),
    ...(BING_VERIFICATION && { other: { "msvalidate.01": BING_VERIFICATION } }),
  },

  other: ADSENSE_CLIENT ? { "google-adsense-account": ADSENSE_CLIENT } : undefined,

  category: "entertainment",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050608",
  colorScheme: "dark",
};

// Site-wide entities only. The Movie schema lives on the home page, and every
// page adds its own WebPage / Article / Person schema.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        "Fan hub for Avengers: Doomsday: live countdown, cast, trailers, news, and theories.",
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Avengers: Doomsday Fan Hub",
      url: SITE_URL,
      // Add "logo" once you create app/icon.png (square, at least 112x112).
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />

        {ADSENSE_CLIENT && (
          <Script
            id="adsense-loader"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          />
        )}
      </body>
    </html>
  );
}