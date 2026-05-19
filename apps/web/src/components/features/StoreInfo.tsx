'use client';

import { useEffect, useState } from 'react';
import { Store, getStoreStatus, getFormattedHours } from '@/lib/stores';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';

interface StoreInfoProps {
  store: Store;
}

/**
 * StoreInfo - Client Component displaying store details and current status
 * 
 * Features:
 * - Live open/closed status (updates every minute)
 * - Business hours grid with today highlighted
 * - Contact information
 * - Address with map icon
 */
export function StoreInfo({ store }: StoreInfoProps) {
  const [status, setStatus] = useState<ReturnType<typeof getStoreStatus> | null>(null);
  
  // Update status every minute
  useEffect(() => {
    setStatus(getStoreStatus(store));
    const interval = setInterval(() => {
      setStatus(getStoreStatus(store));
    }, 60000); // Update every 60 seconds
    
    return () => clearInterval(interval);
  }, [store]);
  
  const formattedHours = getFormattedHours(store);
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Store Name & Status */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{store.name}</h2>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${status?.isOpen ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
          <span className={`text-lg font-semibold ${status?.isOpen ? 'text-green-700' : 'text-red-700'}`}>
            {status?.message ?? 'Проверка на работното време'}
          </span>
        </div>
      </div>
      
      {/* Contact Info */}
      <div className="space-y-4 mb-8 pb-8 border-b border-gray-200">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gray-500 mt-1 shrink-0" />
          <div>
            <p className="text-gray-900 font-medium">{store.address}</p>
            <p className="text-gray-600 text-sm">{store.city}, {store.region}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-gray-500 shrink-0" />
          <a href={`tel:${store.phone}`} className="text-gray-900 hover:text-red-600 transition-colors">
            {store.phone}
          </a>
        </div>
        
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-gray-500 shrink-0" />
          <a href={`mailto:${store.email}`} className="text-gray-900 hover:text-red-600 transition-colors">
            {store.email}
          </a>
        </div>
      </div>
      
      {/* Business Hours */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Работно време
        </h3>
        
        <div className="space-y-2">
          {formattedHours.map((item) => (
            <div
              key={item.day}
              className={`flex justify-between items-center p-3 rounded-lg transition-colors ${
                item.isToday 
                  ? 'bg-red-50 border-2 border-red-200' 
                  : 'bg-gray-50'
              }`}
            >
              <span className={`font-medium ${item.isToday ? 'text-red-900' : 'text-gray-700'}`}>
                {item.day}
              </span>
              <span className={`${item.isToday ? 'text-red-700 font-semibold' : 'text-gray-600'}`}>
                {item.hours}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Features */}
      {store.features && store.features.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Асортимент</h3>
          <div className="flex flex-wrap gap-2">
            {store.features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
