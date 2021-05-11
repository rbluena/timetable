import dynamic from 'next/dynamic';

const RichEditor = dynamic(
  () => import('@tinymce/tinymce-react').then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

const Editor = () => (
  <div>
    <RichEditor />
  </div>
);

export default Editor;
