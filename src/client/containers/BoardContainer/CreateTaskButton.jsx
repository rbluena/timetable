import PropTypes from 'prop-types';
import { Tooltip, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CreateTaskButton = ({ openNewTaskModal }) => (
  <div className="transition-shadow duration-150 mx-1 border border-dashed border-primary-200 shadow-sm hover:shadow-xl">
    <Tooltip title="Add task">
      <Button
        size="large"
        type="text"
        block
        onClick={() => openNewTaskModal({})}
      >
        <div className="flex justify-center">
          <PlusOutlined />
        </div>
      </Button>
    </Tooltip>
  </div>
);

CreateTaskButton.propTypes = {
  openNewTaskModal: PropTypes.func.isRequired,
};

export default CreateTaskButton;
