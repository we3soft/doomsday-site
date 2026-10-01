import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Doomsday - Learn how we handle information and protect visitor privacy.",
};

const sections = [
  {
    heading: "1. Information We Collect",
    paragraphs: [
      "Doomsday is primarily an informational fan platform. We do not require account registration or collect personal identifying information to browse our public content.",
      "Our web servers automatically collect standard technical log data when you visit which is common in any website. This may include your IP address, browser type, operating system, referring URLs, pages viewed, and timestamps. This information is used solely for site diagnostics, security, and usage analytics.",
    ],
  },
  {
    heading: "2. Cookies and Storage",
    paragraphs: [
      "We may use essential browser storage mechanisms (such as localStorage or temporary session cookies) to store basic site preferences or improve site performance.",
      "Third-party providers (such as embedded video players or analytics providers) may set cookies according to their respective privacy policies when you interact with embedded content.",
    ],
  },
  {
    heading: "3. Third-Party Links & Embedded Content",
    paragraphs: [
      "Our website contains links to external websites and embedded media (including YouTube video trailers or official media releases). We are not responsible for the privacy practices or content of third-party platforms.",
      "We encourage users to review the privacy policies of any third-party websites they visit through links on our site.",
    ],
  },
  {
    heading: "4. Policy Updates",
    paragraphs: [
      "We may update this Privacy Policy from time to time to reflect site improvements or technical changes. Any revisions will be published on this page with an updated modification date.",
    ],
  },
  {
    heading: "5. Contact Us",
    paragraphs: [
      "If you have any questions or feedback regarding this Privacy Policy or our platform, please reach out through our official email.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 sm:py-24 lg:py-28">
      <article className="mx-auto max-w-[900px] text-left">
        {/* Header Section */}
        <header className="mb-14 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#EF4444] uppercase mb-4">
            PRIVACY
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-bold tracking-tight text-white leading-[1.15] mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg sm:text-[19px] text-neutral-300 leading-[1.7]">
            This policy outlines how information is collected, used, and safeguarded when visiting Doomsday.
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
