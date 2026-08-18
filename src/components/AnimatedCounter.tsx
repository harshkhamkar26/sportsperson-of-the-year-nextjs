import React, { useEffect, useState, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({ value, duration = 2, className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });
  
  // Initialize with the target value for SSR to prevent "0" from flashing or staying on screen
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (inView) {
      // Start the animation by setting the spring target
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      // If the animation has started, update the display value
      if (latest > 0) {
        setDisplayValue(Math.floor(latest));
      }
    });
  }, [springValue]);

  return <span ref={ref} className={className}>{displayValue}</span>;
}
