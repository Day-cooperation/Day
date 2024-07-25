'use client';

import { patchRequest, postRequest } from '@/lib/api/api';
import { Cancel, NoteFlag } from '@/assets/svgs';
import Button from '@/components/Buttons/Button';
import ContentEditor from '@/components/ContentEditor/ContentEditor';
import Counting from '@/components/Counting/Counting';
import Embeded from '@/components/Embeded/Embeded';
import LinkBar from '@/components/LinkBar/LinkBar';
import ConfirmPopup from '@/components/Popup/ConfirmPopup';
import Toast from '@/components/Toast/Toast';
import ToastRender from '@/components/Toast/ToastRender';
import { useGetQuery } from '@/queries/query';
import { useEmbedingUrlStore } from '@/stores/useEmbedingUrlStore';
import { useSideMenuOpen } from '@/stores/useSideMenuOpen';
import { NoteInputValue } from '@/types/Note';
import { Todo } from '@/types/Todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { queryKey } from '@/queries/query';
import { Spinner } from '@nextui-org/react';

const noti = () => toast(<ToastRender />);

type InputValueTypes = Omit<NoteInputValue, 'linkUrl'> & {
  linkUrl?: string | null;
};

export default function Note() {
  const { url, setUrl, clearUrl } = useEmbedingUrlStore();

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const { isOpen } = useSideMenuOpen();

  const { todoId } = useParams() || {};

  const INITIAL_VALUE = { todoId: Number(todoId) || null, title: '', content: '', linkUrl: url || '' };

  const [hasNote, setHasNote] = useState(false);
  const [inputValue, setInputValue] = useState<InputValueTypes>(INITIAL_VALUE);
  const [disable, setDisable] = useState({ pullButton: true, pushButton: true });
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [confirmDescription, setConfirmDescription] = useState('');
  const [confirmType, setConfirmType] = useState('');
  const [postEnable, setPostEnable] = useState(false);

  const mainTagClassName = `${
    embedUrl
      ? 'lg:flex data-[open=true]:lg:!-ml-[52px] data-[open=true]:lg:w-[calc(100vw-279px)] data-[open=false]:lg:!-ml-[279px] data-[open=false]:lg:w-[calc(100vw-60px)] '
      : 'data-[open=false]:lg:!-ml-[279px] data-[open=true]:lg:w-[calc(100vw-331px)] data-[open=false]:lg:w-[calc(100vw-60px)]'
  }`;

  const queryClient = useQueryClient();

  const router = useRouter();

  const { isLoading, data: todos } = useGetQuery.todo();

  const { mutate: createNote } = useMutation({
    mutationKey: ['postNote'],
    mutationFn: (noteValue: InputValueTypes) => postRequest({ url: `notes`, data: noteValue }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.todo());
      setInputValue(INITIAL_VALUE);
      clearUrl();
      router.push('/todolist');
    },
  });

  const { mutate: editNote } = useMutation({
    mutationKey: ['patchNote'],
    mutationFn: (noteValue: InputValueTypes) => patchRequest({ url: `notes/${todo.noteId}`, data: noteValue }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.todo());
      setInputValue(INITIAL_VALUE);
      clearUrl();
      router.push('/todolist');
    },
  });

  const todo = todos?.todos.find((item: Todo) => Number(todoId) === item.id);

  const noteHeader = hasNote ? '노트 수정' : '노트 작성';

  const noteCompleteButtonText = hasNote ? '수정 하기' : '작성 완료';

  const { data: notes, isLoading: noteGetLoading } = useGetQuery.note(undefined, todo?.noteId, hasNote);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({ ...prev, title: e.target.value }));
    if (e.target.value === notes?.title) {
      setPostEnable(false);
    } else {
      setPostEnable(true);
    }
  };

  const handleEditorChange = (content: string) => {
    setInputValue((prev) => ({ ...prev, content: content }));
    if (content === notes?.content) {
      setPostEnable(false);
    } else {
      setPostEnable(true);
    }
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
    if (!inputValue.linkUrl) {
      delete inputValue.linkUrl;
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

  const handleEmbedeOpen = (url: string) => {
    setEmbedUrl(() => url);
  };

  const handleConfirm = (message: string, type: string) => {
    if (!dialogRef.current) return;
    setConfirmDescription(message);
    setConfirmType(type);
    dialogRef.current.showModal();
  };

  const handleConfirmPopup = (confirm: string, type: string) => {
    if (type === 'saved data reload') {
      if (confirm === 'ok') {
        handleDataSaveClick('pull');
      }
      return;
    }
    if (type === 'saved data remove') {
      if (confirm === 'ok') {
        localStorage.clear();
        setDisable((prev) => ({ ...prev, pullButton: true }));
      }
    }
  };

  useEffect(() => {
    setInputValue((prev) => ({ ...prev, linkUrl: url }));
    if (url === notes?.linkUrl) {
      setPostEnable(false);
      return;
    }
    setPostEnable(true);
  }, [url]);

  useEffect(() => {
    setHasNote(!!todo?.noteId);

    if (!todo?.noteId) {
      setInputValue(INITIAL_VALUE);
      clearUrl();
      return;
    }

    setInputValue((prev) => ({
      ...prev,
      todoId: Number(todoId),
      title: notes?.title,
      content: notes?.content,
    }));

    setUrl(notes?.linkUrl);

    if (todoId !== localStorage.getItem('todoId')) {
      setDisable((prev) => ({ ...prev, pullButton: true }));
      return;
    }

    setDisable((prev) => ({ ...prev, pullButton: false }));
  }, [todo, notes]);

  return (
    <>
      <ConfirmPopup
        dialogRef={dialogRef}
        confirmText={`'${inputValue.title}'`}
        description={confirmDescription}
        confirm
        onConfirmClick={handleConfirmPopup}
        type={confirmType}
      />
      <main data-open={isOpen} className={`bg-white h-full ${mainTagClassName}`}>
        {embedUrl && (
          <Embeded
            embedUrl={embedUrl}
            dataYoutube={embedUrl.includes('youtube')}
            onClick={() => setEmbedUrl(() => null)}
          />
        )}
        <div className='pt-[11px] md:pt-[25px] px-4 md:px-6 w-full md:max-w-[684px] lg:min-w-[573px] lg:max-w-[793px] h-[calc(100vh-48px)] md:min-h-screen md:max-h-screen flex flex-col relative overflow-y-scroll '>
          {isLoading || noteGetLoading ? (
            <Spinner className='absolute top-[calc(50%-16px)] left-[calc(50%-16px)]' />
          ) : (
            <>
              <form onSubmit={handleSubmit} className='w-full'>
                <div className='relative flex justify-between items-center mb-4'>
                  <h1 className='md:text-lg font-semibold text-slate-900'>{noteHeader}</h1>
                  <div className='flex gap-2 -mr-1.5'>
                    <Button
                      type='button'
                      onClick={() => handleDataSaveClick('push')}
                      disabled={inputValue.title?.length === 0 || inputValue.content?.length === 0}
                      className='w-[84px] h-9 md:w-[102px] md:h-11'
                    >
                      임시저장
                    </Button>
                    <Button
                      type='submit'
                      variant='solid'
                      disabled={!postEnable}
                      className='w-[84px] h-9 md:w-[102px] md:h-11'
                    >
                      {noteCompleteButtonText}
                    </Button>
                  </div>
                </div>
                {!disable.pullButton && (
                  <div className='flex items-center justify-between rounded-3xl bg-blue-50 px-3 py-2.5 md:py-4  md:pl-4 md:pr-3 mb-6'>
                    <div className='flex lg:gap-4 items-center'>
                      <button
                        onClick={() => {
                          handleConfirm('제목의 임시저장된 데이터를 지우시겠어요?', 'saved data remove');
                        }}
                        type='button'
                        className='shrink-0 rounded-full p-[3px] w-6 h-6 '
                      >
                        <div className='bg-blue-500 rounded-full w-full h-full flex items-center justify-center'>
                          <Cancel strokeColor='#F8FAFC' className='w-2.5 h-2.5 shrink-0' />
                        </div>
                      </button>
                      <p className='px-3 text-sm font-semibold text-blue-500'>
                        임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?
                      </p>
                    </div>
                    <Button
                      type='button'
                      size='sm'
                      onClick={() => handleConfirm('제목의 노트를 불러오시겠어요?', 'saved data reload')}
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
                  {todo?.goal ? (
                    <h2 className='font-medium text-slate-800'>{todo.goal.title}</h2>
                  ) : (
                    <h2 className='font-medium text-slate-300'>설정된 목표가 없어요.</h2>
                  )}
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
                    className='py-3 md:text-lg font-medium placeholder:text-slate-400 border-y-1 w-full'
                    placeholder='노트의 제목을 입력해주세요'
                    value={inputValue.title || ''}
                    onChange={handleTitleChange}
                  />
                  <Counting isTitle={true} target={inputValue.title} className='absolute top-3 right-0 font-medium' />
                </div>
                <div className='flex flex-col '>
                  <Counting isTitle={false} target={inputValue.content} className='mb-2 md:mb-3 font-medium' />
                  {inputValue.linkUrl && (
                    <LinkBar linkUrl={inputValue.linkUrl} embededOpen={handleEmbedeOpen} cancelView />
                  )}
                  <Toast />
                </div>
              </form>
              <ContentEditor value={inputValue.content} handleEditorChange={handleEditorChange} />
            </>
          )}
        </div>
      </main>
    </>
  );
}
