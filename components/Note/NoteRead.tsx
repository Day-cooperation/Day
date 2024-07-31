import { Cancel, NoteFlag } from '@/assets/svgs';
import type { NoteRead } from '@/types/Note';
import { MouseEvent, RefObject, useState } from 'react';
import LinkBar from '../LinkBar/LinkBar';
import Embeded from '../Embeded/Embeded';

type NoteProps = {
  dialogRef: RefObject<HTMLDialogElement>;
  data?: NoteRead;
};

export default function NoteRead({ dialogRef, data }: NoteProps) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const createdAtSlice = data?.createdAt.slice(0, data?.createdAt.indexOf('T'));

  const handleClickClose = (e: MouseEvent) => {
    e.preventDefault();
    if (!dialogRef.current) return;
    dialogRef.current.close();
  };
  const handleEmbededOpen = (url: string) => {
    setEmbedUrl(() => url);
  };
  return (
    <dialog ref={dialogRef} className='bg-black/50 z-100'>
      <div
        data-embed={!!embedUrl}
        className='group fixed data-[embed=true]:flex-col right-0 top-0 bg-white w-full data-[embed=true]:lg:flex-row max-w-[512px] lg:max-w-[800px] h-full data-[embed=true]:flex data-[embed=true]:lg:max-w-fit overflow-y-scroll'
      >
        {embedUrl && (
          <div className='bg-green-50 flex flex-col lg:flex-row justify-center'>
            <Embeded
              embedUrl={embedUrl}
              dataYoutube={embedUrl.includes('youtube')}
              onClick={() => setEmbedUrl(() => null)}
            />
          </div>
        )}
        <div className='p-6 flex flex-col group-data-[embed=true]:lg:max-w-[800px] lg:min-w-[481px]'>
          <button className='p-[5px]' onClick={handleClickClose}>
            <Cancel className='w-[13px] h-[13px] mb-4' />
          </button>
          <div className='flex flex-col gap-3'>
            <div className='flex gap-1.5 items-center'>
              {data?.goal ? (
                <>
                  <div className='bg-slate-800 p-1 rounded-md  '>
                    <NoteFlag className='w-6 h-6' />
                  </div>
                  <h2 className='text-slate-800 font-medium'>{data?.goal.title}</h2>
                </>
              ) : (
                <>
                  <div className='bg-slate-800 p-1 rounded-md '>
                    <NoteFlag className='w-4 h-4 ' />
                  </div>
                  <h2 className='text-slate-500 font-medium'>등록된 목표가 없습니다.</h2>
                </>
              )}
            </div>
            <div className='flex justify-between '>
              <div className='flex gap-2 items-center mb-6'>
                <span className='bg-slate-100 rounded-[4px] py-0.5 px-[3px] text-xs font-medium text-slate-700'>
                  {data?.todo.done === true ? 'Done' : 'To do'}
                </span>
                <span className='font-sm text-slate-700'>{data?.todo.title}</span>
              </div>
              <span className='text-xs text-slate-500'>{createdAtSlice?.replaceAll('-', '. ')}</span>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <h1 className='py-3 border-y-1 text-lg font-medium'>{data?.title}</h1>
            {data?.linkUrl && <LinkBar linkUrl={data.linkUrl} embededOpen={handleEmbededOpen} />}
            <div
              className='text-pretty text-slate-700 self-stretch'
              dangerouslySetInnerHTML={{
                __html: data?.content ?? '',
              }}
            />
          </div>
        </div>
      </div>
    </dialog>
  );
}
