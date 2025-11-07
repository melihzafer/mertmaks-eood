import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ShoppingCart, Wrench, HardHat, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { searchData } from '../data/search-data';

interface SearchResult {
  item: {
    name?: string;
    question?: string;
    answer?: string;
    category?: string;
    store?: string;
    color?: string;
    keywords: string[];
  };
  score?: number;
}

export function SmartSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Create Fuse instances for fuzzy search
  const productsFuse = new Fuse(searchData.products, {
    keys: ['name', 'keywords', 'category'],
    threshold: 0.4,
    includeScore: true,
  });

  const faqsFuse = new Fuse(searchData.faqs, {
    keys: ['question', 'answer', 'keywords'],
    threshold: 0.4,
    includeScore: true,
  });

  useEffect(() => {
    if (query.length >= 2) {
      const productResults = productsFuse.search(query);
      const faqResults = faqsFuse.search(query);
      
      // Combine and sort by score
      const combined = [...productResults, ...faqResults]
        .sort((a, b) => (a.score || 0) - (b.score || 0))
        .slice(0, 6);
      
      setResults(combined);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleResultClick = (result: SearchResult) => {
    if (result.item.store) {
      navigate(`/${result.item.store}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  const getIcon = (item: SearchResult['item']) => {
    if (item.question) return HelpCircle;
    if (item.store === 'grocery') return ShoppingCart;
    if (item.store === 'industrial') return Wrench;
    if (item.store === 'construction') return HardHat;
    return Search;
  };

  return (
    <>
      {/* Search Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:border-gray-400 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Search size={18} className="text-gray-400" />
        <span className="text-gray-500 text-sm hidden md:inline">Търси...</span>
        <kbd className="hidden md:inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-500 bg-gray-100 rounded">
          ⌘K
        </kbd>
      </motion.button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Search Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center px-4 py-4 border-b border-gray-200">
                  <Search size={20} className="text-gray-400 mr-3" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Търсене на продукти или въпроси..."
                    className="flex-1 outline-none text-gray-900 placeholder:text-gray-400"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X size={18} className="text-gray-400" />
                    </button>
                  )}
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto">
                  {query.length < 2 ? (
                    <div className="px-4 py-8 text-center text-gray-500 text-sm">
                      Въведете поне 2 символа за търсене
                    </div>
                  ) : results.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500 text-sm">
                      Няма резултати за "{query}"
                    </div>
                  ) : (
                    <div className="py-2">
                      {results.map((result, index) => {
                        const Icon = getIcon(result.item);
                        const isProduct = 'name' in result.item;
                        
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleResultClick(result)}
                            className={`px-4 py-3 hover:bg-gray-50 transition-colors ${
                              isProduct ? 'cursor-pointer' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className="p-2 rounded-lg flex-shrink-0"
                                style={{
                                  backgroundColor: result.item.color
                                    ? `${result.item.color}15`
                                    : '#F3F4F6',
                                }}
                              >
                                <Icon
                                  size={18}
                                  style={{
                                    color: result.item.color || '#6B7280',
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 mb-1">
                                  {isProduct ? result.item.name : result.item.question}
                                </h4>
                                {isProduct && result.item.category && (
                                  <p
                                    className="text-sm font-medium"
                                    style={{ color: result.item.color }}
                                  >
                                    {result.item.category}
                                  </p>
                                )}
                                {!isProduct && result.item.answer && (
                                  <p className="text-sm text-gray-600 line-clamp-2">
                                    {result.item.answer}
                                  </p>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
                  <span>Търсене с интелигентно съвпадение</span>
                  <kbd className="px-2 py-1 bg-white rounded border border-gray-200">ESC</kbd>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
