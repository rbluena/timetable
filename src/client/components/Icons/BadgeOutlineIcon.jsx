import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineBadgeCheck } from 'react-icons/hi';

function BadgeOutlineIcon({ size, className }) {
  if (size === 'xs') className += ' w-4 h-4';
  if (size === 'sm') className += ' w-6 h-6';
  if (size === 'md') className += ' w-8 h-8';
  if (size === 'lg') className += ' w-12 h-12';

  return <HiOutlineBadgeCheck className={`${className}`} />;
}

BadgeOutlineIcon.defaultProps = {
  size: 'md',
  className: '',
};

BadgeOutlineIcon.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
};

export default BadgeOutlineIcon;
