import { NewTodo } from '@/types/Todo';
import { ModalFooter as NextModalfooter } from '@nextui-org/react';
import Button from '../Buttons/Button';

type ModalFooterProps = {
  handleConfirmPopupOpen: () => void;
  data: NewTodo;
};

export default function ModalFooter({ handleConfirmPopupOpen, data }: ModalFooterProps) {
  return (
    <NextModalfooter>
      <Button type='button' onClick={handleConfirmPopupOpen} variant='solid' disabled={data?.title ? false : true}>
        확인
      </Button>
    </NextModalfooter>
  );
}
