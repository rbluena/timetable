import PropTypes from 'prop-types';

const Button = ({ children, variant, className, type, wide, ...props }) => {
  if (type === 'text-button' && variant === 'primary') {
    className += ' text-primary-500';
  }

  if (type === 'text-button' && variant === 'secondary') {
    className += ' text-secondary-500';
  }

  if (wide) {
    className += 'w-full';
  }

  return (
    <button type="button" className={`font-bold ${className}`} {...props}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  variant: '',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.string,
};

export default Button;
