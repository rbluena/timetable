import React from 'react';
import PropTypes from 'prop-types';
import { HiCog } from 'react-icons/hi';

function CogIcon({ size, className, variant }) {
  if (size === 'xs') className += ' w-4 h-4';
  if (size === 'sm') className += ' w-6 h-6';
  if (size === 'md') className += ' w-8 h-8';
  if (size === 'lg') className += ' w-12 h-12';

  if (variant === 'primary') {
    className += ' text-primary-800';
  }

  if (variant === 'secondary') {
    className += ' text-secondary-400';
  }

  if (variant === 'neutral') {
    className += ' text-neutral-400';
  }

  return <HiCog className={`${className}`} />;
}

CogIcon.defaultProps = {
  size: 'md',
  className: '',
  variant: '',
};

CogIcon.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
};

export default CogIcon;
