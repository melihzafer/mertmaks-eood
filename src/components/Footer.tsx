import { MapPin, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
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
            </div>
            <p className="text-gray-600 leading-relaxed">
              Вашият доверен партньор за хранителни стоки, промишлени продукти и строителни материали в Самуил и Разград.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Бързи Връзки</h3>
            <div className="flex flex-col space-y-3">
              <Link 
                to="/grocery" 
                className="text-gray-600 hover:text-[#E53E3E] transition-colors duration-300 inline-flex items-center group"
              >
                <motion.span
                  className="w-0 group-hover:w-2 h-0.5 bg-[#E53E3E] mr-0 group-hover:mr-2 transition-all duration-300"
                />
                Супермаркет
              </Link>
              <Link 
                to="/industrial" 
                className="text-gray-600 hover:text-[#D53F8C] transition-colors duration-300 inline-flex items-center group"
              >
                <motion.span
                  className="w-0 group-hover:w-2 h-0.5 bg-[#D53F8C] mr-0 group-hover:mr-2 transition-all duration-300"
                />
                Промишлени Стоки
              </Link>
              <Link 
                to="/construction" 
                className="text-gray-600 hover:text-[#3182CE] transition-colors duration-300 inline-flex items-center group"
              >
                <motion.span
                  className="w-0 group-hover:w-2 h-0.5 bg-[#3182CE] mr-0 group-hover:mr-2 transition-all duration-300"
                />
                Строителство
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-gray-900 transition-colors duration-300 inline-flex items-center group"
              >
                <motion.span
                  className="w-0 group-hover:w-2 h-0.5 bg-gray-900 mr-0 group-hover:mr-2 transition-all duration-300"
                />
                За Нас
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-600 hover:text-gray-900 transition-colors duration-300 inline-flex items-center group"
              >
                <motion.span
                  className="w-0 group-hover:w-2 h-0.5 bg-gray-900 mr-0 group-hover:mr-2 transition-all duration-300"
                />
                Контакти
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Контакти</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start space-x-3 text-gray-600">
                <MapPin size={20} className="mt-1 flex-shrink-0 text-gray-400" />
                <span>с. Самуил, обл. Разград, България</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone size={20} className="flex-shrink-0 text-gray-400" />
                <a href="tel:+359XXXXXXXXX" className="hover:text-gray-900 transition-colors">
                  +359 XXX XXX XXX
                </a>
              </div>
              <div className="flex items-start space-x-3 text-gray-600">
                <Clock size={20} className="mt-1 flex-shrink-0 text-gray-400" />
                <span>Пон-Нед: 8:00 - 20:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} MERTMAX EOOD. Всички права запазени.
          </p>
        </div>
      </div>
    </footer>
  );
}
