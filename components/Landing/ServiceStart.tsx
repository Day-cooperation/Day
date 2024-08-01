import { useScroll, useTransform, motion, useMotionValueEvent, Variants } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useRef, useState } from 'react';

const fadeInVariants: Variants = {
  hidden: {
    translateY: 0,
  },
  visible: {
    width: '100%',
    opacity: 1,
    translateY: -10,
    transition: {
      duration: 1,
    },
  },
};
const cardVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 50,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.6,
      duration: 0.8,
    },
  },
};

export default function ServiceStart() {
  return (
    // amount 보이는 정도
    <motion.div initial='offscreen' whileInView='onscreen' viewport={{ amount: 0.8 }} className='relative h-screen'>
      <motion.div className='absolute h-[50%] bottom-0 '></motion.div>
      <motion.div
        variants={cardVariants}
        className='fixed inset-0 flex flex-col justify-center items-center text-white '
      >
        <h2 className='text-[43px] md:text-[86px] font-bold break-keep break-words text-center'>
          지금 바로 시작하세요
        </h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className='duration-150 mt-4 md:mt-8 py-1 px-4 md:py-2 md:px-8 text-lg md:text-2xl font-semibold rounded-[500px] bg-[#3cb643]'
          onClick={() => signIn()}
        >
          서비스 이용하기
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
