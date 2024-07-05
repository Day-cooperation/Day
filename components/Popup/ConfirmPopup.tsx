import { RefObject, useEffect } from 'react';
import Button from '../Buttons/Button';
import { Cancel } from '@/assets/svgs';

type ConfirmPopupProps = {
  dialogRef: RefObject<HTMLDialogElement>;
  confirmText: string;
  description?: string;
  confirm?: boolean;
  onConfirmClick: (confirm: string) => void;
};

export default function ConfirmPopup({
  dialogRef,
  confirmText,
  description,
  confirm = false,
  onConfirmClick,
}: ConfirmPopupProps) {
  const handlePopupClose = () => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
  };

  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      if (!dialogRef.current) return;
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        dialogRef.current.close();
      }
    };
    const handleCloseEvent = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onConfirmClick('cancel');
      }
    };

    document.addEventListener('mousedown', outSideClick);
    if (dialogRef.current) {
      dialogRef.current.addEventListener('keydown', handleCloseEvent);
    }
    return () => {
      document.removeEventListener('mousedown', outSideClick);
      if (dialogRef.current) {
        dialogRef.current.removeEventListener('keydown', handleCloseEvent);
      }
    };
  }, [dialogRef, onConfirmClick]);

  return (
    <dialog className='rounded-lg z-100' ref={dialogRef}>
      <div className=' flex w-[402px] p-6'>
        <div className='w-full flex flex-col justify-between gap-6'>
          <div className='flex justify-end'>
            <button
              onClick={() => {
                onConfirmClick('cancel');
                handlePopupClose();
              }}
            >
              <Cancel className='w-[13px] h-[13px]' />
            </button>
          </div>
          <div className='flex flex-col items-center text-slate-800'>
            <span>{confirmText}</span>
            <span>{description}</span>
          </div>
          <div data-confirm={confirm} className='flex gap-2 justify-end data-[confirm=true]:justify-center'>
            {confirm && (
              <Button
                onClick={() => {
                  onConfirmClick('cancel');
                  handlePopupClose();
                }}
                size='sm'
              >
                취소
              </Button>
            )}
            <Button
              onClick={() => {
                onConfirmClick('ok');
                handlePopupClose();
              }}
              size='sm'
              variant='solid'
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
