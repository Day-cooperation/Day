'use client';

import { Link } from '@/assets/svgs';
import { useRef } from 'react';
import LinkUrlPopup from '../Popup/LinkUrlPopup';
import './CustomQuill.css';
import { useEmbedingUrlStore } from '@/stores/useEmbedingUrlStore';

export const CustomToolbar = () => {
  const linkPopupRef = useRef<HTMLDialogElement | null>(null);
  const { setUrl } = useEmbedingUrlStore();

  const handleLinkPopupOpenClick = () => {
    if (!linkPopupRef.current) return;
    linkPopupRef.current.showModal();
  };
  return (
    <>
      <LinkUrlPopup dialogRef={linkPopupRef} onLinkUrlChange={(response) => setUrl(response)} />
      <div id='toolbar' className='rounded-[21.5px] bg-white border-slate-200 absolute bottom-6 left-0 right-0 flex'>
        <div className='grow flex justify-between'>
          <div>
            <span className='ql-formats'>
              <button className='ql-bold' />
              <button className='ql-italic' />
              <button className='ql-underline' />
            </span>
            <span className='ql-formats'>
              <button className='ql-align' value='' />
              <button className='ql-align' value='center' />
              <button className='ql-align' value='right' />
            </span>
            <span className='ql-formats'>
              <button className='ql-list' value='bullet' />
              <button className='ql-list' value='ordered' />
              <select className='ql-color custom-color-picker'></select>
            </span>
          </div>
          <div>
            <button onClick={handleLinkPopupOpenClick}>
              <Link className='w-6 h-6 ' />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
