import { useScroll, useTransform, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function ServiceStart() {
  const router = useRouter();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // 'target scrollposition'
    offset: ['center start', 'start center'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0]);
  // opacity에 따라 disabled 상태를 결정

  return (
    <div ref={ref} className='relative h-screen'>
      <motion.div style={{ opacity }} className='fixed inset-0 flex flex-col justify-center items-center text-white '>
        <h2 className='text-[86px] font-bold'>지금 바로 시작하세요</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className='duration-150 mt-8 py-2 px-8 text-2xl font-semibold rounded-[500px] bg-[#3cb643]'
          style={{ opacity }}
          onClick={() => router.push('/dashboard')}
        >
          서비스 이용하기
        </motion.button>
      </motion.div>
    </div>
  );
}
