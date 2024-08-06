'use client';

import { useState } from 'react';

type CATEGORY = 'All' | 'To do' | 'Done';
const CATEGORY_LIST: CATEGORY[] = ['All', 'To do', 'Done'];

export default function Filter({
  handleClick,
  selectedItem,
}: {
  handleClick: (category: CATEGORY) => void;
  selectedItem: CATEGORY;
}) {
  const [selectedCategory, setSelectedCategory] = useState<CATEGORY>(selectedItem);

  const handleCategoryClick = (category: CATEGORY) => {
    setSelectedCategory(category);
    handleClick(category);
  };
  return (
    <div className='flex gap-2'>
      {CATEGORY_LIST.map((category) => (
        <button
          aria-label={category}
          aria-pressed={selectedCategory === category}
          key={category}
          className={`${selectedCategory === category ? 'border-green-500 bg-green-500 text-white' : 'text-slate-800 border-slate-200 bg-white'} duration-150 py-1 px-3 text-sm border-[1px] rounded-[17px]`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
