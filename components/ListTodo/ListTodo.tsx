'use client';

import { Todo } from '@/types/Todo';
import { Checkbox, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { Kebab, Goal, File, Link, Note, NoteWrite } from '@/assets/svgs';
import { useEffect, useRef, useState } from 'react';

type ListTodoButtons = 'file' | 'link' | 'note write' | 'done' | 'note' | 'edit' | 'delete';

type ListTodoProps = {
  todos: Todo[];
  onButtonClick: (buttonType: ListTodoButtons, id: number) => void;
};

export default function ListTodo({ todos, onButtonClick }: ListTodoProps) {
  const [openPopupTodoId, setOpenPopupTodoId] = useState<number | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  //최신순으로 정렬
  todos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const handleClick = (buttonType: ListTodoButtons, id: number) => {
    onButtonClick(buttonType, id);
  };

  useEffect(() => {
    const outsideClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpenPopupTodoId(null);
      }
    };
    document.addEventListener('mousedown', outsideClick);
    return () => document.removeEventListener('mousedown', outsideClick);
  }, [openPopupTodoId]);

  return (
    <div className='min-w-max'>
      <div className='flex flex-col justify-center items-start gap-5 py-3.5 px-5'>
        {todos.map((item) => {
          return (
            <Checkbox
              classNames={{
                base: ['flex items-center w-full max-w-full group p-0'],
                label: ['max-w-full w-full '],
                wrapper: ['w-[18px] h-[18px]'],
              }}
              defaultSelected={item.done}
              onChange={() => handleClick('done', item.id)}
              key={item.id}
            >
              <div className='flex justify-between items-stretch'>
                <div className='flex flex-col items-start justify-center'>
                  <span className='group-data-[selected=true]:line-through text-sm text-slate-800'>{item.title}</span>
                  {item.goal && (
                    <span className='flex justify-center items-center gap-1.5 !no-underline text-sm text-slate-700'>
                      <Goal className='w-6 h-6 ' />
                      {item.goal.title}
                    </span>
                  )}
                </div>
                <div className='flex justify-center items-center gap-1'>
                  {item.fileUrl && (
                    <button onClick={() => handleClick('file', item.id)}>
                      <File className='w-6 h-6' />
                    </button>
                  )}
                  {item.linkUrl && (
                    <button onClick={() => handleClick('link', item.id)}>
                      <Link className='w-6 h-6' />
                    </button>
                  )}
                  {item.noteId && (
                    <button onClick={() => handleClick('note', item.id)}>
                      <Note className='w-6 h-6' />
                    </button>
                  )}
                  <button
                    className='h-0 overflow-hidden group-hover:h-6'
                    onClick={() => handleClick('note write', item.id)}
                  >
                    <NoteWrite className='w-6 h-6' />
                  </button>
                  <Popover
                    isOpen={openPopupTodoId === item.id}
                    radius='none'
                    classNames={{ content: ['rounded-xl border-0 p-0'] }}
                  >
                    <PopoverTrigger className='focus-visible:outline-none'>
                      <button
                        className='hidden group-hover:block'
                        onClick={() => {
                          if (openPopupTodoId) {
                            setOpenPopupTodoId(null);
                          } else {
                            setOpenPopupTodoId(item.id);
                          }
                        }}
                      >
                        <Kebab className='w-6 h-6' />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className='flex flex-col text-sm text-slate-700' ref={popoverRef}>
                        <button
                          className='px-4 pt-2 pb-1.5 rounded-lg focus-visible:outline-none hover:bg-slate-200'
                          onClick={() => {
                            handleClick('edit', item.id);
                            setOpenPopupTodoId(null);
                          }}
                        >
                          수정하기
                        </button>
                        <button
                          className='px-4 pt-1.5 rounded-lg pb-2 focus-visible:outline-none hover:bg-slate-200'
                          onClick={() => {
                            handleClick('delete', item.id);
                            setOpenPopupTodoId(null);
                          }}
                        >
                          삭제하기
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </Checkbox>
          );
        })}
      </div>
    </div>
  );
}