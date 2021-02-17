import PropTypes from 'prop-types';
import { LeftSidebarContainer } from '@app/containers';
import { Container } from '@app/components';

const LayoutManager = ({ children }) => (
  <div className="flex">
    <LeftSidebarContainer />
    <Container>{children}</Container>
  </div>
);

LayoutManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutManager;
