import PropTypes from 'prop-types';

const Container = ({ children }) => (
  <div
    className="bg-neutral-50 w-full ml-16 pt-14"
    style={{ minHeight: '100vh' }}
  >
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
