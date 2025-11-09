"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Navigation, MapPin, AlertCircle, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

// Extend DeviceOrientationEvent for iOS webkit properties
interface DeviceOrientationEventExtended extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

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
  const [compassHeading, setCompassHeading] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [storesWithDistance, setStoresWithDistance] = useState<Store[]>([]);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(true);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
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
  const calculateBearing = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
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
          video: { 
            facingMode: "environment",
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Camera error:", err);
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

  // Request geolocation access with high accuracy
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation(position.coords);
        setAccuracy(position.coords.accuracy);
        setPermissionGranted(true);
        
        // Calibration complete after first accurate reading
        if (position.coords.accuracy < 50) {
          setTimeout(() => setIsCalibrating(false), 2000);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Локацията не е достъпна. Моля, разрешете достъп до локацията.");
      },
      { 
        enableHighAccuracy: true, 
        maximumAge: 0,
        timeout: 5000
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // Request device orientation with improved iOS support
  useEffect(() => {
    let orientationHandler: ((event: DeviceOrientationEvent) => void) | null = null;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const extendedEvent = event as DeviceOrientationEventExtended;
      
      // Handle both alpha (compass) and webkitCompassHeading (iOS)
      if (event.alpha !== null) {
        // For Android and modern browsers
        let heading = event.alpha;
        
        // Adjust for device orientation - iOS provides true compass heading
        if (event.absolute && extendedEvent.webkitCompassHeading !== undefined) {
          heading = extendedEvent.webkitCompassHeading;
        }
        
        // Normalize heading
        heading = (heading + 360) % 360;
        setDeviceOrientation(heading);
        setCompassHeading(heading);
      } else if (extendedEvent.webkitCompassHeading !== undefined) {
        // iOS fallback
        const heading = extendedEvent.webkitCompassHeading;
        setDeviceOrientation(heading);
        setCompassHeading(heading);
      }
    };

    orientationHandler = handleOrientation;

    // Request permission for iOS 13+
    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        try {
          const response = await (DeviceOrientationEvent as any).requestPermission();
          if (response === "granted") {
            window.addEventListener("deviceorientation", handleOrientation, true);
            window.addEventListener("deviceorientationabsolute", handleOrientation, true);
          } else {
            setError("Моля, разрешете достъп до компаса в настройките.");
          }
        } catch (err) {
          console.error("Orientation permission error:", err);
          setError("Не може да се получи достъп до ориентацията на устройството.");
        }
      } else {
        // Non-iOS devices
        window.addEventListener("deviceorientation", handleOrientation, true);
        window.addEventListener("deviceorientationabsolute", handleOrientation, true);
      }
    };

    requestPermission();

    return () => {
      if (orientationHandler) {
        window.removeEventListener("deviceorientation", orientationHandler, true);
        window.removeEventListener("deviceorientationabsolute", orientationHandler, true);
      }
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
      setStoresWithDistance(
        updatedStores.sort((a, b) => (a.distance || 0) - (b.distance || 0))
      );
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
          <div className="absolute top-0 left-0 right-0 bg-linear-to-b from-black/70 to-transparent p-4 pointer-events-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Navigation className="w-6 h-6 text-white" />
                <div>
                  <h2 className="text-white text-xl font-bold">AR Навигация</h2>
                  {accuracy && (
                    <p className="text-white/70 text-xs">
                      Точност: {Math.round(accuracy)}m
                    </p>
                  )}
                </div>
              </div>
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

          {/* Calibration indicator */}
          {isCalibrating && (
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-blue-500/90 text-white px-6 py-3 rounded-full flex items-center gap-3">
              <Compass className="w-5 h-5 animate-spin" />
              <span className="text-sm font-medium">Калибриране на компаса...</span>
            </div>
          )}

          {/* Compass rose */}
          {compassHeading !== null && !isCalibrating && (
            <div className="absolute top-24 right-4 w-20 h-20 pointer-events-auto">
              <div className="relative w-full h-full bg-black/50 rounded-full backdrop-blur-sm border-2 border-white/30">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: -compassHeading }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                  <div className="text-white text-2xl font-bold">N</div>
                  <div className="absolute top-1 text-red-500">▲</div>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center text-white/50 text-xs">
                  <div className="absolute top-2">{Math.round(compassHeading)}°</div>
                </div>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="absolute top-20 left-4 right-4 bg-red-500/90 text-white p-4 rounded-lg flex items-start gap-3 pointer-events-auto">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
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
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-6 pointer-events-auto">
            {userLocation ? (
              <div className="space-y-3">
                <p className="text-white text-center text-sm opacity-90">
                  Насочете камерата към околността. Стрелките показват посоката
                  към магазините.
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {storesWithDistance.slice(0, 3).map((store) => (
                    <div
                      key={store.id}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between"
                    >
                      <div className="text-white">
                        <div className="font-semibold text-sm">
                          {store.name}
                        </div>
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
