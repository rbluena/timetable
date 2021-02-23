import PropTypes from 'prop-types';
import { Component } from 'react';
import 'react-quill/dist/quill.snow.css';

class FormHtmlEditor extends Component {
  constructor(props) {
    super(props);
    if (document) {
      // eslint-disable-next-line global-require
      this.quill = require('react-quill');
    }
  }

  render() {
    const Quill = this.quill;
    const { onChange, value } = this.props;

    if (Quill) {
      return <Quill onChange={onChange} theme="snow" value={value} />;
    }
    return null;
  }
}

FormHtmlEditor.propTypes = {};

export default FormHtmlEditor;
