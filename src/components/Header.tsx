import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { SmartSearch } from './SmartSearch';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Начало' },
    { to: '/grocery', label: 'Супермаркет', accent: '#E53E3E' },
    { to: '/industrial', label: 'Промишлени Стоки', accent: '#D53F8C' },
    { to: '/construction', label: 'Строителство', accent: '#3182CE' },
    { to: '/about', label: 'За Нас' },
    { to: '/contact', label: 'Контакти' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-pink-500 to-red-600 shadow-lg"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xl text-white font-bold">M</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-gray-900">MERTMAX</span>
              <span className="text-xs text-gray-500 font-medium">EOOD</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <SmartSearch />
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-4 py-2 group"
                >
                  <span
                    className={`relative z-10 font-medium transition-colors duration-300 ${
                      isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                  </span>
                  
                  {/* Animated Underline */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2"
                    style={{ backgroundColor: link.accent || '#1A1A1A' }}
                    initial={{ width: isActive ? '60%' : '0%' }}
                    whileHover={{ width: '60%' }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* Hover Background */}
                  {link.accent && (
                    <motion.div
                      className="absolute inset-0 rounded-lg -z-10"
                      style={{ backgroundColor: link.accent }}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.08 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-gray-200"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.to;
                  
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                          isActive
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        style={
                          isActive && link.accent
                            ? { backgroundColor: link.accent, color: 'white' }
                            : {}
                        }
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
