import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  convertToRaw,
  convertFromHTML,
  ContentState,
  EditorState,
} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { stateToHTML } from 'draft-js-export-html';
import draftToHtml from 'draftjs-to-html';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

function htmlToDraft(html) {
  const blocksFromHTML = convertFromHTML(html);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  return EditorState.createWithContent(state);
}

const initialState = `<b>Bold text</b>, <i>Italic text</i><br/ ><br />
  <a href="http://www.facebook.com">Rabii's Link</a><br /><br/ >
  <img src="image.png" height="112" width="200" />`;

const RichEditor = () => {
  const [editorHTML, setEditorHTML] = useState(initialState);
  const editorState = htmlToDraft(editorHTML);

  function onEditorStateChange(state) {
    setEditorHTML(draftToHtml(convertToRaw(state.getCurrentContent())));
  }

  // console.log(editorState.getCurrentContent());

  return (
    <div>
      <Editor
        // toolbarOnFocus
        // toolbarHidden
        editorState={editorState}
        wrapperClassName=""
        editorClassName="border border-primary-200 p-0 m-0"
        className="border border-primary-200"
        onEditorStateChange={onEditorStateChange}
        // onContentStateChange={onChange}
      />
      {/* <textarea
        disabled
        value={draftToHtml(convertToRaw(editorValue.getCurrentContent()))}
      /> */}
    </div>
  );
};

export default RichEditor;
