/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import dynamic from 'next/dynamic';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

const baseTheme = {};

const Editor = dynamic(
  () => import('rich-markdown-editor').then((mod) => mod),
  {
    ssr: false,
  }
);

// const Editor = dynamic(
//   () => import('@toast-ui/react-editor').then((mod) => mod.Editor),
//   {
//     ssr: false,
//   }
// );

class RichEditor extends React.Component {
  editorRef = React.createRef();

  handleClickButton = (evt) => {
    const editorInstance = this.editorRef.current.getInstance();

    console.log(editorInstance);
  };

  onComponentChange = (e) => {
    const editorInstance = this.editorRef.current.getInstance();

    console.log(`+++++++ `, editorInstance);
  };

  onEditorBlur = (e) => {
    const editorInstance = this.editorRef.current;
    console.log('+++++++', editorInstance);
  };

  render() {
    const { height, onBlur, initialValues, ...props } = this.props;

    console.log(this.editorRef);

    return (
      <div
        className="relative pl-6 px-4 prose prose-sm"
        style={{ minHeight: 200, maxHeight: '100%' }}
      >
        <Editor light initialValue="Some initial values" {...props} />
      </div>
    );
  }
}

export default RichEditor;
