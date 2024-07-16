'use client';

import { getRequest, patchRequest, postRequest } from '@/api/api';
import { Cancel, NoteFlag } from '@/assets/svgs';
import Button from '@/components/Buttons/Button';
import ContentEditor from '@/components/ContentEditor/ContentEditor';
import Counting from '@/components/Counting/Counting';
import LinkBar from '@/components/LinkBar/LinkBar';
import Toast from '@/components/Toast/Toast';
import ToastRender from '@/components/Toast/ToastRender';
import { useEmbedingUrlStore } from '@/stores/useEmbedingUrlStore';
import { NoteInputValue } from '@/types/Note';
import { Todo } from '@/types/Todo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const noti = () => toast(<ToastRender />);

export default function Note() {
  const { url, setUrl } = useEmbedingUrlStore();

  const { todoId } = useParams();

  const INITIAL_VALUE = { todoId: Number(todoId), title: '', content: '', linkUrl: url };

  const [hasNote, setHasNote] = useState(false);
  const [inputValue, setInputValue] = useState<NoteInputValue>(INITIAL_VALUE);
  const [disable, setDisable] = useState({ pullButton: true, pushButton: true });

  const queryClient = useQueryClient();

  const router = useRouter();

  const { isLoading, data: todos } = useQuery({ queryKey: ['getTodos'], queryFn: () => getRequest({ url: 'todos' }) });

  const { mutate: createNote } = useMutation({
    mutationKey: ['postNote'],
    mutationFn: (noteValue: NoteInputValue) => postRequest({ url: `notes`, data: noteValue }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTodos'] });
      setInputValue(INITIAL_VALUE);
      router.push('/todolist');
    },
  });

  const { mutate: editNote } = useMutation({
    mutationKey: ['patchNote'],
    mutationFn: (noteValue: NoteInputValue) => patchRequest({ url: `notes/${todo.noteId}`, data: noteValue }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTodos'] });
      setInputValue(INITIAL_VALUE);
      router.push('/todolist');
    },
  });

  const todo = todos?.todos.find((item: Todo) => Number(todoId) === item.id);

  const noteHeader = hasNote ? '노트 수정' : '노트 작성';

  const noteCompleteButtonText = hasNote ? '수정 하기' : '작성 완료';

  const { data: notes } = useQuery({
    queryKey: ['getNote'],
    queryFn: () => getRequest({ url: `notes/${todo.noteId}` }),
    enabled: hasNote,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setInputValue((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleEditorChange = (content: string) => {
    setInputValue((prev) => ({ ...prev, content: content }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.linkUrl) {
      inputValue.linkUrl = null;
    }

    if (hasNote) {
      editNote(inputValue);
      return;
    }

    createNote(inputValue);
  };

  const handleDataSaveClick = (buttonType: 'push' | 'pull') => {
    if (buttonType === 'push') {
      localStorage.clear();

      Object.entries(inputValue).forEach(([key, value]) => {
        if (typeof value === 'number') {
          localStorage.setItem(key, String(value));
        } else {
          localStorage.setItem(key, value || '');
        }
      });

      noti();
      setDisable((prev) => ({ ...prev, pullButton: false }));
      return;
    }

    if (buttonType === 'pull') {
      const savedData: { [key: string]: string | null } = {};

      Object.keys(localStorage).forEach((key) => {
        savedData[key] = localStorage.getItem(key);
      });

      setInputValue((prev) => ({
        ...prev,
        title: savedData.title || '',
        content: savedData.content || '',
        todoId: Number(savedData.todoId),
      }));

      setUrl(savedData.linkUrl || '');
    }
  };

  useEffect(() => {
    setHasNote(!!todo?.noteId);

    if (todoId !== localStorage.getItem('todoId')) {
      setDisable((prev) => ({ ...prev, pullButton: true }));
      return;
    }
    setDisable((prev) => ({ ...prev, pullButton: false }));

    if (!hasNote) {
      setInputValue(INITIAL_VALUE);
      return;
    }
    setInputValue((prev) => ({
      ...prev,
      todoId: Number(todoId),
      title: notes?.title ?? '',
      content: notes?.content ?? '',
    }));
  }, [todo, notes]);

  useEffect(() => {
    setInputValue((prev) => ({ ...prev, linkUrl: url ?? null }));
  }, [url]);

  if (isLoading) return <div>...isLoading</div>;

  return (
    <main className='bg-white'>
      <div className='pt-6 max-w-[793px] min-h-screen relative'>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-lg font-semibold text-slate-900'>{noteHeader}</h1>
            <div className='flex gap-2 '>
              <Button
                type='button'
                onClick={() => handleDataSaveClick('push')}
                disabled={inputValue.title.length === 0 || inputValue.content.length === 0}
                className='sm:h-9 md:h-11'
              >
                임시저장
              </Button>
              <Button
                type='submit'
                variant='solid'
                disabled={inputValue.title.length === 0 || inputValue.content.length === 0}
                className='sm:h-9 md:h-11'
              >
                {noteCompleteButtonText}
              </Button>
            </div>
          </div>
          {!disable.pullButton && (
            <div
              data-temp={!disable.pullButton}
              className='flex data-[] items-center justify-between rounded-3xl bg-blue-50 py-4 pl-4 pr-3 mb-6'
            >
              <div className='flex gap-4'>
                <button
                  onClick={() => {
                    localStorage.clear();
                  }}
                  type='button'
                  className='bg-blue-500 rounded-full w-[18px] h-[18px] flex items-center justify-center'
                >
                  <Cancel strokeColor='#F8FAFC' className='w-2.5 h-2.5 shrink-0' />
                </button>
                <p className='text-sm font-semibold text-blue-500'>
                  임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?
                </p>
              </div>
              <Button
                type='button'
                size='sm'
                onClick={() => handleDataSaveClick('pull')}
                disabled={disable.pullButton}
                className='h-9 rounded-3xl'
              >
                불러오기
              </Button>
            </div>
          )}
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
          <div className='flex flex-col '>
            <Counting isTitle={false} target={inputValue.content} className='mb-3' />
            {inputValue.linkUrl && <LinkBar linkUrl={inputValue.linkUrl} />}
            <Toast />
          </div>
        </form>
        <ContentEditor
          linkUrlView={!!inputValue.linkUrl}
          value={inputValue.content}
          handleEditorChange={handleEditorChange}
        />
      </div>
    </main>
  );
}
