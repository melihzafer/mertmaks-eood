import { MapPin, Phone, Clock, Mail, ShoppingCart, Wrench, HardHat, Send, Check } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { Card } from './ui/card';
import { WebARButton } from './WebARButton';

// Helper function to check store status
const getStoreStatus = (openTime: number, closeTime: number) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinutes;
  const openTimeInMinutes = openTime * 60;
  const closeTimeInMinutes = closeTime * 60;

  if (currentTimeInMinutes < openTimeInMinutes || currentTimeInMinutes >= closeTimeInMinutes) {
    return { status: 'Затворено', color: '#EF4444', textColor: 'text-red-600' };
  } else if (currentTimeInMinutes >= closeTimeInMinutes - 60) {
    return { status: 'Затваря скоро', color: '#F59E0B', textColor: 'text-yellow-600' };
  } else {
    return { status: 'Отворено', color: '#10B981', textColor: 'text-green-600' };
  }
};

const stores = [
  {
    name: 'Супермаркет MERTMAX',
    icon: ShoppingCart,
    color: '#E53E3E',
    address: 'ул. Главна 1, с. Самуил, обл. Разград',
    phone: '+359 XXX XXX 001',
    hours: 'Понеделник - Неделя: 8:00 - 20:00',
    email: 'supermarket@mertmax.bg',
    position: { top: '40%', left: '35%' },
    openTime: 8,
    closeTime: 20,
  },
  {
    name: 'Промишлени Стоки MERTMAX',
    icon: Wrench,
    color: '#D53F8C',
    address: 'ул. Главна 2, с. Самуил, обл. Разград',
    phone: '+359 XXX XXX 002',
    hours: 'Понеделник - Неделя: 8:00 - 20:00',
    email: 'industrial@mertmax.bg',
    position: { top: '50%', left: '50%' },
    openTime: 8,
    closeTime: 20,
  },
  {
    name: 'Строителство MERTMAX',
    icon: HardHat,
    color: '#3182CE',
    address: 'ул. Главна 3, с. Самуил, обл. Разград',
    phone: '+359 XXX XXX 003',
    hours: 'Понеделник - Неделя: 8:00 - 20:00',
    email: 'construction@mertmax.bg',
    position: { top: '45%', left: '65%' },
    openTime: 8,
    closeTime: 20,
  },
];

export function ContactPage() {
  const storesRef = useRef(null);
  const mapRef = useRef(null);
  const formRef = useRef(null);
  const isStoresInView = useInView(storesRef, { once: true, margin: "-100px" });
  const isMapInView = useInView(mapRef, { once: true, margin: "-100px" });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedStore, setSelectedStore] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-4rem)]"
    >
      {/* WebAR Button - Mobile Only */}
      <WebARButton />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Свържете Се с Нас
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl text-gray-600"
            >
              Всички наши магазини се намират в с. Самуил, обл. Разград
            </motion.p>
          </div>
        </div>
      </section>

      {/* Store Locations */}
      <section className="py-24 container mx-auto px-4" ref={storesRef}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isStoresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Нашите Магазини</h2>
            <p className="text-xl text-gray-600">
              Посетете ни на едно от нашите три удобни местоположения
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stores.map((store, index) => {
              const Icon = store.icon;

              return (
                <motion.div
                  key={store.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isStoresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <Card className="p-8 border-2 hover:shadow-xl transition-all duration-300 group" style={{ borderColor: `${store.color}20` }}>
                    <motion.div
                      className="p-5 rounded-2xl mb-6 inline-block"
                      style={{ backgroundColor: store.color }}
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="text-white" size={36} />
                    </motion.div>
                    <h3 className="text-2xl font-semibold mb-6" style={{ color: store.color }}>{store.name}</h3>
                    
                    <div className="space-y-4">
                      <motion.div
                        className="flex items-start space-x-3"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MapPin size={20} className="flex-shrink-0 text-gray-400 mt-0.5" />
                        <p className="text-gray-600">{store.address}</p>
                      </motion.div>
                      
                      <motion.div
                        className="flex items-center space-x-3"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Phone size={20} className="flex-shrink-0 text-gray-400" />
                        <a href={`tel:${store.phone}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                          {store.phone}
                        </a>
                      </motion.div>
                      
                      <motion.div
                        className="flex items-center space-x-3"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Mail size={20} className="flex-shrink-0 text-gray-400" />
                        <a href={`mailto:${store.email}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                          {store.email}
                        </a>
                      </motion.div>
                      
                      <motion.div
                        className="flex items-start space-x-3"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Clock size={20} className="flex-shrink-0 text-gray-400 mt-0.5" />
                        <p className="text-gray-600">{store.hours}</p>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="bg-gray-50 py-24" ref={mapRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={isMapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center text-4xl md:text-5xl font-bold text-gray-900 mb-12"
            >
              Как Да Ни Намерите
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isMapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-gradient-to-br from-blue-100 via-gray-100 to-pink-100 rounded-3xl h-[500px] relative overflow-hidden shadow-2xl"
            >
              {/* Stylized Map Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(#E5E5E5 1px, transparent 1px), linear-gradient(90deg, #E5E5E5 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }} />
              </div>

              {/* Store Pins */}
              {stores.map((store, index) => {
                const Icon = store.icon;
                const isSelected = selectedStore === index;
                const storeStatus = getStoreStatus(store.openTime, store.closeTime);

                return (
                  <motion.div
                    key={store.name}
                    className="absolute cursor-pointer"
                    style={store.position}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isMapInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.4 + index * 0.2,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setSelectedStore(isSelected ? null : index)}
                  >
                    <motion.div
                      className="relative"
                      animate={isSelected ? { y: [0, -10, 0] } : {}}
                      transition={{ duration: 0.6, repeat: isSelected ? Infinity : 0 }}
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl relative"
                        style={{ backgroundColor: store.color }}
                      >
                        <Icon className="text-white" size={28} />
                        
                        {/* Status Indicator */}
                        <motion.div
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-lg"
                          style={{ backgroundColor: storeStatus.color }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      
                      {/* Pin pointer */}
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                        style={{
                          borderLeft: '8px solid transparent',
                          borderRight: '8px solid transparent',
                          borderTop: `12px solid ${store.color}`,
                        }}
                      />

                      {/* Info Popup */}
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-white rounded-2xl shadow-2xl p-4"
                          style={{ borderTop: `4px solid ${store.color}` }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold" style={{ color: store.color }}>{store.name}</h4>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${storeStatus.textColor} bg-opacity-10`} style={{ backgroundColor: storeStatus.color }}>
                              {storeStatus.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{store.address}</p>
                          <a
                            href={`https://www.google.com/maps/search/${encodeURIComponent(store.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium hover:underline"
                            style={{ color: store.color }}
                          >
                            Вижте в Google Maps →
                          </a>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Location Label */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-6 py-3 rounded-full shadow-lg">
                <div className="flex items-center space-x-2">
                  <MapPin size={20} className="text-gray-600" />
                  <span className="font-semibold text-gray-900">с. Самуил, обл. Разград</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 container mx-auto px-4" ref={formRef}>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Имате Въпроси?</h2>
            <p className="text-xl text-gray-600">
              Изпратете ни съобщение и ние ще се свържем с вас
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 50 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="relative">
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="peer w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-gray-900 focus:outline-none transition-colors"
                placeholder=" "
              />
              <label
                htmlFor="name"
                className="absolute left-6 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
              >
                Име
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="peer w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-gray-900 focus:outline-none transition-colors"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute left-6 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
              >
                Email
              </label>
            </div>

            <div className="relative">
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="peer w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-gray-900 focus:outline-none transition-colors resize-none"
                placeholder=" "
              />
              <label
                htmlFor="message"
                className="absolute left-6 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
              >
                Съобщение
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="w-full py-4 rounded-full font-semibold text-lg shadow-xl transition-all duration-300 overflow-hidden relative"
              style={{
                backgroundColor: isSuccess ? '#10B981' : '#1A1A1A',
                color: 'white',
              }}
              whileHover={{ scale: isSuccess ? 1 : 1.02 }}
              whileTap={{ scale: isSuccess ? 1 : 0.98 }}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  </motion.div>
                ) : isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Check size={24} />
                    <span>Изпратено успешно!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <span>Изпрати</span>
                    <Send size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>
        </div>
      </section>
    </motion.div>
  );
}
