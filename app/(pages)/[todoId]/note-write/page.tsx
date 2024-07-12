'use client';
import { getRequest, patchRequest, postRequest } from '@/api/api';
import { NoteFlag } from '@/assets/svgs';
import Button from '@/components/Buttons/Button';
import Counting from '@/components/Counting/Counting';
import { NoteInputValue } from '@/types/Note';
import { Todo } from '@/types/Todo';
import { Textarea } from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
const INITIAL_VALUE = { todoId: null, title: '', content: '', linkUrl: '' };
export default function Note() {
  const [hasNote, setHasNote] = useState(false);
  const [inputValue, setInputvalue] = useState<NoteInputValue>(INITIAL_VALUE);
  const [sessionData, setSessionData] = useState<NoteInputValue>();
  const [disable, setDisable] = useState({ pullButton: false, pushButton: false });
  const pathId = usePathname().split('/')[1];
  const { isLoading, data: todos } = useQuery({ queryKey: ['getTodos'], queryFn: () => getRequest({ url: 'todos' }) });

  const { mutate: createNote } = useMutation({
    mutationKey: ['postNote'],
    mutationFn: (noteValue: NoteInputValue) => postRequest({ url: `notes`, data: noteValue }),
  });
  const { mutate: editNote } = useMutation({
    mutationKey: ['patchNote'],
    mutationFn: (noteValue: NoteInputValue) => patchRequest({ url: `notes/${pathId}`, data: noteValue }),
  });

  const todo = todos?.data.todos.find((item: Todo) => Number(pathId) === item.id);
  const noteHeader = hasNote ? '노트 수정' : '노트 작성';
  const noteCompleteButtonText = hasNote ? '수정 하기' : '작성 완료';
  const { data: notes } = useQuery({
    queryKey: ['getNote'],
    queryFn: () => getRequest({ url: `notes/${todo.noteId}` }),
    enabled: hasNote,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    setInputvalue((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.linkUrl) {
      delete inputValue.linkUrl;
    }
    if (hasNote) {
      delete inputValue.todoId;
      editNote(inputValue);
      return;
    }
    createNote(inputValue);
  };

  const handleDataSaveClick = (buttonType: 'push' | 'pull') => {
    if (buttonType === 'push') {
      sessionStorage.clear();
      Object.entries(inputValue).forEach(([key, value]) => {
        if (typeof value === 'number') {
          sessionStorage.setItem(key, String(value));
        } else {
          sessionStorage.setItem(key, value || '');
        }
      });
      return;
    }
    if (buttonType === 'pull') {
      setInputvalue(sessionData ?? INITIAL_VALUE);
    }
  };

  useEffect(() => {
    setHasNote(!!todo?.noteId);
    setInputvalue((prev) => ({ ...prev, todoId: todo?.id }));
    setInputvalue((prev) => ({
      ...prev,
      title: notes?.data.title ?? '',
      linkUrl: notes?.data.linkUrl ?? '',
      content: notes?.data.content ?? '',
    }));
  }, [todo, notes]);

  useEffect(() => {
    const savedData: { [key: string]: string | null } = {};

    Object.keys(sessionStorage).forEach((key) => {
      savedData[key] = sessionStorage.getItem(key);
    });
    if (pathId !== savedData.todoId) return;
    if (savedData.title === null || savedData.content === null) return;
    setDisable((prev) => ({ ...prev, pullButton: false }));
    setSessionData((prev) => ({
      ...prev,
      title: savedData.title || '',
      content: savedData.content || '',
      linkUrl: savedData.linkUrl || '',
      todoId: Number(savedData.todoId),
    }));
  }, [handleDataSaveClick]);

  if (isLoading) return <div>...isLoading</div>;

  return (
    <main className='bg-white'>
      <div className='pt-6 max-w-[793px] min-h-screen'>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-lg font-semibold text-slate-900'>{noteHeader}</h1>
            <div className='flex gap-2 '>
              <Button
                onClick={() => handleDataSaveClick('push')}
                disabled={inputValue.title.length === 0 || inputValue.content.length === 0}
              >
                임시저장
              </Button>
              <Button onClick={() => handleDataSaveClick('pull')} disabled={disable.pullButton}>
                가져오기
              </Button>
              <Button type='submit' variant='solid'>
                {noteCompleteButtonText}
              </Button>
            </div>
          </div>
          <div className='flex gap-1.5 mb-3'>
            <div className='rounded-md bg-slate-800 p-1'>
              <NoteFlag className='w-4 h-4' />
            </div>
            <h2 className='font-medium text-slate-800'>{todo?.goal?.title}</h2>
          </div>
          <div className='flex gap-2 items-center mb-6'>
            <span className='py-0.5, px-[3px] text-xs font-medium text-slate-700 bg-slate-100 rounded-[4px]'>
              {todo?.done ? 'Done' : 'To do'}
            </span>
            <span className='text-sm text-slate-700 '>{todo?.title}</span>
          </div>
          <div className='relative mb-3'>
            <input
              name='title'
              className='py-3 text-lg placeholder:text-slate-400 border-y-1 w-full'
              placeholder='노트의 제목을 입력해주세요'
              value={inputValue.title}
              onChange={handleChange}
            />
            <Counting isTitle={true} target={inputValue.title} className='absolute top-3 right-0 font-medium' />
          </div>
          <div className='flex flex-col'>
            <Counting isTitle={false} target={inputValue.content} className='mb-3' />
            <Textarea
              name='content'
              disableAnimation={true}
              onChange={handleChange}
              maxRows={100}
              value={inputValue.content}
              className='w-full resize-none focus:outline-none placeholder:text-slate-400 font-medium'
              classNames={{
                inputWrapper: 'bg-white shadow-none data-[hover=true]:bg-white group-data-[focus=true]:bg-white p-0 ',
              }}
              placeholder='이 곳을 클릭해 노트 작성을 시작해주세요'
            />
          </div>
        </form>
      </div>
    </main>
  );
}
