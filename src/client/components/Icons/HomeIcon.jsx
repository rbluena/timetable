import React from 'react';
import PropTypes from 'prop-types';
import { FiHome } from 'react-icons/fi';

function HomeIcon({ size }) {
  let classNames = '';

  if (size === 'sm') classNames = 'w-6 h-6';
  if (size === 'md') classNames = 'w-8 h-8';
  if (size === 'lg') classNames = 'w-12 h-12';

  return <FiHome className={`${classNames} text-black`} />;
}

HomeIcon.defaultProps = {
  size: 'md',
};

HomeIcon.propTypes = {
  size: PropTypes.string,
};

export default HomeIcon;
