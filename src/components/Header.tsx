'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Начало' },
  { href: '/supermarket', label: 'Хранителен' },
  { href: '/industrial', label: 'Индустриален' },
  { href: '/construction', label: 'Строителен' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className='sticky top-0 z-40 bg-white border-b shadow-sm'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <Link href='/' className='flex items-center gap-2'>
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              className='text-2xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-blue-600 bg-clip-text text-transparent'
            >
              МЕРТМАКС
            </motion.div>
          </Link>

          <nav className='hidden md:flex items-center gap-1'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='relative px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors'
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId='underline'
                    className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-pink-600 to-blue-600'
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className='flex items-center gap-2'>
            <button
              className='md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label='Меню'
            >
              {isMobileMenuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='md:hidden border-t'
          >
            <div className='container mx-auto px-4 py-4 flex flex-col gap-2'>
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
                    className='block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors'
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
