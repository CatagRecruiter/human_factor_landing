import { useEffect, useState } from 'react';

export function NumberTicker({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = displayValue;
    const duration = 400; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Apple ease-out cubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (value - startValue) * easeProgress);
      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value]);

  return (
    <span className="t-nums">
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}
