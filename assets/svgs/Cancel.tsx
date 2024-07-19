import React, { SVGProps } from 'react';

type CancelProps = SVGProps<SVGSVGElement> & {
  strokeColor?: string;
};

export const Cancel = ({ strokeColor = '#64748b', ...props }: CancelProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='15' viewBox='0 0 16 15' fill='none' {...props}>
    <path d='M1.5 1L14.5 14' stroke={strokeColor} strokeWidth='1.8' strokeLinecap='round' />
    <path d='M14.5 1L1.5 14' stroke={strokeColor} strokeWidth='1.8' strokeLinecap='round' />
  </svg>
);
