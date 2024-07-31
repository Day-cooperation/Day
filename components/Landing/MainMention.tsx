import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function MainMention({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // 'target scrollposition'
    offset: ['center start', 'start center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  return (
    <motion.div ref={ref} className='relative h-screen'>
      <motion.h2
        style={{ opacity }}
        className='fixed inset-0 flex justify-center items-center text-center text-[#fff] text-[86px] font-bold'
      >
        {children}
      </motion.h2>
    </motion.div>
  );
}
