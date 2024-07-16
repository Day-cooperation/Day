import { Cancel, Embeded } from '@/assets/svgs';
import { useEmbedingUrlStore } from '@/stores/useEmbedingUrlStore';

type LinkBarProps = {
  linkUrl: string;
};

export default function LinkBar({ linkUrl }: LinkBarProps) {
  const { clearUrl } = useEmbedingUrlStore();
  return (
    <div className='flex items-center justify-between bg-blue-50 rounded-[28px] mb-4'>
      <div className='flex items-center gap-[5px]'>
        <button type='button' className='py-1 pl-1.5'>
          <Embeded className='w-6 h-6' />
        </button>
        <p className='text-slate-800'>{linkUrl}</p>
      </div>
      <div className='py-1 pr-1.5'>
        <button
          type='button'
          className='flex items-center justify-center rounded-full bg-slate-500 w-[18px] h-[18px] p-[3px]'
          onClick={clearUrl}
        >
          <Cancel strokeColor={'#F8FAFC'} />
        </button>
      </div>
    </div>
  );
}
