import React from 'react';
import PropTypes from 'prop-types';
import { FiChevronRight } from 'react-icons/fi';

function ChevronRightIcon({ size, className }) {
  if (size === 'xs') className += ' w-4 h-4';
  if (size === 'sm') className += ' w-6 h-6';
  if (size === 'md') className += ' w-8 h-8';
  if (size === 'lg') className += ' w-12 h-12';

  return <FiChevronRight className={`text-gray-600 text-light ${className}`} />;
}

ChevronRightIcon.defaultProps = {
  size: 'md',
  className: undefined,
};

ChevronRightIcon.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
};

export default ChevronRightIcon;
