import { Goal } from '@/types/Goal';
import { Listbox, ListboxItem } from '@nextui-org/react';

export default function TabSideMenu({ goalList, handleGoalClick }: { goalList: Goal[]; handleGoalClick: () => void }) {
  return (
    <div className='relative h-[calc(100vh-283px)] md:h-[calc(100vh-440px)] overflow-y-auto md:mb-6 mb-[-48px]'>
      <Listbox>
        {goalList.map((goal) => (
          <ListboxItem key={goal.id} startContent='·' onClick={handleGoalClick}>
            {goal.title}
          </ListboxItem>
        ))}
      </Listbox>
      <div className='sticky bottom-0 w-full h-12 bg-gradient-to-b from-white/0 to-white/100' />
    </div>
  );
}
