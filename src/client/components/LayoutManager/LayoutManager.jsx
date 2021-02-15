import PropTypes from 'prop-types';
import { LeftSidebarContainer } from '@app/containers';

const LayoutManager = ({ children }) => (
  <div className="flex">
    <LeftSidebarContainer />
    {children}
  </div>
);

LayoutManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutManager;
