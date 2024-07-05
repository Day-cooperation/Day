import { Todo } from '@/types/Todo';
import ListTodo from '../ListTodo/ListTodo';
import { Dispatch } from 'react';

type ListTodoProgressProps = {
  itemList: Todo[];
  textValue: string;
  onUpdateList: (buttonType: string, id: number) => void;
};

export default function ListTodoProgress({ itemList, textValue, onUpdateList }: ListTodoProgressProps) {
  return (
    <div className='flex flex-col gap-4'>
      <span className='text-sm font-semibold text-slate-800'>To do</span>
      {itemList.length !== 0 ? (
        <ListTodo todos={itemList} showGoal={false} displayTodoCount={5} onButtonClick={onUpdateList} />
      ) : (
        <span className='flex -mt-0.5 justify-center items-center h-[152px] text-xs text-slate-500'>{textValue}</span>
      )}
    </div>
  );
}
