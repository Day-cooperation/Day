import { Modal as NextModal, ModalContent } from '@nextui-org/react';
import ConfirmPopup from '../Popup/ConfirmPopup';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import LinkUrlPopup from '../Popup/LinkUrlPopup';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import { NewTodo, Todo } from '@/types/Todo';
import ModalFooter from './ModalFooter';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { convertTodoToFormdata } from '@/utils/convertTodoToFormdata';
import { fileUpload } from '@/lib/api/fileUpload';
import { Goal } from '@/types/Goal';
import { patchRequest, postRequest } from '@/lib/api/api';
import { queryKey, useGetQuery } from '@/queries/query';

type ModalProps = {
  modalType: 'create' | 'edit';
  items?: Todo;
  isOpen: boolean;
  onClose: () => void;
  index?: number;
  goalId?: number;
};

const INITIAL_DATA = { title: '', fileUrl: '', linkUrl: '', goalId: 0, done: false };

export default function Modal({ modalType, items, isOpen, onClose, index, goalId }: ModalProps) {
  const convertData = convertTodoToFormdata(items);
  const queryClient = useQueryClient();
  const [confirmValue, setConfirmText] = useState({ type: 'popup', text: '', description: '' });
  const [data, setData] = useState<NewTodo>(convertData);
  const [chips, setChips] = useState({ file: false, link: false });
  const confirmRef = useRef<HTMLDialogElement | null>(null);
  const linkUrlRef = useRef<HTMLDialogElement | null>(null);

  const { data: goalListResponse } = useGetQuery.goal();
  const { mutate, isPending } = useMutation({
    mutationKey: ['post-file'],
    mutationFn: (file: FormData) => fileUpload(file),
    onSuccess: (response) => {
      setChips((prev) => ({ ...prev, file: true }));
      setData((prev) => ({ ...prev, fileUrl: response?.data.url }));
    },
    onError: () => {
      setConfirmText({
        type: 'error',
        text: '파일 업로드 실패',
        description: '파일 크기는 3MB 이하만 가능합니다.',
      });

      confirmRef.current?.showModal();
    },
  });
  const { mutate: newTodoMutate } = useMutation({
    mutationKey: ['post-newTodo'],
    mutationFn: (todoPostData: NewTodo) => postRequest({ url: 'todos', data: todoPostData }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.todoAll);
      goalListResponse?.goals?.forEach((goal: Goal) => {
        queryClient.invalidateQueries(queryKey.todo(goal.id));
        queryClient.invalidateQueries(queryKey.progress(goal.id));
      });
      setData(INITIAL_DATA);
      setChips({ file: false, link: false });
    },
  });

  const { mutate: editTodoMutate } = useMutation({
    mutationKey: ['postEditTodo'],
    mutationFn: (todoPostData: NewTodo) => patchRequest({ url: `todos/${items?.id}`, data: todoPostData }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.todoAll);
      goalListResponse?.goals?.forEach((goal: Goal) => {
        queryClient.invalidateQueries(queryKey.todo(goal.id));
        queryClient.invalidateQueries(queryKey.progress(goal.id));
      });
      setData(INITIAL_DATA);
      setChips({ file: false, link: false });
    },
  });

  const handleConfirmPopupOpen = () => {
    if (!confirmRef.current) return;
    const newText = modalType === 'create' ? '할 일을 생성하시겠어요?' : '수정 하시겠습니까?';
    const newDescription = modalType === 'create' ? '할 일이 추가됩니다.' : '수정된 내용을 반영합니다.';
    setConfirmText({ type: 'popup', text: newText, description: newDescription });
    confirmRef.current.showModal();
  };

  const handleFileFormat = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileData = new FormData();
    fileData.append('file', file);
    mutate(fileData);
  };

  const onConfirmClick = (response: 'ok' | 'cancel', type: string) => {
    if (response === 'cancel') return;
    if (type === 'error') return;
    if (response === 'ok' && type === 'modal') {
      onClose();
      if (modalType === 'create') {
        setData(INITIAL_DATA);
        setChips({ file: false, link: false });
        return;
      }
    }
    const todoUpdateData = () => {
      if (!data.fileUrl) {
        delete data.fileUrl;
      }
      if (!data.linkUrl) {
        delete data.linkUrl;
      }
      if (!data.goalId) {
        delete data.goalId;
      }
      return data;
    };
    if (modalType === 'create') {
      newTodoMutate(todoUpdateData());
    }

    if (modalType === 'edit') {
      editTodoMutate(todoUpdateData());
      setData(INITIAL_DATA);
    }
    onClose();
  };

  const onLinkUrlChange = (response: string) => {
    if (response === 'cancel') return;
    setData((prev) => ({ ...prev, linkUrl: response }));
    setChips((prev) => ({ ...prev, link: true }));
  };

  const handleLinkUrlPopupOpen = () => {
    if (!linkUrlRef.current) return;
    linkUrlRef.current.showModal();
  };

  const handleConfirmModalClose = () => {
    if (!confirmRef.current) return;
    setConfirmText({ type: 'modal', text: '정말 나가시겠어요?', description: '작성된 내용이 모두 삭제됩니다.' });
    confirmRef.current.showModal();
  };

  useEffect(() => {
    const handleModalClose = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        handleConfirmModalClose();
      }
    };
    if (!isOpen) return;
    document.addEventListener('keydown', handleModalClose);

    return () => document.removeEventListener('keydown', handleModalClose);
  }, [isOpen]);
  useEffect(() => {
    setData(convertData);
    setChips({ file: !!convertData.fileUrl, link: !!convertData.linkUrl });
  }, [items]);

  useEffect(() => {
    if (typeof index === 'number') {
      setData((prev) => ({ ...prev, goalId: goalListResponse?.goals[index].id }));
      return;
    }
    if (!goalId) return;
    setData((prev) => ({ ...prev, goalId: goalId }));
  }, [isOpen]);
  return (
    <>
      <ConfirmPopup
        onConfirmClick={onConfirmClick}
        dialogRef={confirmRef}
        confirmText={confirmValue.text}
        description={confirmValue.description}
        type={confirmValue.type}
      />
      <LinkUrlPopup dialogRef={linkUrlRef} onLinkUrlChange={onLinkUrlChange} />
      <NextModal
        isOpen={isOpen}
        isDismissable={false}
        classNames={{
          base: 'fixed inset-0 rounded-none mx-0 my-0 sm:mx-0 sm:my-0 md:flex md:flex-col md:relative z-50 w-full md:mx-1 md:my-1 max-w-md md:rounded-large max-w-full md:max-w-md overflow-y-auto',
          header: 'flex flex-col items-start',
          closeButton: 'data-[focus-visible=true]:!outline-none ',
        }}
        onClose={handleConfirmModalClose}
      >
        <ModalContent>
          <ModalHeader data={data} setData={setData} modalType={modalType} />
          <ModalBody
            data={data}
            setData={setData}
            handleLinkUrlPopupOpen={handleLinkUrlPopupOpen}
            handleFileFormat={handleFileFormat}
            fileName={data.fileUrl}
            items={goalListResponse?.goals ? goalListResponse?.goals : []}
            chips={chips}
            isPending={isPending}
          />
          <ModalFooter data={data} handleConfirmPopupOpen={handleConfirmPopupOpen} />
        </ModalContent>
      </NextModal>
    </>
  );
}
