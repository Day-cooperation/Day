'use client';

import { File, Link, Note, NoteWrite } from '@/assets/svgs';
import { ListTodoButtons, Todo } from '@/types/Todo';

type TodoListButtonsProps = {
  item: Todo;
  handleClick: (buttonType: ListTodoButtons, id: number) => void;
};
export default function TodoListButtons({ item, handleClick }: TodoListButtonsProps) {
  return (
    <>
      {item.fileUrl && (
        <button aria-label='file' onClick={() => handleClick('file', item.id)}>
          <File className='w-6 h-6' />
        </button>
      )}
      {item.linkUrl && (
        <button aria-label='link' onClick={() => handleClick('link', item.id)}>
          <Link className='w-6 h-6' />
        </button>
      )}
      {item.noteId && (
        <button aria-label='note-read' onClick={() => handleClick('note read', item.id)}>
          <Note className='w-6 h-6' />
        </button>
      )}
      <button aria-label='note-write' className='hidden group-hover:block' onClick={() => handleClick('note write', item.id)}>
        <NoteWrite className='w-6 h-6' />
      </button>
    </>
  );
}
