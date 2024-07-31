interface Counting {
  isTitle: boolean;
  target: string;
  className?: string;
}

export default function Counting({ isTitle, target, className, ...props }: Counting) {
  return isTitle ? (
    <span
      className={`absolute text-slate-800 text-xs py-[2px] px-1 rounded-[4px] bg-[rgba(255,255,255,0.5)] ${className}`}
      {...props}
    >
      {target?.length}/<span className='text-green-500'>30</span>
    </span>
  ) : (
    <p className={`text-slate-800 text-xs ${className}`} {...props}>
      공백포함 : 총 {target?.length}자 | 공백제외 : 총 {target?.replaceAll(' ', '')?.length}자
    </p>
  );
}
