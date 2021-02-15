import React from 'react';
import PropTypes from 'prop-types';
import { HiClipboardList } from 'react-icons/hi';

function ClipboardListIcon({ size, className, color }) {
  if (size === 'xs') className += ' w-4 h-4';
  if (size === 'sm') className += ' w-6 h-6';
  if (size === 'md') className += ' w-8 h-8';
  if (size === 'lg') className += ' w-12 h-12';

  return <HiClipboardList className={`${className} `} style={{ color }} />;
}

ClipboardListIcon.defaultProps = {
  size: 'md',
  color: '',
  className: '',
};

ClipboardListIcon.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default ClipboardListIcon;
