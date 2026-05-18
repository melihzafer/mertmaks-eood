"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  accents,
  brand,
  mobileLinks,
  searchLinks,
} from "@/data/redesign-content";

type AccentStyle = CSSProperties & {
  "--theme-accent"?: string;
};

function getRouteAccent(pathname: string) {
  if (pathname.startsWith("/industrial")) return accents.industrial;
  if (pathname.startsWith("/construction")) return accents.construction;
  if (pathname.startsWith("/restaurant")) return accents.restaurant;
  if (pathname.startsWith("/samuil-hub") || pathname.startsWith("/about")) {
    return accents.supermarketAccent;
  }

  return accents.supermarket;
}

function isModifiedClick(event: MouseEvent | ReactMouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [wipeColor, setWipeColor] = useState(accents.supermarket);
  const [isWiping, setIsWiping] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const accent = useMemo(() => getRouteAccent(pathname), [pathname]);
  const accentStyle: AccentStyle = { "--theme-accent": accent };

  const secondNav = pathname.startsWith("/restaurant")
    ? { href: "/restaurant", label: "Ресторант" }
    : { href: "/supermarket", label: "Магазини" };

  const navLinks = [
    { href: "/", label: "Начало", active: pathname === "/" },
    {
      ...secondNav,
      active: pathname.startsWith("/restaurant")
        ? pathname.startsWith("/restaurant")
        : ["/supermarket", "/industrial", "/construction"].some((route) =>
            pathname.startsWith(route),
          ),
    },
    {
      href: "/samuil-hub",
      label: "За нас",
      active:
        pathname.startsWith("/samuil-hub") || pathname.startsWith("/about"),
    },
    {
      href: "/contact",
      label: "Контакти",
      active: pathname.startsWith("/contact"),
    },
  ];

  const runWipe = useCallback(
    (href: string, color = accent) => {
      setIsMobileOpen(false);
      setIsSearchOpen(false);
      setWipeColor(color);
      setIsWiping(false);
      requestAnimationFrame(() => setIsWiping(true));
      window.setTimeout(() => router.push(href), 310);
      window.setTimeout(() => setIsWiping(false), 680);
    },
    [accent, router],
  );

  const openSearch = () => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setIsMobileOpen(false);
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    previousFocusRef.current?.focus();
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        "a[data-wipe]",
      );

      if (!link || isModifiedClick(event) || event.button !== 0) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http")) return;

      event.preventDefault();
      runWipe(href, link.dataset.color || getRouteAccent(href));
    };

    document.addEventListener("click", onClick, {
      capture: true,
      signal: controller.signal,
    });
    return () => controller.abort();
  }, [runWipe]);

  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    const counterObservers: IntersectionObserver[] = [];
    const counterTimers: number[] = [];

    counters.forEach((counter) => {
      const target = Number(counter.dataset.count || 0);
      const suffix = counter.dataset.suffix || "";
      const step = Math.max(1, Math.ceil(target / 34));
      let current = 0;

      counter.textContent = `${target}${suffix}`;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting || counter.dataset.counted) return;

          counter.dataset.counted = "true";
          counter.textContent = `0${suffix}`;

          const timer = window.setInterval(() => {
            current = Math.min(target, current + step);
            counter.textContent = `${current}${suffix}`;
            if (current >= target) window.clearInterval(timer);
          }, 28);
          counterTimers.push(timer);
        },
        { threshold: 0.35 },
      );

      observer.observe(counter);
      counterObservers.push(observer);
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 },
    );

    document
      .querySelectorAll<HTMLElement>(".fade-up")
      .forEach((element) => revealObserver.observe(element));

    return () => {
      counterObservers.forEach((observer) => observer.disconnect());
      counterTimers.forEach((timer) => window.clearInterval(timer));
      revealObserver.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (!isSearchOpen) return;
    const timer = window.setTimeout(() => searchInputRef.current?.focus(), 0);
    return () => window.clearTimeout(timer);
  }, [isSearchOpen]);

  return (
    <>
      <div
        className={`wipe ${isWiping ? "run" : ""}`}
        style={{ "--theme-accent": wipeColor } as AccentStyle}
      />

      <header
        className={`site-header ${isScrolled ? "scrolled" : ""}`}
        style={accentStyle}
      >
        <div className="nav-inner">
          <Link
            className="brand"
            href="/"
            data-wipe
            data-color={accents.supermarket}
          >
            <strong>{brand.name}</strong>
            <span>{brand.legalForm}</span>
          </Link>

          <nav className="nav-links" aria-label="Основна навигация">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className={link.active ? "active" : undefined}
                href={link.href}
                data-wipe
                data-color={getRouteAccent(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="cluster">
            <button
              className="icon-btn desktop-search"
              type="button"
              aria-label="Търсене"
              onClick={openSearch}
            >
              ⌕
            </button>
            <button
              className="icon-btn hamburger"
              type="button"
              aria-label="Отвори меню"
              onClick={() => setIsMobileOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-panel ${isMobileOpen ? "open" : ""}`}
        id="mobilePanel"
        style={accentStyle}
        aria-hidden={!isMobileOpen}
        inert={!isMobileOpen}
      >
        <div className="panel-top">
          <Link
            className="brand"
            href="/"
            data-wipe
            data-color={accents.supermarket}
          >
            <strong>{brand.name}</strong>
            <span>{brand.legalForm}</span>
          </Link>
          <button
            className="icon-btn"
            type="button"
            aria-label="Затвори меню"
            onClick={() => setIsMobileOpen(false)}
          >
            ×
          </button>
        </div>
        <nav className="panel-links" aria-label="Мобилна навигация">
          {mobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-wipe
              data-color={getRouteAccent(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          className="btn color mobile-search-btn"
          type="button"
          onClick={() => {
            setIsMobileOpen(false);
            openSearch();
          }}
        >
          Търсене
        </button>
      </div>

      <div
        className={`search-panel ${isSearchOpen ? "open" : ""}`}
        id="searchPanel"
        style={accentStyle}
        aria-hidden={!isSearchOpen}
        inert={!isSearchOpen}
      >
        <div className="panel-top">
          <strong>Търсене</strong>
          <button
            className="icon-btn"
            type="button"
            aria-label="Затвори търсене"
            onClick={closeSearch}
          >
            ×
          </button>
        </div>
        <div className="search-box">
          <input
            id="siteSearch"
            ref={searchInputRef}
            placeholder="Какво търсите?"
          />
          <div className="search-results">
            {searchLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-wipe
                data-color={getRouteAccent(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
