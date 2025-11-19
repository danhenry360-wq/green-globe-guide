import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  end: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  React.useEffect(() => {
    if (inView) {
      const controls = animate(count, end, { duration: 2 });
      return controls.stop;
    }
  }, [inView, count, end]);

  return (
    <motion.span ref={ref}>
      {rounded}
    </motion.span>
  );
};

export default AnimatedCounter;
