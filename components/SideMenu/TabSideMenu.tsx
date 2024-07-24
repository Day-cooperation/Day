import { Goal } from '@/types/Goal';
import { Listbox, ListboxItem } from '@nextui-org/react';

interface TabSideMenu {
  goalList: Goal[];
  handleGoalClick: (id: number) => void;
}

export default function TabSideMenu({ goalList, handleGoalClick }: TabSideMenu) {
  return (
    <Listbox aria-label='hidden'>
      {goalList?.map((goal) => (
        <ListboxItem key={goal.id} startContent='·' onClick={() => handleGoalClick(goal.id)}>
          {goal.title}
        </ListboxItem>
      ))}
    </Listbox>
  );
}
