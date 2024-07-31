import React, { SVGProps } from 'react';

export const Link = (props: SVGProps<SVGSVGElement>) => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <circle cx='12' cy='12' r='12' fill='#F8FAFC' />
    <path
      d='M13.3332 10.6663L10.6665 13.333'
      stroke='#3CB643'
      strokeWidth='1.33333'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M14.6668 12.6663L16.0002 11.333C16.9206 10.4125 16.9206 8.92015 16.0002 7.99967V7.99967C15.0797 7.0792 13.5873 7.0792 12.6668 7.99968L11.3335 9.33301M9.3335 11.333L8.00016 12.6663C7.07969 13.5868 7.07969 15.0792 8.00016 15.9997V15.9997C8.92064 16.9201 10.413 16.9201 11.3335 15.9997L12.6668 14.6663'
      stroke='#3CB643'
      strokeWidth='1.33333'
      strokeLinecap='round'
    />
  </svg>
);
