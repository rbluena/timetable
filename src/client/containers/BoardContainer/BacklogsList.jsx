import PropTypes from 'prop-types'
import { Button, Tooltip } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import { PlusIcon } from '@app/components/Icons';
import BacklogCard from './BacklogCard';

const BacklogsList = ({ openNewTaskModal, backlog, backlogIds, categories, userAssignees, groupAssignees }) => (
  <div className="h-screen overflow-y-auto p-2">
    <div className="mx-2 bg-neutral-50">
      <h2 className="ml-2 text-lg">Backlog</h2>
    </div>

    {/* start: Button to add a new task */}
    <div className="transition-shadow duration-150 border border-dashed border-primary-200 hover:shadow-xl">
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
    <Droppable droppableId="50">
      {(provided) => (
        <div className="" {...provided.droppableProps} ref={provided.innerRef}>
          {backlogIds && backlogIds.length &&
            backlogIds.map((taskId, index) => {
              const task = backlog[taskId];

              return (
                <BacklogCard
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
)


BacklogsList.defaultProps = {
  backlog: {},
  categories: {},
  userAssignees: {},
  groupAssignees: {}
}


BacklogsList.propTypes  ={
  openNewTaskModal: PropTypes.func.isRequired,
  backlog: PropTypes.objectOf(PropTypes.any),
  backlogIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.objectOf(PropTypes.any),
  userAssignees: PropTypes.objectOf(PropTypes.any),
  groupAssignees: PropTypes.objectOf(PropTypes.any)
}


export default BacklogsList;
