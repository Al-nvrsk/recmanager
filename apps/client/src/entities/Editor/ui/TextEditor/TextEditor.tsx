import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import QuillToolbar, { formats, modules } from '../EditorToolbar/EditorToolbar';
import cls from './Editor.module.scss'
import { Typography } from 'antd';

const { Text } = Typography

interface OnChangeHandler {
  (e: any): void;
}

type Props = {
  value: string;
  placeholder: string;
  onChange: OnChangeHandler;
};

const TextEditor = ({ value, onChange, placeholder }: Props) => {
  return (
    <>
      <QuillToolbar />
      <Text>
      <ReactQuill
        theme="snow"
        value={value || ''}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
      />
      </Text>
    </>
  );
};

export default TextEditor;
