import React from 'react';
import PropTypes from 'prop-types';
import { FiLinkedin } from 'react-icons/fi';

function LinkedinIcon({ size, className }) {
  if (size === 'xs') className += ' w-4 h-4';
  if (size === 'sm') className += ' w-6 h-6';
  if (size === 'md') className += ' w-8 h-8';
  if (size === 'lg') className += ' w-12 h-12';

  return <FiLinkedin className={`${className}`} />;
}
LinkedinIcon.defaultProps = {
  size: 'md',
  className: '',
};

LinkedinIcon.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
};

export default LinkedinIcon;
