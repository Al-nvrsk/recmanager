import React, { memo } from 'react';
import 'react-quill/dist/quill.snow.css';
import QuillToolbar, { formats, modules } from '../EditorToolbar/EditorToolbar';
import { Typography } from 'antd';
import ReactQuill from '../..';
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
    <div className='conteinerEditor'>
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
      </div>
    </>
  );
};

export default memo(TextEditor);
