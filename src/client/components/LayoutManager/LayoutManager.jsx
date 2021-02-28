import PropTypes from 'prop-types';
import { LeftSidebarContainer } from '@app/containers';
import { Container } from '@app/components';
import { TaskDetailsDrawer } from '@app/containers/drawers';
import 'antd/dist/antd.css';

const LayoutManager = ({ children }) => (
  <>
    <div className="flex">
      <LeftSidebarContainer />
      <Container>{children}</Container>
    </div>

    <TaskDetailsDrawer />
  </>
);

LayoutManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutManager;
