import PropTypes from 'prop-types';

const LayoutManager = ({ children }) => <div>{children}</div>;

LayoutManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutManager;
