'use client';

import { EyeFilledIcon } from '@/assets/svgs/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/assets/svgs/EyeSlashFilledIcon';
import { Input, InputProps } from '@nextui-org/react';
import { useState } from 'react';

type InputType = 'text' | 'href' | 'password';
type Size = 'large' | 'small';

type BaseInputProps = {
  size: Size;
  type: InputType;
  errorMessage?: string;
  props: InputProps;
};

// 기본 text와 password를 받는 Component
export default function TextAndPasswordInput({ size, type, errorMessage, props }: BaseInputProps) {
  const [passwordVisiblity, setPasswordVisiblity] = useState(false);

  function visiblityChange() {
    setPasswordVisiblity(!passwordVisiblity);
  }

  return (
    <Input
      type={type === 'password' ? (passwordVisiblity ? 'text' : 'password') : 'text'}
      classNames={{
        mainWrapper: size === 'large' ? 'w-[612px]' : 'w-[343px]',
        inputWrapper:
          'group-data-[has-helper=true]:border-danger-50 bg-slate-50 border border-transparent data-[hover=true]:bg-slate-50 data-[hover=true]:border-blue-300 data-[focus=true]:border-blue-500 group-data-[focus=true]:bg-slate-50 group-data-[has-helper=true]:!bg-slate-50',
        errorMessage: 'text-red-700',
        input: '!text-slate-800 caret-slate-800',
      }}
      endContent={
        type === 'password' ? (
          passwordVisiblity ? (
            <EyeFilledIcon onClick={() => visiblityChange()} className='cursor-pointer' />
          ) : (
            <EyeSlashFilledIcon onClick={() => visiblityChange()} className='cursor-pointer' />
          )
        ) : (
          ''
        )
      }
      errorMessage={errorMessage}
      isInvalid={errorMessage ? true : false}
      {...props}
    />
  );
}
