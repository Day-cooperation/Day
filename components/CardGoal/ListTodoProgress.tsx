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
      {itemList?.length !== 0 ? (
        <ListTodo todos={itemList} showGoal={false} displayTodoCount={displayTodoCount} onButtonClick={onUpdateList} />
      ) : (
        <span className='flex -mt-0.5 justify-center items-center h-[152px] text-xs text-slate-500'>{textValue}</span>
      )}
    </div>
  );
}
