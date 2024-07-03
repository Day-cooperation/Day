'use client';

import { Todo } from '@/types/ListTodo/Todos';
import { Checkbox, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { Kebab, Goal, File, Link, Note, NoteWrite } from '@/assets/svgs';
import { useEffect, useRef, useState } from 'react';

type ListTodoProps = {
  todos: Todo[];
  onButtonClick: (buttonType: string, id: number) => void;
};

export default function ListTodo({ todos, onButtonClick }: ListTodoProps) {
  const [popupOpen, setPopupOpen] = useState<number | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  //최신순으로 정렬
  todos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const handleClick = (buttonType: string, id: number, close?: () => void) => {
    onButtonClick(buttonType, id);
    if (close) {
      setPopupOpen(null);
    }
  };

  useEffect(() => {
    const outsideClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPopupOpen(null);
      }
    };
    document.addEventListener('mousedown', outsideClick);
    return () => document.removeEventListener('mousedown', outsideClick);
  }, [popupOpen]);

  return (
    <div className='min-w-max'>
      <div className='flex flex-col justify-center items-start gap-5 py-3.5 px-5'>
        {todos.map((item) => {
          const isPopupOpen = popupOpen === item.id;
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
                  <span className='group-data-[selected=true]:line-through'>{item.title}</span>
                  {item.goal && (
                    <span className='flex justify-center items-center gap-1.5 !no-underline'>
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
                  <Popover isOpen={isPopupOpen} radius='none' classNames={{ content: ['rounded-xl border-0 p-0'] }}>
                    <PopoverTrigger>
                      <button
                        className='hidden group-hover:block'
                        onClick={() => {
                          if (popupOpen) {
                            setPopupOpen(null);
                          } else {
                            setPopupOpen(item.id);
                          }
                        }}
                      >
                        <Kebab className='w-6 h-6' />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className='flex flex-col text-sm text-slate-700' ref={popoverRef}>
                        <button
                          className='px-4 pt-2 pb-1.5'
                          onClick={() => {
                            handleClick('edit', item.id, close);
                          }}
                        >
                          수정하기
                        </button>
                        <button className='px-4 pt-1.5 pb-2' onClick={() => handleClick('delete', item.id, close)}>
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
