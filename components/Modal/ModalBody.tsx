import { ModalBody as NextModalBody } from '@nextui-org/react';
import MixedInput from '../Input/MixedInput';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Chip from '../Chip/Chip';
import Selector from '../Input/Selector';
import { Plus } from '@/assets/svgs';
import { NewTodo } from '@/types/Todo';
import { Goal } from '@/types/Goal';

type ModalBodyProps = {
  data: NewTodo;
  setData: Dispatch<SetStateAction<NewTodo>>;
  handleLinkUrlPopupOpen: () => void;
  handleFileFormat: (e: ChangeEvent<HTMLInputElement>) => void;
  fileName?: string;
  items: Goal[] | [];
  chips: { file: boolean; link: boolean };
};

export default function ModalBody({
  data,
  setData,
  handleLinkUrlPopupOpen,
  handleFileFormat,
  fileName,
  items,
  chips,
}: ModalBodyProps) {
  return (
    <NextModalBody>
      <MixedInput
        value={data?.title}
        size='full'
        name='title'
        type='text'
        handleChange={(e: ChangeEvent<HTMLInputElement>, name) => {
          setData((prev) => ({ ...prev, [name]: e.target.value }));
        }}
        props={{ placeholder: '할 일의 제목을 적어주세요', maxLength: 30 }}
      />
      <label className='font-semibold'>
        자료
        <Chip size='md' onClick={handleLinkUrlPopupOpen} isSelected={chips} />
      </label>
      <label className='flex flex-col items-center justify-center bg-slate-50 shrink-0 rounded-xl gap-2 py-16 px-[164px] hover:cursor-pointer'>
        <input type='file' className='hidden' onChange={handleFileFormat} />
        {fileName ? (
          <span>{fileName}</span>
        ) : (
          <>
            <Plus strokeColor='#94A3B8' />
            <span className='text-slate-400 text-nowrap'>파일을 업로드해주세요</span>
          </>
        )}
      </label>
      <MixedInput
        type='href'
        name='linkUrl'
        size='full'
        value={data.linkUrl}
        props={{ readOnly: true, placeholder: '영상이나 글, 파일의 링크를 넣어주세요' }}
      />
      <label className='font-semibold'>
        목표
        {items && (
          <Selector
            placeholder='목표를 선택해주세요'
            items={items}
            name='goalId'
            size='full'
            value={data.goalId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setData((prev) => ({ ...prev, goalId: Number(e.target.value) }));
            }}
          />
        )}
      </label>
    </NextModalBody>
  );
}
