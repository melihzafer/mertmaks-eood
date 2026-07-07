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
    <div className="store-info-card">
      {/* Store Name & Status */}
      <div>
        <h2 className="store-info-title">{store.name}</h2>
        <div className={`store-info-status ${status?.isOpen ? 'open' : 'closed'}`}>
          <div className={`store-info-status-dot ${status?.isOpen ? 'open' : 'closed'} animate-pulse`} />
          <span>
            {status?.message ?? 'Проверка на работното време'}
          </span>
        </div>
      </div>
      
      {/* Contact Info */}
      <div className="store-info-contact-list">
        <div className="store-info-contact-item">
          <MapPin className="w-5 h-5" />
          <div>
            <p style={{ fontWeight: 600 }}>{store.address}</p>
            <p className="muted" style={{ fontSize: '13px' }}>{store.city}, {store.region}</p>
          </div>
        </div>
        
        <div className="store-info-contact-item">
          <Phone className="w-5 h-5" />
          <a href={`tel:${store.phone}`}>
            {store.phone}
          </a>
        </div>
        
        <div className="store-info-contact-item">
          <Mail className="w-5 h-5" />
          <a href={`mailto:${store.email}`}>
            {store.email}
          </a>
        </div>
      </div>
      
      {/* Business Hours */}
      <div>
        <h3 className="store-info-section-title">
          <Clock className="w-5 h-5" />
          Работно време
        </h3>
        
        <div className="store-info-hours-list">
          {formattedHours.map((item) => (
            <div
              key={item.day}
              className={`store-info-hours-row ${item.isToday ? 'today' : ''}`}
            >
              <span>{item.day}</span>
              <span>{item.hours}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Features */}
      {store.features && store.features.length > 0 && (
        <div className="store-info-features">
          <h3 className="store-info-section-title">Асортимент</h3>
          <div className="store-info-tags">
            {store.features.map((feature) => (
              <span key={feature} className="store-info-tag">
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
