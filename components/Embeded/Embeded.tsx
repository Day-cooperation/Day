import { Cancel } from '@/assets/svgs';

type EmbededProps = {
  embedUrl: string;
  dataYoutube: boolean;
  onClick: () => void;
};

export default function Embeded({ embedUrl, dataYoutube, onClick }: EmbededProps) {
  return (
    <div
      data-youtube={dataYoutube}
      className='h-[425px] md:h-auto lg:flex lg:h-screen lg:min-w-[543px] lg:flex-col lg:justify-center bg-blue-50 group overflow-hidden lg:relative'
    >
      <div className='flex justify-end bg-white p-2 lg:absolute lg:top-0 lg:left-0 lg:right-0'>
        <button className='w-6 h-6 p-[5px]' onClick={onClick}>
          <Cancel />
        </button>
      </div>
      <div className='lg:flex lg:items-center group-data-[youtube=false]:lg:flex-col lg:flex-1 lg:mt-10 h-full'>
        <div className='w-full px-[10px] md:px-0 bg-white group-data-[youtube=false]:h-full group-data-[youtube=false]:md:h-[552px] group-data-[youtube=true]:relative group-data-[youtube=true]:pt-[56.25%] group-data-[youtube=false]:lg:flex-1 overflow-hidden'>
          <iframe
            width={'100%'}
            height={'100%'}
            src={embedUrl}
            allow='acceleromater; autoplay; clipboard-write encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            className='group-data-[youtube=true]:absolute group-data-[youtube=true]:top-0 group-data-[youtube=true]:bottom-0 lg:w-[543px] data-[youtube=false]:h-[clac(100%-40px)]'
          ></iframe>
        </div>
      </div>
    </div>
  );
}
