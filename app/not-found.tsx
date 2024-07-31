import { NotFoundSVG } from '@/assets/svgs';
import Layout from './(pages)/layout';

export default function NotFound() {
  return (
    <Layout>
      <div className='lg:max-w-[1200px] h-screen lg:h-[calc(100vh-128px)] lg:my-16 lg:mr-[77px] bg-white relative flex flex-col gap-[70px] overflow-hidden'>
        <div className='flex flex-col items-center flex-1 justify-end'>
          <h1 className='text-[#fd2828] font-bold'>ERROR!</h1>
          <h2>잘못된 경로입니다!</h2>
        </div>
        <div className='flex'>
          <NotFoundSVG className='lg:max-w-[805px] lg:max-h-[365px]' />
        </div>
      </div>
    </Layout>
  );
}
