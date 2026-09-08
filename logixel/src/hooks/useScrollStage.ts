import { useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { clamp } from '../utils/path';

export function useScrollStage(stageCount: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [stage, setStage] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setStage(clamp(v, 0, 1) * (stageCount - 1));
  });

  return { ref, stage };
}
