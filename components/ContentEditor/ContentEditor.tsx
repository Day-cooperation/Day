'use client';

import React, { useEffect, useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { CustomToolbar } from './CustomToolbar';
import 'react-quill/dist/quill.snow.css';
import { renderToString } from 'react-dom/server';
import { EditorColor } from '@/assets/svgs';
import './CustomQuill.css';

type ContentEditorProps = {
  value?: string;
  handleEditorChange: (content: string) => void;
  linkUrlView: boolean;
};

export default function ContentEditor({ value, handleEditorChange, linkUrlView }: ContentEditorProps) {
  const icons = Quill.import('ui/icons');
  icons['color'] = renderToString(<EditorColor className='w-[18px] h-[18px] active: border-none' />);

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

  useEffect(() => {
    if (!process.browser) return;
    const editorNode = document.querySelector('.ql-editor');
    if (linkUrlView) {
      editorNode?.setAttribute('data-link', 'true');
    } else {
      editorNode?.setAttribute('data-link', 'false');
    }
  }, [linkUrlView]);

  return (
    <>
      <ReactQuill
        theme='snow'
        modules={modules}
        placeholder='이곳을 클릭하여 입력해주세요'
        value={value}
        onChange={handleChange}
      />
      <CustomToolbar />
    </>
  );
}
