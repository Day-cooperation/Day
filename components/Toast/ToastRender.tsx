'use client';

import { Checked } from '@/assets/svgs';
import { useEffect, useState } from 'react';

export default function ToastRender() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div className='flex absolute left-0 right-0 justify-start rounded-[28px] py-[10px] px-6 bg-blue-50 text-blue-500'>
        <div>
          <Checked />
        </div>
        <span>임시 저장이 완료되었습니다</span>
        <div>ㆍ</div>
        <span>{`${count}초전`}</span>
      </div>
    </>
  );
}
