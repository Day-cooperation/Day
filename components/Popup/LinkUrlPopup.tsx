'use client';

import { RefObject, useEffect, useRef } from 'react';
import MixedInput from '../Input/MixedInput';
import Button from '../Buttons/Button';
import { Cancel } from '@/assets/svgs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { VALIDATE_INPUT_VALUE } from '@/constans';

type LinkUrlPopupProps = {
  dialogRef: RefObject<HTMLDialogElement>;
  onLinkUrlChange: (response: string) => void;
};

type LinkInput = {
  linkUrl: string;
};

const { linkUrl } = VALIDATE_INPUT_VALUE;

export default function LinkUrlPopup({ dialogRef, onLinkUrlChange }: LinkUrlPopupProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LinkInput>({ mode: 'onSubmit', shouldFocusError: false });

  const handlePopupClose = () => {
    reset();
    if (!dialogRef.current) return;
    dialogRef.current.close();
  };

  const onSubmit: SubmitHandler<LinkInput> = (data, e) => {
    e?.preventDefault();
    if (data.linkUrl) {
      onLinkUrlChange(data.linkUrl);
      handlePopupClose();
    }
  };

  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      if (!dialogRef.current) return;
      if (dialogRef.current.open && !divRef.current?.contains(e.target as Node)) {
        handlePopupClose();
      }
    };
    const handleCloseEvent = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handlePopupClose();
      }
    };
    if (!dialogRef.current) return;
    document.addEventListener('mousedown', outSideClick);
    document.addEventListener('keypress', handleCloseEvent);

    return () => {
      if (!dialogRef.current) {
        document.removeEventListener('mousedown', outSideClick);
        document.removeEventListener('keypress', handleCloseEvent);
      }
    };
  }, [dialogRef, handlePopupClose]);

  return (
    <dialog ref={dialogRef} className='rounded-xl'>
      <div ref={divRef} className='p-6 flex flex-col w-[311px] md:w-[520px] lg:w-[472px] gap-6 '>
        <div className='flex justify-between'>
          <h1 className='text-lg font-bold'>링크 업로드</h1>
          <button
            onClick={() => {
              handlePopupClose();
            }}
          >
            <Cancel className='w-6 h-6 pt-[5px] pb-[6px] px-[5.5px]' />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10'>
          <label className='font-semibold'>
            링크
            <MixedInput
              type='href'
              size='full'
              name='linkUrl'
              errorMessage={errors.linkUrl?.message}
              props={{
                labelPlacement: 'outside',
                placeholder: '영상이나 글, 파일의 링크를 넣어주세요',
                className: 'mt-3',
                ...register('linkUrl', {
                  required: linkUrl.message.required,
                  pattern: { value: linkUrl.regexp, message: linkUrl.message.pattern },
                }),
              }}
            />
          </label>
          <Button type='submit' size='xl' variant='solid'>
            확인
          </Button>
        </form>
      </div>
    </dialog>
  );
}
