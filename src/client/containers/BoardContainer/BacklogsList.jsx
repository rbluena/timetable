import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import { PlusIcon } from '@app/components/Icons';
import TaskCard from './TaskCard';

const BacklogsList = ({
  tasks,
  backlogIds,
  categories,
  userAssignees,
  groupAssignees,
}) => (
  <div className="overflow-y-auto" style={{ height: 'calc(100vh - 60px)' }}>
    {/* start: Button to add a new task */}

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
