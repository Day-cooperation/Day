'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../Buttons/Button';
import MixedInput from '../Input/MixedInput';
import Selector from '../Input/Selector';
import { Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { Logo } from '@/assets/svgs';

const mock = [
  {
    id: 63,
    teamId: '1-1',
    userId: 6,
    title: '오늘만 살자',
    createdAt: '2024-07-04T17:18:06.259Z',
    updatedAt: '2024-07-04T17:18:06.259Z',
  },
  {
    id: 64,
    teamId: '1-1',
    userId: 6,
    title: '내일도 살자',
    createdAt: '2024-07-04T18:28:10.939Z',
    updatedAt: '2024-07-04T18:28:10.939Z',
  },
  {
    id: 65,
    teamId: '1-1',
    userId: 6,
    title: '모레도 살자',
    createdAt: '2024-07-04T18:28:41.146Z',
    updatedAt: '2024-07-04T18:28:41.146Z',
  },
];

type PluginInput = {
  url: string;
  todo: string;
  goal: number;
};

type PluginProps = {
  onCreateClick: (inputData: PluginInput) => void;
  isOpen: boolean;
  onClose: () => void;
};
export default function Plugin({ onCreateClick, isOpen, onClose }: PluginProps) {
  const [inputData, setInputData] = useState<PluginInput>({ url: '', todo: '', goal: 0 });
  const [isError, setIsError] = useState<Partial<PluginInput>>({});

  const validateInput = (): boolean => {
    let valid = true;
    const newError: Partial<PluginInput> = {};

    if (!inputData.todo) {
      newError.todo = '필수 입력항목 입니다.';
      valid = false;
    }
    setIsError(newError);
    return valid;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setInputData((prev) => ({ ...prev, [name]: e.target.value }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateInput()) return;
    onCreateClick(inputData);
    onClose();
    setInputData({ url: '', todo: '', goal: 0 });
  };
  const handleChangeSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    setInputData((prev) => ({ ...prev, goal: Number(e.target.value) }));
  };

  return (
    <Modal isOpen={isOpen} hideCloseButton classNames={{ body: 'px-4 py-0', footer: 'justify-start p-6 pt-0' }}>
      <ModalContent>
        <ModalHeader>
          <div className='py-2 px-[5px]'>
            <Logo className='w-[280px] h-[35px] shrink-0' />
          </div>
        </ModalHeader>
        <ModalBody>
          <form id='newTodo' onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <div>
              <MixedInput
                type='href'
                size='full'
                name='url'
                errorMessage={isError.url}
                value={inputData.url}
                handleChange={handleChange}
                props={{ placeholder: '첨부할 링크를 입력 하세요' }}
              />
            </div>
            <div>
              <MixedInput
                type='text'
                size='full'
                name='todo'
                errorMessage={isError.todo}
                value={inputData.todo}
                handleChange={handleChange}
                props={{ placeholder: '할 일의 제목을 적어주세요.' }}
              />
            </div>
            <div>
              <Selector
                name='goal'
                placeholder='목표를 선택해 주세요.'
                size='small'
                label='Add to'
                items={mock}
                value={inputData.goal}
                onChange={handleChangeSelected}
              />
            </div>
          </form>
        </ModalBody>
        <div className='py-6'>
          <Divider className='bg-slate-200' />
        </div>
        <ModalFooter>
          <div>
            <Button type='submit' variant='solid' size='md' form='newTodo'>
              생성하기
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
