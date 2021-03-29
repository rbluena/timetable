import PropTypes from 'prop-types';

const Container = ({ children }) => (
  <div className="bg-neutral-50 ml-16 w-full" style={{ minHeight: '100vh' }}>
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
