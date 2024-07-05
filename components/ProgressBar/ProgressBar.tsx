import { Progress } from '@nextui-org/react';

type ProgressBarProps = {
  value: number;
};

export default function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className='flex items-center gap-2 bg-white rounded-[13px] px-[9px]'>
      <Progress aria-label='progress' size='sm' value={value} classNames={{ indicator: ['bg-slate-900'] }} />
      <span className='text-xs font-semibold text-slate-900'>{`${Number(value.toFixed(1))}%`}</span>
    </div>
  );
}
