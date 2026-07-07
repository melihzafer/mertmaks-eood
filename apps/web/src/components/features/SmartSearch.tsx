"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, X, ShoppingCart, Wrench, HardHat } from "lucide-react";
import { flatSearchData } from "@/data/search-data";

interface SearchResult {
  item: {
    id: string;
    name: string;
    category: string;
    store: "grocery" | "industrial" | "construction";
    keywords: string[];
    link: string;
  };
  score?: number;
}

export function SmartSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const fuse = useRef(
    new Fuse(flatSearchData, {
      keys: ["name", "keywords", "category", "question", "answer"],
      threshold: 0.4,
      includeScore: true,
    }),
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 1) {
      const searchResults = fuse.current.search(query).slice(0, 8);
      setResults(searchResults as SearchResult[]);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleResultClick = (link: string) => {
    router.push(link);
    setIsOpen(false);
    setQuery("");
  };

  const getStoreIcon = (store: string) => {
    switch (store) {
      case "grocery":
        return <ShoppingCart className="w-4 h-4 text-red-500" />;
      case "industrial":
        return <Wrench className="w-4 h-4 text-pink-500" />;
      case "construction":
        return <HardHat className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-[20vh] -translate-x-1/2 w-full max-w-2xl bg-white rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Търсете продукти, магазини, ЧЗВ..."
                className="flex-1 outline-none text-lg"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>

            {results.length > 0 && (
              <div className="max-h-[60vh] overflow-y-auto">
                {results.map((result, index) => (
                  <motion.button
                    key={result.item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleResultClick(result.item.link)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    {getStoreIcon(result.item.store)}
                    <div className="flex-1">
                      <div className="font-medium">{result.item.name}</div>
                      <div className="text-sm text-gray-500">
                        {result.item.category}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {query.length > 1 && results.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-500">
                Няма резултати за &quot;{query}&quot;
              </div>
            )}

            <div className="px-4 py-2 border-t bg-gray-50 text-xs text-gray-500 flex items-center justify-between">
              <span>Използвайте ↑↓ за навигация</span>
              <span>
                <kbd className="px-2 py-1 bg-white rounded border">ESC</kbd> за
                затваряне
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
