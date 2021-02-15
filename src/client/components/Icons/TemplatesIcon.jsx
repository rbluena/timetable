import React from 'react';
import PropTypes from 'prop-types';
import { FiTrello } from 'react-icons/fi';

function TemplatesIcon({ size }) {
  let classNames = '';

  if (size === 'sm') classNames = 'w-6 h-6';
  if (size == 'md') classNames = 'w-8 h-8';
  if (size === 'lg') classNames = 'w-12 h-12';

  return <FiTrello className={`${classNames} text-black`} />;
}

TemplatesIcon.defaultProps = {
  size: 'md',
};

TemplatesIcon.propTypes = {
  size: PropTypes.string,
};

export default TemplatesIcon;
