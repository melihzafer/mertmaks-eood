'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Store } from '@/lib/stores';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface LeafletMapProps {
  stores: Store[];
  height?: string;
}

export default function LeafletMap({ stores, height = '500px' }: LeafletMapProps) {
  // Calculate center and zoom to fit all stores
  const lats = stores.map(s => s.coordinates.lat);
  const lngs = stores.map(s => s.coordinates.lng);
  const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;

  return (
    <div className='rounded-xl overflow-hidden border shadow-md' style={{ height }}>
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={[store.coordinates.lat, store.coordinates.lng]}
          >
            <Popup>
              <div className='p-2'>
                <h3 className='font-semibold text-base mb-1'>{store.name}</h3>
                <p className='text-sm text-gray-600 mb-2'>{store.address}</p>
                <p className='text-xs text-gray-500 mb-2'>
                  Тел: <a href={'tel:' + store.phone} className='text-red-600 hover:underline'>{store.phone}</a>
                </p>
                <a
                  href={'https://www.google.com/maps/dir//' + store.coordinates.lat + ',' + store.coordinates.lng}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-red-600 hover:text-red-700 font-medium'
                >
                  Получи указания >
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

