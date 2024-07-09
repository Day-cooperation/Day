import { Checkbox } from '@nextui-org/react';
import { Dispatch, SetStateAction } from 'react';
import { ModalHeader as NextModalHeader } from '@nextui-org/react';
import { NewTodo } from '@/types/Todo';

type ModalHeaderProps = {
  data: NewTodo;
  modalType: 'create' | 'edit';
  setData: Dispatch<SetStateAction<NewTodo>>;
};

export default function ModalHeader({ data, modalType, setData }: ModalHeaderProps) {
  return (
    <NextModalHeader>
      <h1>{modalType === 'create' ? '할 일 생성' : '할 일 수정'}</h1>
      {modalType === 'edit' && (
        <Checkbox isSelected={data.done} onClick={() => setData((prev) => ({ ...prev, done: !prev.done }))}>
          {data.done ? 'Done' : 'To do'}
        </Checkbox>
      )}
    </NextModalHeader>
  );
}
