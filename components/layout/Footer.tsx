import Link from "next/link";

const navigation = [
  { name: "Countdown", href: "/countdown" },
  { name: "Live", href: "/live" },
  { name: "Cast", href: "/cast" },
  { name: "Trailers", href: "/trailers" },
  { name: "News", href: "/news" },
];

const legal = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050608]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-lg font-bold tracking-[0.08em] text-white"
            >
              DOOMSDAY
            </Link>

            <p className="mt-3 text-sm leading-6 text-white/50">
              Avengers: Doomsday countdown, news, cast, trailers, and
              updates.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              {legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-white/40 transition-colors hover:text-white/70"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6">
          <p className="text-xs leading-5 text-white/35">
            © 2026 Doomsday. All rights reserved.
          </p>

          <p className="mt-2 max-w-3xl text-xs leading-5 text-white/30">
            This is an independent fan and information website and is not
            affiliated with or endorsed by Marvel Studios, Disney, or their
            subsidiaries.
          </p>
        </div>
      </div>
    </footer>
  );
}
