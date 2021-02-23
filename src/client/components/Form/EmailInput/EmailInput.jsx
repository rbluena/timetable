import React from 'react';
import PropTypes from 'prop-types';

const EmailInput = ({ name, register, label, error, ...rest }) => (
  <div className="max-w-sm">
    {label.length > 0 && (
      <label htmlFor={name} className="text-sm text-primary-700 font-semibold">
        {label}
      </label>
    )}
    <input
      id={name}
      name={name}
      type="email"
      className="bg-neutral-50 border-b-2 focus:outline-none focus:border-primary-600  border-primary-300 rounded w-full py-2 text-neutral-700 text-sm leading-tight"
      ref={register}
      {...rest}
    />
    {error.length > 0 && (
      <span className="text-danger-500 text-xs">{error}</span>
    )}
  </div>
);

EmailInput.defaultProps = {
  error: '',
  label: '',
  register: undefined,
};

EmailInput.propTypes = {
  /** Name of an input. */
  name: PropTypes.string.isRequired,

  /** Label to show for an input. */
  label: PropTypes.string,

  /** Showing error if triggered. */
  error: PropTypes.string,

  /** react-form-hook reference */
  register: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default EmailInput;
