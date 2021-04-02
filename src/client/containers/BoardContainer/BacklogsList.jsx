import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import { PlusIcon } from '@app/components/Icons';
import TaskCard from './TaskCard';

const BacklogsList = ({
  openNewTaskModal,
  tasks,
  backlogIds,
  categories,
  userAssignees,
  groupAssignees,
}) => (
  <div className="overflow-y-auto" style={{ height: 'calc(100vh - 60px)' }}>
    {/* start: Button to add a new task */}
    <div className="transition-shadow duration-150 mx-1 border border-dashed border-primary-200 hover:shadow-xl">
      <Tooltip title="Add task">
        <Button
          size="large"
          type="text"
          block
          onClick={() => openNewTaskModal({})}
        >
          <div className="flex justify-center">
            <PlusIcon />
          </div>
        </Button>
      </Tooltip>
    </div>
    {/* end: Button to add a new task */}

    {/* start: Backlog list */}
    <Droppable droppableId="backlog">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {backlogIds &&
            backlogIds.length > 0 &&
            backlogIds.map((taskId, index) => {
              const task = tasks[taskId];

              return (
                <TaskCard
                  key={taskId}
                  index={index}
                  draggableId={taskId}
                  task={task}
                  categories={categories}
                  groupAssignees={groupAssignees}
                  userAssignees={userAssignees}
                />
              );
            })}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
    {/* end: Backlog list */}
  </div>
);

BacklogsList.defaultProps = {
  tasks: {},
  categories: {},
  userAssignees: {},
  groupAssignees: {},
};

BacklogsList.propTypes = {
  openNewTaskModal: PropTypes.func.isRequired,
  tasks: PropTypes.objectOf(PropTypes.any),
  backlogIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.objectOf(PropTypes.any),
  userAssignees: PropTypes.objectOf(PropTypes.any),
  groupAssignees: PropTypes.objectOf(PropTypes.any),
};

export default BacklogsList;
