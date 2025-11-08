import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const pages = [
  { path: '/', label: 'Начало' },
  { path: '/supermarket', label: 'Супермаркет', color: '#E53E3E' },
  { path: '/industrial', label: 'Промишлени', color: '#D53F8C' },
  { path: '/construction', label: 'Строителство', color: '#3182CE' },
  { path: '/contact', label: 'Контакти' },
];

export function MobileNavIndicator() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  const currentIndex = pages.findIndex(p => p.path === pathname);
  
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
      <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-gray-200">
        {pages.map((page, index) => {
          const isActive = index === currentIndex;
          
          return (
            <motion.div
              key={page.path}
              className="relative"
              animate={{
                scale: isActive ? 1 : 0.6,
                opacity: isActive ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: isActive
                    ? page.color || '#1A1A1A'
                    : '#D1D5DB',
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
