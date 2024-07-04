import React, { SVGProps } from 'react';

export const Plus = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
    <path d='M5 12H18.5' stroke='white' strokeWidth='1.8' strokeLinecap='round' />
    <path d='M11.75 18.75V5.25' stroke='white' strokeWidth='1.8' strokeLinecap='round' />
  </svg>
);
