import PropTypes from 'prop-types';

const Text = ({ type, text, variant, className = '' }) => {
  if (variant === 'primary') {
    className += ' text-primary-700';
  }

  if (variant === 'secondary') {
    className += ' text-secondary-700';
  }

  if (variant === 'neutral') {
    className += ' text-neutral-500';
  }

  if (type === 'title') {
    return <h1 className={`text-4xl ${className}`}>{text}</h1>;
  }

  if (type === 'heading') {
    return <h2 className={`text-2xl ${className}`}>{text}</h2>;
  }

  if (type === 'subheading') {
    return <h2 className={`text-xl ${className}`}>{text}</h2>;
  }

  if (type === 'large') {
    <p className={`text-lg ${className}`}>{text}</p>;
  }

  return <p className={`${className}`}>{text}</p>;
};

Text.defaultProps = {
  className: '',
  variant: 'neutral',
  type: '',
};

Text.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  variant: PropTypes.string,
};

export default Text;
