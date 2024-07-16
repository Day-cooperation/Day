import { SVGProps } from 'react';

export const Embeded = (props: SVGProps<SVGSVGElement>) => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <g clipPath='url(#clip0_1143_18337)'>
      <circle cx='12' cy='12' r='12' fill='#3B82F6' />
      <rect x='4.75' y='7.75' width='14.2143' height='9.5' rx='0.821429' stroke='white' strokeWidth='1.5' />
      <rect x='6.25' y='9' width='3.5' height='7' rx='0.785714' fill='#93C5FD' />
      <path
        d='M11.0715 14.4644V10.9287M11.0715 10.9287H14.6072M11.0715 10.9287L15.0001 14.8573'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
    <defs>
      <clipPath id='clip0_1143_18337'>
        <rect width='24' height='24' fill='white' />
      </clipPath>
    </defs>
  </svg>
);
