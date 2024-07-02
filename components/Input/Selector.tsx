'use client';

import { AwworDown } from '@/assets/svgs/ArrowDown';
import { EyeFilledIcon } from '@/assets/svgs/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/assets/svgs/EyeSlashFilledIcon';
import { Input, InputProps, Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';

type Size = 'large' | 'small';

type BaseInputProps = {
  size: Size;
  items: {};
};

const style =
  'bg-slate-50 border border-transparent data-[hover=true]:bg-slate-50 data-[hover=true]:border-blue-300 data-[focus=true]:border-blue-500 group-data-[focus=true]:bg-slate-50 group-data-[has-helper=true]:!bg-slate-50';

export default function Selector({ size, items }: BaseInputProps) {
  return (
    <Select
      aria-label='select subject'
      classNames={{
        popoverContent: 'text-black bg-slate-50',
        trigger: `${size === 'large' ? 'w-[612px]' : 'w-[343px]'} ${style}`,
      }}
      selectorIcon={<AwworDown />}
      placeholder='목표를 선택해 주세요.'
    >
      {Object.entries(items)?.map((item, index) => <SelectItem key={`${index}-${item[0]}`}>{item[0]}</SelectItem>)}
    </Select>
  );
}
