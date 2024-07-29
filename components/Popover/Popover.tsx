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
  showNoteDelete?: boolean;
  setOpenPopupId: Dispatch<number | null>;
};

function isTodo(item: Todo | Goal): item is Todo {
  return (item as Todo).noteId !== undefined;
}

export default function Popover({
  isGoal,
  item,
  openPopupId,
  handlePopupClick,
  showNoteDelete,
  setOpenPopupId,
}: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const handleOptionClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: 'edit' | 'delete' | 'note delete'
  ) => {
    e.stopPropagation();

    if (type === 'note delete' && isTodo(item) && item.noteId !== null) {
      handlePopupClick(type, item.noteId);
      setOpenPopupId(null);
      return;
    }
    handlePopupClick(type, item.id);
    setOpenPopupId(null);
  };

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
          aria-label='popover'
          className={`${isGoal ? 'block' : 'lg:hidden'} group-hover:block`}
          onClick={(e) => {
            e.stopPropagation();
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
          <button
            className='px-4 pt-2 pb-1.5 rounded-lg focus-visible:outline-none hover:bg-slate-200'
            onClick={(e) => handleOptionClick(e, 'edit')}
          >
            수정하기
          </button>
          <button
            className='px-4 pt-1.5 rounded-lg pb-2 focus-visible:outline-none hover:bg-slate-200'
            onClick={(e) => handleOptionClick(e, 'delete')}
          >
            삭제하기
          </button>
          {showNoteDelete && (
            <button
              className='px-4 pt-1.5 rounded-lg pb-2 focus-visible:outline-none hover:bg-slate-200'
              onClick={(e) => handleOptionClick(e, 'note delete')}
            >
              노트삭제
            </button>
          )}
        </div>
      </PopoverContent>
    </NextPopover>
  );
}
