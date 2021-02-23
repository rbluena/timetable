import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({
  isOpen,
  changeDropdownVisibility,
  onValueChanged,
  alignCenter,
  options,
  ...props
}) => {
  useEffect(() => {
    /**
     * Close dropdown when document click.
     */
    function toggleDropdownOff() {
      if (isOpen) {
        changeDropdownVisibility(false);
      }
    }

    document.addEventListener('click', toggleDropdownOff);
    return () => {
      if (isOpen) {
        document.removeEventListener('click', toggleDropdownOff);
      }
    };
  }, [isOpen, changeDropdownVisibility]);

  return (
    <ul
      className={`absolute mt-6 w-48 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-neutral-100 ${
        isOpen ? '' : 'hidden'
      }`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
      style={{ zIndex: 10000 }}
      {...props}
    >
      {options.map((item, idx) => {
        if (Array.isArray(item)) {
          const key = `item_${idx}`;

          return (
            <div className="py-1" key={key}>
              {item.map((list) => (
                <button
                  key={list.value}
                  type="button"
                  className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                  role="menuitem"
                  onClick={() => {
                    onValueChanged(list.value);
                    changeDropdownVisibility(false);
                  }}
                >
                  {list.label}
                </button>
              ))}
            </div>
          );
        }

        return (
          <button
            key={item.value}
            type="button"
            className=" w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
            role="menuitem"
            onClick={() => {
              onValueChanged(item.value);
              changeDropdownVisibility(false);
            }}
          >
            {item.label}
          </button>
        );
      })}
    </ul>
  );
};

Dropdown.defaultProps = {
  isOpen: false,
  alignCenter: false,
};

Dropdown.propTypes = {
  /** Boolean state to tell a dropdown to hide or show. */
  isOpen: PropTypes.bool,

  /** A function to lift a value to higher component. */
  onValueChanged: PropTypes.func.isRequired,

  /** Function to toggle the visibility of the dropdown. */
  changeDropdownVisibility: PropTypes.func.isRequired,

  alignCenter: PropTypes.bool,

  /** List of options in key-value pair of label and value. */
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Dropdown;
