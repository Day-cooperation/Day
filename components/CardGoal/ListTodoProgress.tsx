import { ListTodoButtons, Todo } from '@/types/Todo';
import ListTodo from '../ListTodo/ListTodo';

type ListTodoProgressProps = {
  itemList: Todo[];
  subject: 'To do' | 'Done';
  textValue: string;
  onUpdateList: (buttonType: ListTodoButtons, id: number) => void;
  displayTodoCount: number;
};

export default function ListTodoProgress({
  subject,
  itemList,
  displayTodoCount,
  textValue,
  onUpdateList,
}: ListTodoProgressProps) {
  return (
    <div className='flex flex-col gap-4'>
      <span className='text-sm font-semibold text-slate-800'>{subject}</span>
      <div className='h-full min-h-20 md:min-h-[152px] '>
        {itemList?.length !== 0 ? (
          <ListTodo
            todos={itemList}
            showGoal={false}
            displayTodoCount={displayTodoCount}
            onButtonClick={onUpdateList}
          />
        ) : (
          <div className='flex -mt-0.5 justify-center h-full items-center text-xs text-slate-500'>{textValue}</div>
        )}
      </div>
    </div>
  );
}
