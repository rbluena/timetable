import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const BacklogsList = ({ backlog, categories, openTaskDrawer }) => (
  <div className="overflow-y-auto" style={{ height: 'calc(100vh - 60px)' }}>
    {/* start: Backlog list */}
    <Droppable droppableId="backlog">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
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
};

BacklogsList.propTypes = {
  backlog: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.objectOf(PropTypes.any),
};

export default BacklogsList;
