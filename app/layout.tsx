import type { Metadata, Viewport } from "next";
import { DM_Mono, Inter } from "next/font/google";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://avengersdoomsday.live"),

  title: {
    default: "Avengers: Doomsday Countdown & Live Updates",
    template: "%s | Avengers: Doomsday",
  },

  description:
    "Track the Avengers: Doomsday countdown, release date, cast, trailers, live updates, news, and everything you need to know.",

  applicationName: "Avengers: Doomsday",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "Avengers: Doomsday",
    title: "Avengers: Doomsday Countdown & Live Updates",
    description:
      "Track the Avengers: Doomsday countdown, release date, cast, trailers, live updates, and latest news.",
    url: "https://avengersdoomsday.live",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Avengers: Doomsday Countdown & Live Updates",
    description:
      "Track the Avengers: Doomsday countdown, release date, cast, trailers, live updates, and latest news.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050608",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmMono.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
