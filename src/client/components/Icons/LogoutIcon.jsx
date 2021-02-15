import React from 'react';
import PropTypes from 'prop-types';
import { FiLogOut } from 'react-icons/fi';

function LogoutIcon({ size }) {
  let classNames = '';

  if (size === 'sm') classNames = 'w-6 h-6';
  if (size === 'md') classNames = 'w-8 h-8';
  if (size === 'lg') classNames = 'w-12 h-12';

  return <FiLogOut className={`${classNames} text-gray-600`} />;
}

LogoutIcon.defaultProps = {
  size: 'md',
};

LogoutIcon.propTypes = {
  size: PropTypes.string,
};

export default LogoutIcon;
