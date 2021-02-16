import PropTypes from 'prop-types';

const ToggleSwitch = ({ options, value, onChange }) => (
  <div className="flex">
    {options.map((item) => (
      <div className="text-lg bg-primary-100 shadow-inner p-1">
        <label
          htmlFor={item.label}
          className={`cursor-pointer py-1 px-4 ${
            value === item.value
              ? 'shadow-sm bg-white rounded-sm text-primary-500'
              : ''
          }`}
        >
          {item.label}
        </label>
        <input
          id={item.label}
          type="radio"
          checked={value === item.value}
          value={item.value}
          className="hidden"
          onChange={onChange}
        />
      </div>
    ))}
    <div />
  </div>
);

ToggleSwitch.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ToggleSwitch;
