import React from 'react';
import PropTypes from 'prop-types';
import { HiPencilAlt } from 'react-icons/hi';

function Pencil({ size, className }) {
  if (size === 'xs') className += ' w-4 h-4';
  if (size === 'sm') className += ' w-6 h-6';
  if (size === 'md') className += ' w-8 h-8';
  if (size === 'lg') className += ' w-12 h-12';

  return <HiPencilAlt className={`${className}`} />;
}

Pencil.defaultProps = {
  size: 'md',
  className: '',
};

Pencil.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
};

export default Pencil;
