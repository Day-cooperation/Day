'use client';

import { Kebab } from '@/assets/svgs';
import { Goal } from '@/types/Goal';
import { ListTodoButtons, Todo } from '@/types/Todo';
import { Popover as NextPopover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { Dispatch, useEffect, useRef } from 'react';

type PopoverProps = {
  isGoal?: boolean;
  item: Todo | Goal;
  openPopupId: number | null;
  handlePopupClick: (buttonType: ListTodoButtons, id: number) => void;
  setOpenPopupId: Dispatch<number | null>;
  noteId?: boolean;
};

export default function Popover({ isGoal, item, openPopupId, handlePopupClick, setOpenPopupId, noteId }: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const outsideClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpenPopupId(null);
      }
    };
    document.addEventListener('mousedown', outsideClick);
    return () => document.removeEventListener('mousedown', outsideClick);
  }, [openPopupId]);
  return (
    <NextPopover isOpen={openPopupId === item.id} radius='none' classNames={{ content: ['rounded-xl border-0 p-0'] }}>
      <PopoverTrigger className='focus-visible:outline-none'>
        <button
          className={`${isGoal ? 'block' : 'hidden'} group-hover:block`}
          onClick={() => {
            if (openPopupId) {
              setOpenPopupId(null);
            } else {
              setOpenPopupId(item.id);
            }
          }}
        >
          <Kebab className={`w-6 h-6`} fill={isGoal ? 'white' : ''} />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className='flex flex-col text-sm text-slate-700' ref={popoverRef}>
          {noteId && (
            <button
              className='px-4 pt-2 pb-1.5 rounded-lg focus-visible:outline-none hover:bg-slate-200'
              onClick={() => {
                handlePopupClick('note read', item.id);
                setOpenPopupId(null);
              }}
            >
              노트 보기
            </button>
          )}
          <button
            className='px-4 pt-2 pb-1.5 rounded-lg focus-visible:outline-none hover:bg-slate-200'
            onClick={() => {
              handlePopupClick('edit', item.id);
              setOpenPopupId(null);
            }}
          >
            수정하기
          </button>
          <button
            className='px-4 pt-1.5 rounded-lg pb-2 focus-visible:outline-none hover:bg-slate-200'
            onClick={() => {
              handlePopupClick('delete', item.id);
              setOpenPopupId(null);
            }}
          >
            삭제하기
          </button>
        </div>
      </PopoverContent>
    </NextPopover>
  );
}
