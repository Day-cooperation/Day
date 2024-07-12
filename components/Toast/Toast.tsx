'use client';

import { Toaster, resolveValue } from 'react-hot-toast';

export default function Toast() {
  return (
    <Toaster position='bottom-center' containerClassName='!inset-y-[84px] !inset-x-0 !absolute left-0'>
      {(t) => <div style={{ opacity: t.visible ? 1 : 0 }}>{resolveValue(t.message, t)}</div>}
    </Toaster>
  );
}
