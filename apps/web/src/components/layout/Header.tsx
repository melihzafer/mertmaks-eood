"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { CSSProperties, FormEvent, MouseEvent as ReactMouseEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import Fuse from "fuse.js";
import {
  brand,
  mobileLinks,
  searchLinks,
  searchPanelCopy,
  storesMenuLinks,
} from "@/data/redesign-content";
import { flatSearchData } from "@/data/search-data";
import type { SearchItem } from "@/lib/cms/search";
import { getRouteAccent } from "@/lib/route-accent";

type AccentStyle = CSSProperties & {
  "--theme-accent"?: string;
};

type CardColorStyle = CSSProperties & {
  "--card-color"?: string;
};

function isModifiedClick(event: MouseEvent | ReactMouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

const STORE_ROUTES = ["/supermarket", "/industrial", "/construction", "/restaurant"];

interface HeaderProps {
  searchItems?: SearchItem[];
}

export function Header({ searchItems = flatSearchData }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStoresOpen, setIsStoresOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wipeColor, setWipeColor] = useState(getRouteAccent("/"));
  const [isWiping, setIsWiping] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const storesMenuRef = useRef<HTMLDivElement>(null);

  const accent = useMemo(() => getRouteAccent(pathname), [pathname]);
  const accentStyle: AccentStyle = { "--theme-accent": accent };

  const isStoresActive = STORE_ROUTES.some((route) => pathname.startsWith(route));

  const navLinks = [
    { href: "/", label: "Начало", active: pathname === "/" },
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

  const fuse = useRef<Fuse<SearchItem> | null>(null);
  if (fuse.current === null) {
    fuse.current = new Fuse<SearchItem>(searchItems, {
      keys: ["name", "keywords", "category"],
      threshold: 0.4,
      includeScore: true,
    });
  }

  const searchResults = useMemo<SearchItem[]>(() => {
    const q = searchQuery.trim();
    if (q.length < 2 || !fuse.current) return [];
    return fuse.current
      .search(q)
      .slice(0, 8)
      .map((r) => r.item);
  }, [searchQuery]);

  const runWipe = useCallback(
    (href: string, color = accent) => {
      setIsMobileOpen(false);
      setIsSearchOpen(false);
      setIsStoresOpen(false);
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
    setIsStoresOpen(false);
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
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

    counters.forEach((counter) => {
      const target = Number(counter.dataset.count || 0);
      const suffix = counter.dataset.suffix || "";
      counter.textContent = `${target}${suffix}`;
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
      revealObserver.disconnect();
    };
  }, [pathname]);

  // Close stores dropdown on route change
  useEffect(() => {
    setIsStoresOpen(false);
  }, [pathname]);

  // Close stores dropdown on outside click / Escape
  useEffect(() => {
    if (!isStoresOpen) return;
    const onDocClick = (event: MouseEvent) => {
      if (!storesMenuRef.current) return;
      if (!storesMenuRef.current.contains(event.target as Node)) {
        setIsStoresOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsStoresOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isStoresOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;
    const timer = window.setTimeout(() => searchInputRef.current?.focus(), 0);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSearch();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchOpen]);

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    const first = searchResults[0];
    if (first) {
      runWipe(first.link, getRouteAccent(first.link));
    }
  };

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
            data-color={getRouteAccent("/")}
          >
            <strong>{brand.name}</strong>
            <span>{brand.legalForm}</span>
          </Link>

          <nav className="nav-links" aria-label="Основна навигация">
            <Link
              className={pathname === "/" ? "active" : undefined}
              href="/"
              data-wipe
              data-color={getRouteAccent("/")}
            >
              Начало
            </Link>

            <div
              className={`nav-dropdown ${isStoresOpen ? "open" : ""}`}
              ref={storesMenuRef}
            >
              <button
                type="button"
                className={`nav-dropdown-trigger ${isStoresActive ? "active" : ""}`}
                aria-haspopup="menu"
                aria-expanded={isStoresOpen}
                onClick={() => setIsStoresOpen((value) => !value)}
              >
                Магазини
                <ChevronDown className="nav-dropdown-chevron" aria-hidden="true" />
              </button>
              <div
                className="nav-dropdown-panel"
                role="menu"
                aria-hidden={!isStoresOpen}
              >
                {storesMenuLinks.map((link) => (
                  <Link
                    key={link.href}
                    role="menuitem"
                    href={link.href}
                    className="nav-dropdown-item"
                    data-wipe
                    data-color={link.color}
                    style={{ "--card-color": link.color } as CardColorStyle}
                    onClick={() => setIsStoresOpen(false)}
                  >
                    <span className="nav-dropdown-dot" aria-hidden="true" />
                    <span>
                      <strong>{link.label}</strong>
                      <small>{link.description}</small>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
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
              <Search className="icon-btn-icon" aria-hidden="true" />
            </button>
            <button
              className="icon-btn hamburger"
              type="button"
              aria-label="Отвори меню"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="icon-btn-icon" aria-hidden="true" />
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
            data-color={getRouteAccent("/")}
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
            <X className="icon-btn-icon" aria-hidden="true" />
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
          <strong>{searchPanelCopy.title}</strong>
          <button
            className="icon-btn"
            type="button"
            aria-label={searchPanelCopy.closeLabel}
            onClick={closeSearch}
          >
            <X className="icon-btn-icon" aria-hidden="true" />
          </button>
        </div>
        <form className="search-box" onSubmit={handleSearchSubmit}>
          <div className="search-input-wrap">
            <Search className="search-input-icon" aria-hidden="true" />
            <input
              id="siteSearch"
              ref={searchInputRef}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={searchPanelCopy.placeholder}
              autoComplete="off"
              type="search"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-input-clear"
                aria-label="Изчисти търсенето"
                onClick={() => setSearchQuery("")}
              >
                <X className="icon-btn-icon" aria-hidden="true" />
              </button>
            )}
          </div>

          {searchQuery.trim().length < 2 ? (
            <div className="search-results">
              <p className="search-section-label">{searchPanelCopy.emptyHint}</p>
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
          ) : searchResults.length > 0 ? (
            <div className="search-results">
              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  data-wipe
                  data-color={getRouteAccent(item.link)}
                  className="search-result-item"
                >
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.category}</small>
                  </span>
                </Link>
              ))}
              <p className="search-section-label search-section-label-tight">
                {searchPanelCopy.resultsHint}
              </p>
            </div>
          ) : (
            <div className="search-results">
              <p className="search-empty">
                {searchPanelCopy.noResults.replace("{query}", searchQuery)}
              </p>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
