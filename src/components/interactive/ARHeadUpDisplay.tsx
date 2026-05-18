"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Navigation, Compass, MapPin, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCompass } from "@/hooks/useCompass";

/**
 * TYPES
 */
interface Store {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  address?: string;
}

interface ARHeadUpDisplayProps {
  stores: Store[];
  onClose: () => void;
}

/**
 * HELPER: Calculate distance (Haversine)
 */
const getDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Earth radius km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/**
 * HELPER: Calculate Bearing
 */
const getBearing = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos((lat2 * Math.PI) / 180);
  const x =
    Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
    Math.sin((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.cos(dLon);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
};



export default function ARHeadUpDisplay({ stores, onClose }: ARHeadUpDisplayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const { trueHeading: heading, needsPermission, requestPermission, isCalibrated, accuracy } = useCompass({ 
    userLocation: userLoc
  });
  const [started, setStarted] = useState(false);

  // Initialize Camera
  useEffect(() => {
    if (!started) return;
    
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(console.error);
        }
      })
      .catch((err) => console.error("Camera failed", err));

    const watchId = navigator.geolocation.watchPosition(
      (pos) => setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      console.error,
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [started]);

  // Calculate targets relative to user
  const targets = useMemo(() => {
    if (!userLoc) return [];
    return stores
      .map((store) => ({
        ...store,
        dist: getDistanceKm(userLoc.lat, userLoc.lng, store.coordinates.lat, store.coordinates.lng),
        bearing: getBearing(userLoc.lat, userLoc.lng, store.coordinates.lat, store.coordinates.lng),
      }))
      .sort((a, b) => a.dist - b.dist); // Closest first
  }, [userLoc, stores]);

  const nearestTarget = targets[0];

  // Start sequence
  const handleStart = () => {
    setStarted(true);
    if (needsPermission) requestPermission();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white font-sans overflow-hidden">
      {/* 1. INITIAL STATE (Permission Request) */}
      {!started && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gray-900 z-50">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <Compass className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Стартиране на AR</h2>
          <p className="text-gray-400 text-center mb-8 max-w-xs">
            За най-добри резултати, използвайте устройството във вертикална позиция.
          </p>
          <Button onClick={handleStart} size="lg" className="w-full max-w-sm text-lg py-6 bg-blue-600 hover:bg-blue-500">
            Започни Навигация
          </Button>
          <Button onClick={onClose} variant="ghost" className="mt-4">
            Отказ
          </Button>
        </div>
      )}

      {/* 2. CAMERA FEED */}
      <video
        ref={videoRef}
        playsInline
        muted
        autoPlay
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* 3. UI OVERLAY */}
      {started && (
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          
          {/* --- TOP: COMPASS STRIP (The "Tape") --- */}
          <div className="bg-black/60 backdrop-blur-md pt-safe-top pb-4 border-b border-white/10 pointer-events-auto">
             <div className="flex justify-between items-center px-4 py-2">
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                   <span className="text-xs font-mono text-green-400">GPS ACTIVE</span>
                </div>
                <Button size="icon" variant="ghost" onClick={onClose} className="h-8 w-8 rounded-full bg-black/40">
                  <X className="w-4 h-4"/>
                </Button>
             </div>

             {/* Calibration Warning */}
             {!isCalibrated && heading !== 0 && (
               <div className="bg-red-500/80 mx-4 mt-2 p-2 rounded flex items-center justify-center gap-2 animate-pulse">
                  <RotateCcw className="w-4 h-4 text-white" />
                  <span className="text-xs font-bold text-white">
                      Please waive phone in figure-8 ({Math.round(accuracy)}° ±)
                  </span>
               </div>
             )}

             {/* The Compass Tape */}
             <div className="relative w-full h-16 overflow-hidden mt-2 mask-linear-fade">
                {/* Center Indicator */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-yellow-500 z-10 transform -translate-x-1/2 shadow-[0_0_10px_yellow]" />
                
                {/* Scrolling Ticks */}
                <motion.div 
                  className="absolute top-0 left-1/2 h-full flex items-center"
                  style={{ x: -heading * 10 }} // 1 degree = 10px pixel shift
                  transition={{ type: "spring", stiffness: 300, damping: 30 }} // Smooth movement
                >
                  {/* Generate 360 degrees of ticks + buffer for wrapping */}
                  {Array.from({ length: 72 }).map((_, i) => {
                     const deg = i * 5; // 5 degree increments
                     const isCardinal = deg % 90 === 0;
                     return (
                       <div key={i} className="absolute flex flex-col items-center" style={{ left: `${deg * 10}px` }}>
                          <span className={cn("text-xs font-bold", isCardinal ? "text-white text-lg" : "text-gray-500")}>
                            {deg === 0 ? "N" : deg === 90 ? "E" : deg === 180 ? "S" : deg === 270 ? "W" : deg === 360 ? "N" : "|"}
                          </span>
                       </div>
                     )
                  })}

                  {/* Store Icons on the Tape */}
                  {targets.map(target => {
                     // Normalize bearing relative to current heading for "infinite" strip effect
                     // (Simplified for this demo: placing absolute on the big strip)
                     return (
                        <div 
                          key={target.id} 
                          className="absolute -top-1 flex flex-col items-center w-32"
                          style={{ left: `${target.bearing * 10}px`, transform: 'translateX(-50%)' }}
                        >
                           <MapPin className="w-8 h-8 text-blue-500 fill-blue-500/20 drop-shadow-lg" />
                           <span className="text-[10px] font-bold bg-black/50 px-2 rounded text-white truncate max-w-full">
                              {target.name}
                           </span>
                        </div>
                     )
                  })}
                </motion.div>
             </div>
          </div>

          {/* --- CENTER: RETICLE --- */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50">
             <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full"/>
             </div>
          </div>

          {/* --- BOTTOM: INFO & ACTIONS --- */}
          <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-auto pb-8">
            {nearestTarget ? (
              <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-2xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{nearestTarget.name}</h3>
                    <p className="text-sm text-gray-400">{nearestTarget.address || "МЕРТМАКС ЕООД"}</p>
                  </div>
                  <div className="text-right">
                     <span className="text-2xl font-mono font-bold text-blue-400">
                        {nearestTarget.dist < 1 ? Math.round(nearestTarget.dist * 1000) : nearestTarget.dist.toFixed(1)}
                     </span>
                     <span className="text-xs text-gray-500 block uppercase">{nearestTarget.dist < 1 ? "метра" : "км"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Google Maps Deep Link (The Reliable Fallback) */}
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-500"
                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${nearestTarget.coordinates.lat},${nearestTarget.coordinates.lng}&travelmode=driving`)}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Навигация
                  </Button>
                  
                  {/* Reload/Recalibrate */}
                  <Button variant="outline" className="w-full border-white/20 hover:bg-white/10" onClick={() => window.location.reload()}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Калибриране
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">Търсене на магазини...</div>
            )}
          </div>
          
        </div>
      )}
    </div>
  );
}
