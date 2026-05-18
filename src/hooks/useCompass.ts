import { useState, useEffect, useRef } from 'react';

interface CompassState {
  heading: number; // Smoothed magnetic heading
  trueHeading: number; // Corrected true heading
  accuracy: number; // Sensor accuracy in degrees
  declination: number; // Magnetic declination angle
  isCalibrated: boolean;
  error: string | null;
}

interface UseCompassOptions {
  userLocation?: { lat: number; lng: number };
  smoothingFactor?: number; // 0.0 - 1.0 (default 0.1)
  tiltThreshold?: number; // Degrees from vertical (90) allowed. Default 45 (45-135 range).
}

export const useCompass = ({ userLocation, smoothingFactor = 0.1, tiltThreshold = 45 }: UseCompassOptions = {}) => {
  const [state, setState] = useState<CompassState>({
    heading: 0,
    trueHeading: 0,
    accuracy: -1,
    declination: 0,
    isCalibrated: true,
    error: null,
  });

  const [permissionGranted, setPermissionGranted] = useState(false);
  const [needsPermission, setNeedsPermission] = useState(false);

  const headingRef = useRef(0);

  // Check initial permission requirement
  useEffect(() => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      setNeedsPermission(true);
    } else {
      setPermissionGranted(true);
    }
  }, []);

  // Fetch Magnetic Declination
  useEffect(() => {
    if (!userLocation) return;
    
    let cancelled = false;
    const fetchDeclination = async () => {
      try {
        const { lat, lng } = userLocation;
        // 5 second timeout
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 5000);
        
        const res = await fetch(
            `https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?lat1=${lat}&lon1=${lng}&resultFormat=json`, 
            { signal: controller.signal }
        ).catch(() => null); 
        
        clearTimeout(id);

        if (!cancelled && res && res.ok) {
          const data = await res.json();
          if (data.result && data.result.length > 0) {
            setState(prev => ({ ...prev, declination: data.result[0].declination }));
          }
        }
      } catch (err) {
        // Ignore
      }
    };
    
    fetchDeclination();
    return () => { cancelled = true; };
  }, [userLocation?.lat, userLocation?.lng]);


  // Handle Orientation
  useEffect(() => {
    if (!permissionGranted) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      let compassHeading = 0;
      let accuracy = -1;

      // Filter Tilt (Beta: Front/Back tilt)
      // Ideal AR position is Vertical (90deg).
      // Flat on table is 0deg. Upside down is 180deg.
      // If deviation from 90 is > threshold, we ignore the update to prevent jitter.
      const beta = e.beta || 0;
      const deviation = Math.abs(beta - 90);
      
      if (deviation > tiltThreshold) {
         // Too flat or too inverted - skip update to stabilize
         return; 
      }

      // iOS WebKit
      if ((e as any).webkitCompassHeading !== undefined) {
        compassHeading = (e as any).webkitCompassHeading;
        accuracy = (e as any).webkitCompassAccuracy || -1;
      } 
      // Android / Standards
      else if (e.alpha !== null) {
        compassHeading = 360 - e.alpha;
      }

      // Normalize 0-360
      compassHeading = (compassHeading + 360) % 360;

      // EMA Smoothing
      let current = headingRef.current;
      let diff = compassHeading - current;
      
      // Shortest path interpolation
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      const newHeading = current + diff * smoothingFactor;
      const normalizedHeading = (newHeading + 360) % 360;
      
      headingRef.current = normalizedHeading;

      setState(prev => ({
        ...prev,
        heading: normalizedHeading,
        trueHeading: (normalizedHeading + prev.declination + 360) % 360,
        accuracy: accuracy,
        isCalibrated: accuracy !== -1 ? accuracy < 15 : true,
      }));
    };

    const eventName = 'ondeviceorientationabsolute' in window ? 'deviceorientationabsolute' : 'deviceorientation';
    window.addEventListener(eventName, handleOrientation as EventListener, true);

    return () => {
      window.removeEventListener(eventName, handleOrientation as EventListener, true);
    };
  }, [permissionGranted, smoothingFactor, tiltThreshold]);

  const requestPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setPermissionGranted(true);
          return true;
        }
      } catch (e) {
        console.error("Permission request failed", e);
      }
      return false;
    }
    setPermissionGranted(true);
    return true;
  };

  return { 
      ...state, 
      requestPermission, 
      needsPermission: needsPermission && !permissionGranted 
  };
};
