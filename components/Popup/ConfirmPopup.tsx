'use client';

import { RefObject, useEffect, useRef } from 'react';
import Button from '../Buttons/Button';
import { Cancel } from '@/assets/svgs';

type ConfirmPopupProps = {
  dialogRef: RefObject<HTMLDialogElement>;
  confirmText: string;
  description?: string;
  confirm?: boolean;
  onConfirmClick: (confirm: 'ok' | 'cancel', type: string) => void;
  type?: string;
};

export default function ConfirmPopup({
  dialogRef,
  confirmText,
  description,
  confirm = false,
  onConfirmClick,
  type = 'popup',
}: ConfirmPopupProps) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const handlePopupClose = () => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
  };

  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      if (dialogRef.current?.open && !divRef.current?.contains(e.target as Node)) {
        onConfirmClick('cancel', type);
        handlePopupClose();
      }
    };
    const handleCloseEvent = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onConfirmClick('cancel', type);
      }
    };
    if (dialogRef.current?.open) {
      document.addEventListener('click', outSideClick);
      document.addEventListener('keydown', handleCloseEvent);
    }
    return () => {
      if (dialogRef.current?.open) {
        document.removeEventListener('click', outSideClick);
        document.removeEventListener('keydown', handleCloseEvent);
      }
    };
  }, []);

  return (
    <dialog className='rounded-lg z-100' ref={dialogRef}>
      <div className=' flex md:w-[402px] p-6' ref={divRef}>
        <div className='w-full flex flex-col justify-between gap-6'>
          <div className='flex justify-end'>
            <button
              onClick={() => {
                onConfirmClick('cancel', type);
                handlePopupClose();
              }}
            >
              <Cancel className='w-[24px] h-[24px] pt-[5px] pb-[6px] px-[5.5px]' />
            </button>
          </div>
          <div className='flex flex-col items-center text-slate-800'>
            <span>{confirmText}</span>
            <span>{description}</span>
          </div>
          <div data-confirm={confirm} className='flex gap-2 justify-center'>
            {confirm && (
              <Button
                onClick={() => {
                  onConfirmClick('cancel', type);
                  handlePopupClose();
                }}
                size='sm'
                className='h-12'
              >
                취소
              </Button>
            )}
            <Button
              onClick={() => {
                onConfirmClick('ok', type);
                handlePopupClose();
              }}
              size='sm'
              variant='solid'
              className='h-12'
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
