import { useState, useEffect, ReactNode } from 'react';

interface PerformanceDetectorProps {
  children: ReactNode;
  fallback: ReactNode;
}

export function PerformanceDetector({ children, fallback }: PerformanceDetectorProps) {
  const [shouldUseHighPerf, setShouldUseHighPerf] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check device memory (if available)
    const deviceMemory = (navigator as any).deviceMemory;
    const hasLowMemory = deviceMemory && deviceMemory < 4;
    
    // Check hardware concurrency (CPU cores)
    const cpuCores = navigator.hardwareConcurrency || 4;
    const hasLowCPU = cpuCores < 4;
    
    // Check if mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Check connection speed (if available)
    const connection = (navigator as any).connection;
    const hasSlowConnection = connection && 
      (connection.effectiveType === 'slow-2g' || 
       connection.effectiveType === '2g' ||
       connection.saveData);

    // Determine if we should use high performance mode
    const useHighPerf = !prefersReducedMotion && 
                        !hasLowMemory && 
                        !hasLowCPU && 
                        !hasSlowConnection &&
                        (!isMobile || deviceMemory >= 4);

    setShouldUseHighPerf(useHighPerf);

    // Log performance info for debugging
    console.log('Performance Detection:', {
      prefersReducedMotion,
      deviceMemory,
      cpuCores,
      isMobile,
      effectiveType: connection?.effectiveType,
      useHighPerf,
    });
  }, []);

  return <>{shouldUseHighPerf ? children : fallback}</>;
}

// Hook version for components
export function usePerformanceMode() {
  const [mode, setMode] = useState<'high' | 'low'>('high');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const deviceMemory = (navigator as any).deviceMemory;
    const hasLowMemory = deviceMemory && deviceMemory < 4;
    const cpuCores = navigator.hardwareConcurrency || 4;
    const hasLowCPU = cpuCores < 4;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const connection = (navigator as any).connection;
    const hasSlowConnection = connection && 
      (connection.effectiveType === 'slow-2g' || 
       connection.effectiveType === '2g' ||
       connection.saveData);

    const useHighPerf = !prefersReducedMotion && 
                        !hasLowMemory && 
                        !hasLowCPU && 
                        !hasSlowConnection &&
                        (!isMobile || deviceMemory >= 4);

    setMode(useHighPerf ? 'high' : 'low');
  }, []);

  return mode;
}
