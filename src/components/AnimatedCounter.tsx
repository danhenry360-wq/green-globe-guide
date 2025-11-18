import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration: number;
  suffix: string;
  label: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ from, to, duration, suffix, label }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, Math.round);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  React.useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration });
      return controls.stop;
    }
  }, [inView, count, to, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold text-foreground mb-1">
        {label === "Updated" ? (
          <span className="text-white">{suffix}</span>
        ) : (
          <motion.span className="text-white">{rounded}</motion.span>
        )}
        <span className="text-green-500">{label !== "Updated" && suffix}</span>
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

export default AnimatedCounter;
