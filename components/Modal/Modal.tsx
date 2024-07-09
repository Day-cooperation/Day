import { Modal as NextModal, ModalContent } from '@nextui-org/react';
import ConfirmPopup from '../Popup/ConfirmPopup';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Goal } from '@/types/Goal';
import LinkUrlPopup from '../Popup/LinkUrlPopup';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import { NewTodo } from '@/types/Todo';
import ModalFooter from './ModalFooter';

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

type ModalProps = {
  modalType: 'create' | 'edit';
  modalTodoState: boolean;
  items?: NewTodo;
  isOpen: boolean;
  onClose: () => void;
  goalList?: Goal[];
};

const initialData = { title: '', fileUrl: '', linkUrl: '', goalId: 0, done: false };

export default function Modal({ modalType, items, goalList, isOpen, onClose }: ModalProps) {
  const [confirmValue, setConfirmText] = useState({ type: 'popup', text: '', description: '' });
  const [chips, setChips] = useState({ file: items?.fileUrl ? true : false, link: items?.linkUrl ? true : false });
  const [data, setData] = useState(modalType === 'create' ? initialData : items || initialData);

  const confirmRef = useRef<HTMLDialogElement | null>(null);
  const linkUrlRef = useRef<HTMLDialogElement | null>(null);

  const handleConfirmPopupOpen = () => {
    if (!confirmRef.current) return;
    const newText = modalType === 'create' ? '할 일을 생성하시겠어요?' : '수정 하시겠습니까?';
    const newDescription = modalType === 'create' ? '할 일이 추가됩니다.' : '수정된 내용을 반영합니다.';
    setConfirmText({ type: 'popup', text: newText, description: newDescription });
    confirmRef.current.showModal();
  };

  const handleFileFormat = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setChips((prev) => ({ ...prev, file: true }));
      //TODO 파일 url주소 받아와야함 setData((prev) => ({...prev, linkUrl:여기}))
    }
  };

  const onConfirmClick = (response: 'ok' | 'cancel', type: string) => {
    if (response === 'cancel') return;
    if (response === 'ok' && type === 'modal') {
      onClose();
      setData(initialData);
      setChips({ file: false, link: false });
      return;
    }
    console.log(data); //TODO data를 post하고 성공하면 밑에줄 이어지게 실패시 실패 팝업
    setData(initialData);
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
          header: 'flex flex-col items-start',
          closeButton: 'data-[focuc-visible=true]:!outline-none ',
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
            items={mock}
            chips={chips}
          />
          <ModalFooter data={data} handleConfirmPopupOpen={handleConfirmPopupOpen} />
        </ModalContent>
      </NextModal>
    </>
  );
}
