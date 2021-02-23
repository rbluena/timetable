import PropTypes from 'prop-types';

const Submit = ({
  children,
  variant,
  size,
  className,
  type,
  wide,
  ...props
}) => {
  if (size === 'lg') {
    className += ' py-3 px-4';
  }

  if (size === 'md') {
    className += ' py-1 px-4';
  }

  if (type !== 'text-button' && variant === 'primary') {
    className +=
      ' bg-primary-500 hover:bg-primary-400 text-white rounded-sm shadow-md';
  }

  if (type !== 'text-button' && variant === 'secondary') {
    className +=
      ' bg-secondary-500 hover:bg-secondary-400 text-white rounded-sm shadow-md';
  }

  if (type === 'text-button' && variant === 'primary') {
    className += ' text-primary-500 bg-transparent';
  }

  if (type === 'text-button' && variant === 'secondary') {
    className += ' text-secondary-500 bg-transparent';
  }

  if (wide) {
    className += ' w-full';
  }

  return (
    <button type="submit" className={`font-bold ${className}`} {...props}>
      {children}
    </button>
  );
};

Submit.defaultProps = {
  className: '',
  variant: '',
  size: 'md',
  type: '',
  wide: false,
};

Submit.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  wide: PropTypes.bool,
};

export default Submit;
