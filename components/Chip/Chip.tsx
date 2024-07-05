'use client';

import { Checkbox, CheckboxGroup } from '@nextui-org/react';
import { useState } from 'react';

type TYPE = 'link' | 'file';
type SIZE = 'md' | 'sm';

interface Chip {
  size: SIZE;
  handleCheck: (type: TYPE) => void;
}

const baseStyle = {
  base: 'data-[selected=true]:bg-slate-900 data-[selected=true]:text-white rounded-lg pr-3 first:mr-3',
  label: 'group-data-[selected=true]:text-slate-100',
};

export default function Chip({ size, handleCheck }: Chip) {
  const [checkedType, setCheckedType] = useState<TYPE>('file');

  return (
    <CheckboxGroup
      orientation='horizontal'
      defaultValue={['file']}
      value={checkedType === 'file' ? ['file'] : ['link']}
      onChange={() => handleCheck(checkedType)}
    >
      <Checkbox
        defaultChecked
        onChange={() => {
          setCheckedType('file');
        }}
        value='file'
        size={size}
        classNames={baseStyle}
      >
        파일 업로드
      </Checkbox>
      <Checkbox
        onChange={() => {
          setCheckedType('link');
        }}
        value='link'
        size={size}
        classNames={baseStyle}
      >
        링크 첨부
      </Checkbox>
    </CheckboxGroup>
  );
}
