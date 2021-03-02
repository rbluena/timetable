import dynamic from 'next/dynamic';
// import Editor from 'react-tapable-editor';
const Editor = dynamic(
  () => import('react-tapable-editor').then((mod) => mod.Editor),
  { ssr: false }
);

const RichEditor = () => (
  <div>
    <Editor />
  </div>
);

export default RichEditor;
