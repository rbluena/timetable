import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineBell } from 'react-icons/hi';

function BellOutlineIcon({ size, className }) {
  if (size === 'xs') className += ' w-4 h-4';
  if (size === 'sm') className += ' w-6 h-6';
  if (size === 'md') className += ' w-8 h-8';
  if (size === 'lg') className += ' w-12 h-12';

  return <HiOutlineBell className={`${className}`} />;
}

BellOutlineIcon.defaultProps = {
  size: 'md',
  className: '',
};

BellOutlineIcon.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
};

export default BellOutlineIcon;
