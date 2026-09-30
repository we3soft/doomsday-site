import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Doomsday is a fan-built road to Avengers: Doomsday - live countdown, updates, rumors, theories, and cinematic experience.",
};

type Section = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

const sections: Section[] = [
  {
    heading: "Who We Are",
    paragraphs: [
      "Doomsday is an independent and fan made platform for all those following the way towards Avengers: Doomsday. We transform the waiting into the experience through live countdown with the latest updates and fan made stories in a cinematic format.",
      "This platform is created specifically for the fans of Marvel, theory crafters and those who cannot wait for the next developments.",
    ],
  },
  {
    heading: "Our Mission",
    paragraphs: [
      "Our goal is to turn the anticipation of this big blockbuster into an experience equal to the movie itself. Combining design, technology and passion of the fan community, we gather all the news, updates and rumors into one single place.",
      "Whether you are watching the Doomsday Clock ticking or analyzing the teasers and trailers or discussing the latest casting news, we will keep your hype alive till the release date.",
    ],
  },
  {
    heading: "What We Offer",
    bullets: [
      "The Doomsday Clock: live countdown to the release date of the movie, real-time updates",
      "News & Updates: the latest announcements, casting news and production updates",
      "Leaks & Reports: rumors and reports, clearly marked",
      "Trailers & Teasers: analysis of every new piece of the movie",
      "Theory Analysis: fan theories and easter eggs, story possibilities",
    ],
  },
  {
    heading: "How the Countdown Works",
    paragraphs: [
      "The Doomsday Clock ticks down until the actual official date of theatrical release of Avengers: Doomsday, which is December 18, 2026. The clock operates in real-time directly within your browser and counts down once per second. We will make sure that we update the Doomsday Clock immediately if the date changes.",
    ],
  },
  {
    heading: "Our Promise: Fact vs. Rumor",
    paragraphs: [
      "A strict line is drawn between the confirmed information and unconfirmed reports. Any official statements and announcements are stated as facts while all unconfirmed information will be marked as reported, rumored or speculation and fan theories will always be stated as theories.",
    ],
  },
  {
    heading: "Independent & Unofficial",
    paragraphs: [
      "Doomsday Countdown is an absolutely independent and unofficial fan site project. It has nothing to do with and is not supported by Marvel Studios, Disney and/or any other related company. All the trademarks, movie characters and titles belong to their rightful owners.",
    ],
  },
  {
    heading: "Built With Passion",
    paragraphs: [
      "This website has been designed and managed by a team of independent creators who have a strong love for Marvel stories, design and technology. The countdown is not just a countdown, but something much more exciting than that.",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 sm:py-24 lg:py-28">
      <article className="mx-auto max-w-[900px] text-left">
        {/* Header Section */}
        <header className="mb-14 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#EF4444] uppercase mb-4">
            ABOUT
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-bold tracking-tight text-white leading-[1.15] mb-6">
            About Doomsday
          </h1>
          <p className="text-lg sm:text-[19px] text-neutral-300 leading-[1.7]">
            A fan-built road to Avengers: Doomsday
          </p>
        </header>

        {/* Content Sections */}
        <div className="space-y-14 sm:space-y-16">
          {sections.map((section) => (
            <section key={section.heading} className="space-y-6">
              <h2 className="text-2xl sm:text-[30px] font-bold tracking-tight text-white">
                {section.heading}
              </h2>

              {section.paragraphs && (
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
              )}

              {section.bullets && (
                <ul className="space-y-3 pl-5 list-disc text-neutral-300">
                  {section.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="text-base sm:text-[19px] leading-[1.7] text-neutral-300"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
