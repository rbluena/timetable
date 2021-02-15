import React from 'react';
import PropTypes from 'prop-types';
import { HiShieldCheck } from 'react-icons/hi';

function BadgeShieldIcon({ size, className }) {
  if (size === 'xs') className += ' w-4 h-4';
  if (size === 'sm') className += ' w-6 h-6';
  if (size === 'md') className += ' w-8 h-8';
  if (size === 'lg') className += ' w-12 h-12';

  return <HiShieldCheck className={`${className}`} />;
}

BadgeShieldIcon.defaultProps = {
  size: 'md',
  className: '',
};

BadgeShieldIcon.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
};

export default BadgeShieldIcon;
