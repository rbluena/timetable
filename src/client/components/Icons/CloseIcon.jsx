import React from 'react';
import PropTypes from 'prop-types';
import { HiX } from 'react-icons/hi';

function CloseIcon({ size, className }) {
  if (size === 'xs') className += ' w-4 h-4';
  if (size === 'sm') className += ' w-6 h-6';
  if (size === 'md') className += ' w-8 h-8';
  if (size === 'lg') className += ' w-12 h-12';

  return <HiX className={`${className}`} />;
}

CloseIcon.defaultProps = {
  size: 'md',
  className: '',
};

CloseIcon.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
};

export default CloseIcon;
