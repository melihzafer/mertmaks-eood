"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Navigation, MapPin, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Store {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distance?: number;
  bearing?: number;
}

interface WebARFinderProps {
  stores: Store[];
  onClose: () => void;
}

export function WebARFinder({ stores, onClose }: WebARFinderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [deviceOrientation, setDeviceOrientation] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [storesWithDistance, setStoresWithDistance] = useState<Store[]>([]);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Calculate bearing (direction) to target
  const calculateBearing = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const y = Math.sin(dLon) * Math.cos((lat2 * Math.PI) / 180);
    const x =
      Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
      Math.sin((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.cos(dLon);
    let bearing = (Math.atan2(y, x) * 180) / Math.PI;
    return (bearing + 360) % 360;
  };

  // Request camera access
  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError("Камерата не е достъпна. Моля, разрешете достъп до камерата.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Request geolocation access
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation(position.coords);
        setPermissionGranted(true);
      },
      (err) => {
        setError("Локацията не е достъпна. Моля, разрешете достъп до локацията.");
      },
      { enableHighAccuracy: true, maximumAge: 1000 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // Request device orientation
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        // Alpha is the compass direction (0-360)
        setDeviceOrientation(event.alpha);
      }
    };

    // Request permission for iOS 13+
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((response: string) => {
          if (response === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        })
        .catch(() => {
          setError("Не може да се получи достъп до ориентацията на устройството.");
        });
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  // Calculate distances and bearings when user location changes
  useEffect(() => {
    if (userLocation) {
      const updatedStores = stores.map((store) => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          store.coordinates.lat,
          store.coordinates.lng
        );
        const bearing = calculateBearing(
          userLocation.latitude,
          userLocation.longitude,
          store.coordinates.lat,
          store.coordinates.lng
        );
        return { ...store, distance, bearing };
      });
      setStoresWithDistance(updatedStores.sort((a, b) => (a.distance || 0) - (b.distance || 0)));
    }
  }, [userLocation, stores]);

  // Haptic feedback on mount
  useEffect(() => {
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  }, []);

  const handleClose = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(30);
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black"
      >
        {/* Camera feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay UI */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 pointer-events-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-xl font-bold flex items-center gap-2">
                <Navigation className="w-6 h-6" />
                AR Навигация
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="absolute top-20 left-4 right-4 bg-red-500/90 text-white p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Store markers */}
          {permissionGranted && userLocation && (
            <div className="absolute inset-0 flex items-center justify-center">
              {storesWithDistance.slice(0, 3).map((store, index) => {
                if (!store.bearing || !store.distance) return null;

                // Calculate relative angle (store bearing - device orientation)
                let relativeAngle = store.bearing - deviceOrientation;
                if (relativeAngle < 0) relativeAngle += 360;
                if (relativeAngle > 360) relativeAngle -= 360;

                // Only show if within 60 degrees of current view
                const isVisible = relativeAngle < 60 || relativeAngle > 300;
                if (!isVisible) return null;

                // Calculate position on screen
                let screenX = 50; // Center
                if (relativeAngle < 180) {
                  screenX = 50 + (relativeAngle / 180) * 40; // 0-40% right
                } else {
                  screenX = 50 - ((360 - relativeAngle) / 180) * 40; // 0-40% left
                }

                return (
                  <motion.div
                    key={store.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="absolute pointer-events-auto"
                    style={{
                      left: `${screenX}%`,
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="bg-blue-500/90 text-white rounded-full p-4 shadow-2xl backdrop-blur-sm border-2 border-white/30">
                      <div className="flex flex-col items-center gap-2">
                        <MapPin className="w-8 h-8" />
                        <div className="text-center">
                          <div className="font-bold text-sm whitespace-nowrap">
                            {store.name.split(" ")[0]}
                          </div>
                          <div className="text-xs opacity-90">
                            {store.distance < 1
                              ? `${Math.round(store.distance * 1000)}m`
                              : `${store.distance.toFixed(1)}km`}
                          </div>
                        </div>
                        {/* Direction arrow */}
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <div
                            className="text-2xl"
                            style={{
                              transform: `rotate(${relativeAngle}deg)`,
                            }}
                          >
                            ↑
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Bottom info panel */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pointer-events-auto">
            {userLocation ? (
              <div className="space-y-3">
                <p className="text-white text-center text-sm opacity-90">
                  Насочете камерата към околността. Стрелките показват посоката към магазините.
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {storesWithDistance.slice(0, 3).map((store) => (
                    <div
                      key={store.id}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between"
                    >
                      <div className="text-white">
                        <div className="font-semibold text-sm">{store.name}</div>
                        <div className="text-xs opacity-75">
                          {store.distance
                            ? store.distance < 1
                              ? `${Math.round(store.distance * 1000)} метра`
                              : `${store.distance.toFixed(2)} км`
                            : ""}
                        </div>
                      </div>
                      <Navigation className="w-5 h-5 text-blue-400" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-white text-center">
                <p className="text-sm">Получаване на вашата локация...</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
