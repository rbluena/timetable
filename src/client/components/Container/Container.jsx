import PropTypes from 'prop-types';

const Container = ({ children }) => (
  <div
    className="bg-neutral-50 w-full ml-16 overflow-hidden"
    style={{ minHeight: '600px' }}
  >
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
