import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ size, className, src, alt, square, initials }) => {
  if (size === 'sm') {
    className += ' h-6 w-6';
  }

  if (size === 'md') {
    className += ' h-8 w-8';
  }

  if (size === 'lg') {
    className += ' h-10 w-10';
  }

  if (size === 'xl') {
    className += ' h-14 w-14';
  }

  if (size === '2xl') {
    className += ' h-28 w-28';
  }

  if (!src || src.length === 0) {
    return (
      <div
        className={`border-2 border-white  text-neutral-800 ${className} ${
          square ? 'rounded' : 'rounded-full'
        } `}
      >
        <div
          className={`bg-primary-200 w-full h-full flex justify-center items-center font-semibold ${
            square ? 'rounded' : 'rounded-full'
          }`}
        >
          {initials}
        </div>
      </div>
    );
  }

  return (
    <img
      className={`border-2 border-white ${className} ${
        square ? 'rounded' : 'rounded-full'
      }`}
      src={src}
      alt={alt}
    />
  );
};

Avatar.defaultProps = {
  size: 'md',
  className: '',
  initials: '',
  src: '',
  square: false,
};

Avatar.propTypes = {
  /** Size of an avatar. */
  size: PropTypes.string,

  /** Class names to be used. */
  className: PropTypes.string,

  /** Altenative text. */
  alt: PropTypes.string.isRequired,

  /** Source of the image */
  src: PropTypes.string,

  /** Initials that can be used if no avatar created. */
  initials: PropTypes.string,

  square: PropTypes.bool,
};

export default Avatar;
