import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function ServiceStart() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // 'target scrollposition'
    offset: ['center start', 'start center'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  // opacity에 따라 disabled 상태를 결정

  const [isClickable, setIsClickable] = useState(false);
  useMotionValueEvent(scrollYProgress, 'change', (lastest) => {
    lastest === 1 ? setIsClickable(false) : setIsClickable(true);
  });
  return (
    <div ref={ref} className='relative h-screen'>
      <motion.div style={{ opacity }} className='fixed inset-0 flex flex-col justify-center items-center text-white '>
        <h2 className='text-[43px] md:text-[86px] font-bold break-keep break-words text-center'>
          지금 바로 시작하세요
        </h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className='duration-150 mt-4 md:mt-8 py-1 px-4 md:py-2 md:px-8 text-lg md:text-2xl font-semibold rounded-[500px] bg-[#3cb643]'
          onClick={() => signIn()}
          disabled={!isClickable}
        >
          서비스 이용하기
        </motion.button>
      </motion.div>
    </div>
  );
}
