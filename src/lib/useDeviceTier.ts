import { useState, useEffect } from 'react';

export type DeviceTier = 'high' | 'medium' | 'low';

export interface DeviceCapabilities {
  tier: DeviceTier;
  isMobile: boolean;
  isReducedMotion: boolean;
  hasTouch: boolean;
  saveData: boolean;
}

export function useDeviceTier(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(() => {
    if (typeof window === 'undefined') {
      return {
        tier: 'high',
        isMobile: false,
        isReducedMotion: false,
        hasTouch: false,
        saveData: false,
      };
    }

    const isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // @ts-expect-error - Connection API
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = connection?.saveData || false;
    const effectiveType = connection?.effectiveType || '4g';

    // @ts-expect-error - Device Memory API
    const deviceMemory = navigator.deviceMemory || 8;
    const cores = navigator.hardwareConcurrency || 4;

    let tier: DeviceTier = 'high';

    if (isReducedMotion || saveData || effectiveType === '2g' || effectiveType === 'slow-2g' || deviceMemory < 3 || cores <= 2) {
      tier = 'low';
    } else if (effectiveType === '3g' || deviceMemory <= 4 || cores <= 4 || isMobile) {
      tier = 'medium';
    }

    return {
      tier,
      isMobile,
      isReducedMotion,
      hasTouch,
      saveData,
    };
  });

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setCapabilities(prev => ({
        ...prev,
        isReducedMotion: e.matches,
        tier: e.matches ? 'low' : prev.tier
      }));
    };

    motionQuery.addEventListener('change', handleMotionChange);
    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  return capabilities;
}
