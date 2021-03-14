import PropTypes from 'prop-types';
import {
  LeftSidebarContainer,
  TaskDrawerContainer,
  AlertNotificationsContainer,
} from '@app/containers';
import { Container } from '@app/components';
import 'antd/dist/antd.css';

const LayoutManager = ({ children, showSidebar }) => {
  if (showSidebar) {
    return (
      <>
        <AlertNotificationsContainer />
        <div className="flex">
          <LeftSidebarContainer />
          <Container>{children}</Container>
        </div>

        <TaskDrawerContainer />
      </>
    );
  }

  return (
    <>
      <AlertNotificationsContainer />
      <div className="bg-neutral-50 min-h-screen">{children}</div>{' '}
    </>
  );
};

LayoutManager.defaultProps = {
  showSidebar: false,
};

LayoutManager.propTypes = {
  children: PropTypes.node.isRequired,
  showSidebar: PropTypes.bool,
};

export default LayoutManager;
