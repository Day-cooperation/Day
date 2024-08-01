import { DayLogo } from '@/assets/svgs/DayLogo';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

const FIRST_HASHTAG_LIST = [
  '오늘의할일',
  '일정관리',
  '생산성',
  '할일체크',
  '목표달성',
  '작업관리',
  '시간관리',
  '효율적삶',
  '계획세우기',
  '투두리스트',
  '프로젝트관리',
  '하루관리',
  '작업완료',
  '목표설정',
];
const SECOND_HASHTAG_LIST = [
  '오늘의계획',
  '효율적시간관리',
  '일정추적',
  '일정알림',
  '일정플래너',
  '생산성앱',
  '데일리계획',
  '할일앱',
  '목표관리',
  '할일달성',
  '계획관리',
  '시간계획',
  '업무효율성',
  '하루성공',
];
export default function WaveText() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // 'target viewport'
    offset: ['center start', 'start center'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0]);
  const hashOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className='h-screen'>
      <div className='text-nowrap fixed inset-0 flex flex-col justify-center items-center'>
        <motion.div style={{ opacity }}>
          <DayLogo width={1194} height={394} />
        </motion.div>
        <motion.div className='flex' style={{ opacity: hashOpacity }}>
          <div className='text-[50px] text-white flex flex-row gap-10 animate-infinite-scroll-1'>
            {FIRST_HASHTAG_LIST.map((hashtag, index) => (
              <span key={`${index}-1-hash`}>#{hashtag}</span>
            ))}
          </div>
          <div className='absolute text-[50px] text-white flex gap-10 animate-infinite-scroll-2'>
            {FIRST_HASHTAG_LIST.map((hashtag, index) => (
              <span key={`${index}-2-hash`}>#{hashtag}</span>
            ))}
          </div>
        </motion.div>
        <motion.div className='flex ' style={{ opacity: hashOpacity }}>
          <div className='text-[50px] text-white flex gap-10 animate-infinite-scroll-3'>
            {SECOND_HASHTAG_LIST.map((hashtag, index) => (
              <span key={`${index}-3-hash`}>#{hashtag}</span>
            ))}
          </div>
          <div className='absolute text-[50px] text-white flex gap-10 animate-infinite-scroll-4'>
            {SECOND_HASHTAG_LIST.map((hashtag, index) => (
              <span key={`${index}-4-hash`}>#{hashtag}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
