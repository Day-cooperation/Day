import React, { SVGProps } from 'react';
export const Kebab = (props: SVGProps<SVGSVGElement>) => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <circle cx='12' cy='12' r='12' fill={`${props.fill || '#F8FAFC'}`} />
    <circle
      cx='11.941'
      cy='11.9999'
      r='0.525'
      transform='rotate(-90 11.941 11.9999)'
      fill='#3CB643'
      stroke='#3CB643'
      strokeWidth='1.16667'
      strokeLinecap='round'
    />
    <circle
      cx='11.941'
      cy='15.9667'
      r='0.525'
      transform='rotate(-90 11.941 15.9667)'
      fill='#3CB643'
      stroke='#3CB643'
      strokeWidth='1.16667'
      strokeLinecap='round'
    />
    <circle
      cx='11.941'
      cy='8.03335'
      r='0.525'
      transform='rotate(-90 11.941 8.03335)'
      fill='#3CB643'
      stroke='#3CB643'
      strokeWidth='1.16667'
      strokeLinecap='round'
    />
  </svg>
);
