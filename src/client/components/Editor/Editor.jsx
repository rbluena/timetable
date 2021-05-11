/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('rich-markdown-editor').then((mod) => mod),
  {
    ssr: false,
  }
);

class RichEditor extends React.Component {
  onChange = (callback) => {
    const { onContentChange } = this.props;
    const content = callback();
    onContentChange(content);
  };

  render() {
    const { ...props } = this.props;

    return (
      <div
        className="relative prose prose-sm font-normal leading-5"
        style={{ minHeight: 200, maxHeight: '100%' }}
      >
        <Editor
          className="prose prose-sm font-normal leading-5"
          onChange={this.onChange}
          {...props}
        />
      </div>
    );
  }
}

export default RichEditor;
