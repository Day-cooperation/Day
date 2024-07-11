'use client';

import { ArrowDown } from '@/assets/svgs/ArrowDown';
import { Select, SelectItem } from '@nextui-org/react';
import { ChangeEvent } from 'react';

type Size = 'full' | 'large' | 'small';

type Goal = {
  id: number | string;
  teamId: string;
  userId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

type BaseInputProps = {
  size: Size;
  label?: string;
  placeholder?: string;
  items?: Goal[];
  name: string;
  value?: number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const style =
  'bg-slate-50 border border-transparent data-[hover=true]:bg-slate-50 data-[hover=true]:border-blue-300 data-[focus=true]:border-blue-500 group-data-[focus=true]:bg-slate-50 group-data-[has-helper=true]:!bg-slate-50';

export default function Selector({ size, label, placeholder, items = [], name, onChange, value }: BaseInputProps) {
  return (
    <Select
      aria-label='select subject'
      classNames={{
        popoverContent: 'text-black bg-slate-50 z-[1000]',
        trigger: `${size === 'large' ? 'w-[612px]' : size === 'full' ? 'w-full' : 'w-[343px]'}, ${style}`,
        label: '!text-slate-400',
      }}
      selectorIcon={<ArrowDown />}
      placeholder={placeholder}
      selectedKeys={value === 0 ? [''] : [String(value)]}
      name={name}
      label={label}
      labelPlacement='outside'
      onChange={onChange}
    >
      {items?.map((item) => <SelectItem key={item.id}>{item.title}</SelectItem>)}
    </Select>
  );
}
