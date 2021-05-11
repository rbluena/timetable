import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const RichEditor = dynamic(() => import('react-quill').then((mod) => mod), {
  ssr: false,
});

const Editor = () => (
  <div className="prose">
    <RichEditor theme="snow" />
  </div>
);

export default Editor;
