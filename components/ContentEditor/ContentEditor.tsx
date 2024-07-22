'use client';

import React, { useEffect, useMemo } from 'react';
import { CustomToolbar } from './CustomToolbar';
import 'react-quill/dist/quill.snow.css';
import { renderToString } from 'react-dom/server';
import { EditorColor } from '@/assets/svgs';
import './CustomQuill.css';
import dynamic from 'next/dynamic';

type ContentEditorProps = {
  value?: string;
  handleEditorChange: (content: string) => void;
};

const Editor = dynamic(() => import('react-quill-new'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function ContentEditor({ value, handleEditorChange }: ContentEditorProps) {
  useEffect(() => {
    const loadIcons = async () => {
      const Quill = (await import('react-quill')).default.Quill;
      const icons = Quill.import('ui/icons');
      icons['color'] = renderToString(<EditorColor className='w-[18px] h-[18px] active: border-none' />);
    };
    loadIcons();
  }, []);
  const handleChange = (content: string) => {
    handleEditorChange(content);
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: '#toolbar',
      },
    };
  }, []);

  return (
    <div className='flex flex-col grow pb-[70px] overflow-y-auto'>
      <Editor
        theme='snow'
        modules={modules}
        placeholder='이곳을 클릭하여 입력해주세요'
        value={value}
        onChange={handleChange}
      />
      <CustomToolbar />
    </div>
  );
}
