import PropTypes from 'prop-types';

const ContentContainer = ({ children }) => <div>{children}</div>;

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentContainer;
