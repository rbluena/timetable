import PropTypes from 'prop-types';
import { LeftSidebarContainer, TaskDrawerContainer } from '@app/containers';
import { Container } from '@app/components';
import 'antd/dist/antd.css';

const LayoutManager = ({ children, authenticated }) => {
  if (authenticated) {
    return (
      <>
        <div className="flex">
          <LeftSidebarContainer />
          <Container>{children}</Container>
        </div>

        <TaskDrawerContainer />
      </>
    );
  }

  return <div>{children}</div>;
};

LayoutManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutManager;
