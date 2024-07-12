'use client';

import { Toaster, resolveValue } from 'react-hot-toast';

export default function Toast() {
  return (
    <Toaster>
      {(t) => (
        <div style={{ opacity: t.visible ? 1 : 0, background: 'white', padding: 8 }}>{resolveValue(t.message, t)}</div>
      )}
    </Toaster>
  );
}
