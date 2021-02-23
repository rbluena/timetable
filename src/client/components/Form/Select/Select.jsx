import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  name,
  options,
  children,
  label,
  register,
  error,
  ...rest
}) => (
  <div className="max-w-sm">
    {label && label.length && (
      <label htmlFor={name} className="text-sm text-primary-700 font-semibold">
        {label}
      </label>
    )}
    <select
      id={name}
      name={name}
      ref={register}
      className={` bg-neutral-50 border-b-2 pl-0  outline-none border-primary-300 focus:border-primary-600 focus:outline-none rounded w-full text-sm leading-tight p-2`}
      {...rest}
    >
      {children}
    </select>
    {error && error.length && (
      <span className="text-danger-500 text-xs">{error}</span>
    )}
  </div>
);

Select.defaultProps = {
  error: '',
  label: '',
  options: [],
  register: undefined,
};

Select.propTypes = {
  /** Name of a select control. */
  name: PropTypes.string.isRequired,

  /** Label to show for a select control. */
  label: PropTypes.string,

  /** Error to show if is available. */
  error: PropTypes.string,

  /** Children nodes */
  children: PropTypes.node.isRequired,

  /** react-form-hook reference */
  register: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

  /** List of options in key-value pair of label and value. */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};

export default Select;
