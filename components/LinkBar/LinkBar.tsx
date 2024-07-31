import { Cancel, Embeded } from '@/assets/svgs';
import { useEmbedingUrlStore } from '@/stores/useEmbedingUrlStore';
import { Dispatch, SetStateAction } from 'react';

type LinkBarProps = {
  linkUrl: string;
  embededOpen: (url: string) => void;
  setEmbedUrl?: Dispatch<SetStateAction<string | null>>;
  cancelView?: boolean;
};

export default function LinkBar({ linkUrl, embededOpen, setEmbedUrl, cancelView }: LinkBarProps) {
  const { clearUrl } = useEmbedingUrlStore();

  const handleCancelClick = () => {
    clearUrl();
    if (setEmbedUrl) {
      setEmbedUrl(null);
    }
  };
  return (
    <div className='flex items-center justify-between bg-green-50 rounded-[28px] mb-4'>
      <div className='flex items-center gap-[5px] overflow-hidden'>
        <button type='button' className='py-1 pl-1.5' onClick={() => embededOpen(linkUrl)}>
          <Embeded className='w-6 h-6' />
        </button>
        <p className='text-slate-800 truncate'>{linkUrl}</p>
      </div>
      {cancelView && (
        <div className='py-1 pr-1.5 shrink-0'>
          <button
            type='button'
            className='flex items-center justify-center rounded-full bg-slate-500 w-[18px] h-[18px] p-[3px]'
            onClick={handleCancelClick}
          >
            <Cancel strokeColor={'#F8FAFC'} />
          </button>
        </div>
      )}
    </div>
  );
}
