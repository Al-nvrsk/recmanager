import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import QuillToolbar, { formats, modules } from '../EditorToolbar/EditorToolbar';
import cls from './Editor.module.scss'

interface OnChangeHandler {
  (e: any): void;
}

type Props = {
  value: string;
  placeholder: string;
  onChange: OnChangeHandler;
};

const TextEditor = React.forwardRef(({ value, onChange, placeholder }: Props, ref) => {
  return (
    <>
      <QuillToolbar />
      <ReactQuill
        theme="snow"
        value={value || ''}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
});

export default TextEditor;
