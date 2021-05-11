import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const RichEditor = dynamic(() => import('jodit-react').then((mod) => mod), {
  ssr: false,
});

const Editor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  return (
    <div className="prose">
      <RichEditor
        ref={editor}
        value={content}
        config={config}
        // tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
    </div>
  );
};

export default Editor;
