'use client';

import { ListTodoButtons, Todo } from '@/types/Todo';
import { Checkbox } from '@nextui-org/react';
import { Kebab, Goal } from '@/assets/svgs';
import { useRef, useState } from 'react';
import TodoListButtons from './TodoListButtons';
import Popover from '../Popover/Popover';

type ListTodoProps = {
  todos: Todo[];
  onButtonClick: (buttonType: ListTodoButtons, id: number) => void;
  showGoal: boolean;
  displayTodoCount?: number;
};

export default function ListTodo({ todos, showGoal = true, displayTodoCount = 0, onButtonClick }: ListTodoProps) {
  const [openPopupTodoId, setOpenPopupTodoId] = useState<number | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const todoList = displayTodoCount ? todos.slice(0, displayTodoCount) : todos.slice(0);
  //최신순으로 정렬
  todos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const handleClick = (buttonType: ListTodoButtons, id: number) => {
    onButtonClick(buttonType, id);
  };

  return (
    <div className='-mt-0.5'>
      <div className='flex flex-col justify-center items-start gap-[10px]'>
        {todoList.map((item) => {
          return (
            <Checkbox
              classNames={{
                base: ['flex max-w-full w-full justify-between items-start group p-0 m-0'],
                label: ['w-full pl-2 min-w-0'],
                wrapper: ['w-[18px] h-[18px] m-0'],
              }}
              defaultSelected={item.done}
              onChange={() => handleClick('done', item.id)}
              key={item.id}
            >
              <div className='flex justify-between items-stretch'>
                <div
                  data-showgoal={showGoal}
                  className='data-[showgoal=true]:flex-col data-[showgoal=true]:items-start flex items-center justify-start truncate'
                >
                  <span className='group-data-[selected=true]:line-through text-sm text-slate-800 py-0.5 truncate flex-shrink'>
                    {item.title}
                  </span>
                  {item.goal && showGoal && (
                    <span className='flex justify-center items-center gap-1.5 !no-underline text-sm text-slate-700'>
                      <Goal className='w-6 h-6 ' />
                      {item.goal.title}
                    </span>
                  )}
                </div>
                <div className='flex justify-center items-center gap-1'>
                  <TodoListButtons item={item} handleClick={handleClick} />
                  <Popover
                    openPopupId={openPopupTodoId}
                    handlePopupClick={handleClick}
                    setOpenPopupId={setOpenPopupTodoId}
                    item={item}
                    goal
                  >
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
