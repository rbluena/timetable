import PropTypes from 'prop-types';

const Canvas = ({ children }) => <div>{children}</div>;

Canvas.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Canvas;
