/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('rich-markdown-editor').then((mod) => mod),
  {
    ssr: false,
  }
);

import editorCss from './Editor.module.css';

class RichEditor extends React.Component {
  onChange = (callback) => {
    const { onContentChange } = this.props;
    const content = callback();
    onContentChange(content);
  };

  render() {
    const { readOnly, ...props } = this.props;

    return (
      <div
        className="relative prose prose-sm font-normal leading-5"
        style={{ maxHeight: '100%' }}
      >
        <Editor
          className={`border-b border-primary-100 list-disc list-decimal ${editorCss.hNxLRE}`}
          onChange={this.onChange}
          readOnly={readOnly}
          {...props}
        />
      </div>
    );
  }
}

export default RichEditor;
