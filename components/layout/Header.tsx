"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Countdown", href: "/" },
  { name: "Live", href: "/live" },
  { name: "Cast", href: "/cast" },
  { name: "Trailers", href: "/trailers" },
  { name: "News", href: "/news" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#050608]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 min-w-0 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-18">
        <Link
          href="/"
          className="shrink-0 text-base font-bold tracking-[0.08em] text-white sm:text-lg"
          onClick={() => setMenuOpen(false)}
        >
          DOOMSDAY
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative px-3.5 py-2 text-sm font-medium text-white"
            >
              {item.name}

              <span
                aria-hidden="true"
                className="absolute bottom-1 left-3.5 right-3.5 hidden border-b-2 border-white/80 group-hover:block"
              />
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-white md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X className="h-5 w-5" strokeWidth={2} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full border-t border-white/5 bg-[#050608] md:hidden"
        >
          <nav
            className="mx-auto max-w-7xl px-4 py-2 sm:px-6"
            aria-label="Mobile navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block border-b border-white/5 py-4 text-sm font-medium text-white/90 last:border-b-0 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
