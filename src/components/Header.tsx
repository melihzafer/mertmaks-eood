"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { searchData } from "@/data/search-data";

const navLinks = [
  { href: "/", label: "Начало" },
  { href: "/supermarket", label: "Хранителен" },
  { href: "/industrial", label: "Индустриален" },
  { href: "/construction", label: "Строителен" },
  { href: "/contact", label: "Контакти" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSearchFocused(false);
        setSearchQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  // Filter search results
  const searchResults = searchQuery.trim()
    ? [
        ...searchData.products.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.keywords.some((kw) =>
              kw.toLowerCase().includes(searchQuery.toLowerCase())
            )
        ),
        ...searchData.faqs.filter(
          (item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      ].slice(0, 6)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            {/* Logo - matches brand design */}
            <div className="flex items-center h-16 p-5 rounded-lg overflow-hidden">
              {/* Icon part - pink gradient with M */}
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 via-pink-500 to-red-600 shadow-2xl"
                whileHover={{ rotate: 2, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xl text-white font-bold">M</span>
              </motion.div>

              {/* Text part - red background with white text */}
              <div className=" px-3 flex justify-center flex-col">
                <span className="text-black font-bold text-sm tracking-tight">
                  МЕРТМАКС
                </span>
                <span className="text-xs text-black font-medium">ЕООД</span>
              </div>
            </div>

            {/* Location subtitle */}
          </Link>

          <div className="flex p-2 items-center h-24 gap-2">
            {/* Search Bar with Dropdown */}
            <div className="md:block relative" ref={searchRef}>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Search className="h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Търси..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-500 w-32 focus:w-48 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchFocused(false);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {isSearchFocused && searchQuery && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      minWidth: `calc(${searchRef.current?.offsetWidth}px + 150px)`,
                      width: "100%",
                      left: `-${150 / 2}px`,
                      maxWidth: "100vw",
                    }}
                    className="absolute bg-white top mt-2 right-0 rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50"
                  >
                    <div className="p-2 text-xs text-gray-500 font-medium border-b">
                      Търсене с интелигентно съвпадение
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {searchResults.map((result, index) => {
                        const isProduct = "color" in result && "name" in result;
                        const isFaq =
                          "question" in result && "answer" in result;

                        return (
                          <Link
                            key={index}
                            href={result.link}
                            onClick={() => {
                              setIsSearchFocused(false);
                              setSearchQuery("");
                            }}
                            className="block p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                                style={{
                                  backgroundColor:
                                    isProduct && "color" in result
                                      ? `${result.color}20`
                                      : "#f3f4f6",
                                }}
                              >
                                <Search
                                  className="w-5 h-5"
                                  style={{
                                    color:
                                      isProduct && "color" in result
                                        ? result.color
                                        : "#6b7280",
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                  {isProduct && "name" in result
                                    ? result.name
                                    : isFaq && "question" in result
                                      ? result.question
                                      : ""}
                                </h4>
                                <p className="text-xs text-gray-600 mb-1">
                                  {isProduct && "category" in result
                                    ? result.category
                                    : isFaq && "answer" in result
                                      ? result.answer
                                      : ""}
                                </p>
                                {isProduct &&
                                  "color" in result &&
                                  "category" in result && (
                                    <span
                                      className="text-xs font-medium"
                                      style={{ color: result.color }}
                                    >
                                      {result.category}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="p-2 text-right border-t bg-gray-50">
                      <span className="text-xs text-gray-500">ESC</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Меню"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                style={{ borderColor: "black" }}
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 transition-all ${
                  pathname === link.href
                    ? "text-gray-900 border-b-2 border-pink-500"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
