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
      <div className='flex w-full'>
        <div>
          <Checked />
        </div>
        <div>
          <span>임시 저장이 완료되었습니다</span>
        </div>
        <div>ㆍ</div>
        <span>{`${count}초전`}</span>
      </div>
    </>
  );
}
