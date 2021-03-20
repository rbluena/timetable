import { Droppable } from 'react-beautiful-dnd';
import BacklogCard from './BacklogCard';

const BacklogsList = ({ backlog }) => (
  <div className="h-screen overflow-y-auto p-2">
    <div className="mx-2 bg-neutral-50">
      <h2 className="ml-2 text-lg">Backlog</h2>
    </div>
    <Droppable droppableId="50">
      {(provided) => (
        <div className="" {...provided.droppableProps} ref={provided.innerRef}>
          {backlog &&
            backlog.result.map((taskId, index) => {
              const task = backlog.tasks[taskId];

              return (
                <BacklogCard
                  index={index}
                  draggableId={`${taskId}`}
                  task={task}
                />
              );
            })}
        </div>
      )}
    </Droppable>
  </div>
);
export default BacklogsList;
