import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const BacklogsList = ({
  canUserUpdateTask,
  backlog,
  categories,
  openTaskDrawer,
}) => (
  <div className="overflow-y-auto" style={{ height: 'calc(100vh - 90px)' }}>
    {/* start: Backlog list */}
    <Droppable droppableId="backlog">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ minHeight: '150px' }}
        >
          {backlog &&
            backlog.length > 0 &&
            backlog.map((task, index) => (
              <TaskCard
                key={task._id}
                index={index}
                draggableId={task._id}
                task={task}
                categories={categories}
                openTaskDrawer={openTaskDrawer}
                canUserUpdateTask={canUserUpdateTask}
              />
            ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
    {/* end: Backlog list */}
  </div>
);

BacklogsList.defaultProps = {
  categories: {},
  canUserUpdateTask: false,
};

BacklogsList.propTypes = {
  backlog: PropTypes.arrayOf(PropTypes.string).isRequired,
  canUserUpdateTask: PropTypes.bool,
  categories: PropTypes.objectOf(PropTypes.any),
  openTaskDrawer: PropTypes.func.isRequired,
};

export default BacklogsList;
