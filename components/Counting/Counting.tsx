interface Counting {
  isTitle: boolean;
  target: string;
}

export default function Counting({ isTitle, target }: Counting) {
  return isTitle ? (
    <span className='text-slate-800 text-xs py-[2px] px-1 rounded-[4px] bg-[rgba(255,255,255,0.5)]'>
      {target.length}/<span className='text-blue-500'>30</span>
    </span>
  ) : (
    <p className='text-slate-800 text-xs'>
      공백포함 : 총 {target.length}자 | 공백제외 : 총 {target.replaceAll(' ', '').length}자
    </p>
  );
}
