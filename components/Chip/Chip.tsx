'use client';

import { Checkbox, CheckboxGroup } from '@nextui-org/react';
import { useState } from 'react';

type TYPE = 'link' | 'file';
type SIZE = 'md' | 'sm';

interface Chip {
  size: SIZE;
  isSelected: { file: boolean; link: boolean };
  onClick: () => void;
}

const baseStyle = {
  base: 'm-0 data-[selected=true]:bg-green-500 data-[selected=true]:text-white rounded-lg pr-3 first:mr-3 bg-slate-100',
  label: 'group-data-[selected=true]:text-slate-100',
  wrapper: 'bg-white after:bg-white text-green-500 ',
};

export default function Chip({ size, onClick, isSelected }: Chip) {
  return (
    <div className='flex'>
      <Checkbox value='file' size={size} isSelected={isSelected.file} classNames={baseStyle} isReadOnly>
        파일 업로드
      </Checkbox>
      <Checkbox
        value='link'
        size={size}
        isSelected={isSelected.link}
        classNames={baseStyle}
        isReadOnly
        onClick={onClick}
      >
        링크 첨부
      </Checkbox>
    </div>
  );
}
