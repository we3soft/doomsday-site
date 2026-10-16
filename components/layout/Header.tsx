"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// `title` gives each link a descriptive hover/accessibility hint, and gives
// search engines extra context about where the link goes.
const navigation = [
  { name: "Countdown", href: "/", title: "Avengers: Doomsday countdown" },
  { name: "Live", href: "/live", title: "Avengers: Doomsday live broadcast and chat" },
  { name: "Cast", href: "/cast", title: "Avengers: Doomsday cast and characters" },
  { name: "Trailers", href: "/trailers", title: "Avengers: Doomsday trailers and videos" },
  { name: "News", href: "/news", title: "Avengers: Doomsday news, analysis and theories" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        menuRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }

      setMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#050608]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 min-w-0 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-18">
        {/* Logo */}
        <Link
          href="/"
          title="Avengers: Doomsday countdown, home"
          aria-current={pathname === "/" ? "page" : undefined}
          className="shrink-0 text-lg font-bold tracking-[0.08em] text-white"
          onClick={() => setMenuOpen(false)}
        >
          DOOMSDAY
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
          itemScope
          itemType="https://schema.org/SiteNavigationElement"
        >
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                title={item.title}
                itemProp="url"
                aria-current={isActive ? "page" : undefined}
                className={`group relative px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-white font-semibold" : "text-white/70 hover:text-white"
                }`}
              >
                <span itemProp="name">{item.name}</span>

                <span
                  aria-hidden="true"
                  className={`absolute bottom-1 left-3.5 right-3.5 border-b-2 border-[#EF4444] transition-all ${
                    isActive ? "block" : "hidden group-hover:block group-hover:border-white/50"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          ref={buttonRef}
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
          ref={menuRef}
          id="mobile-menu"
          className="fixed inset-x-0 top-16 z-40 border-b border-white/5 bg-[#050608] md:hidden lg:top-18"
        >
          <nav
            className="mx-auto max-w-7xl px-4 py-2 sm:px-6"
            aria-label="Mobile navigation"
          >
            {navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  title={item.title}
                  aria-current={isActive ? "page" : undefined}
                  className={`block border-b border-white/5 py-4 text-sm font-medium transition-colors last:border-b-0 ${
                    isActive ? "text-[#EF4444] font-semibold" : "text-white/90 hover:text-white"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}