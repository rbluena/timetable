import { Button, Tooltip } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import { PlusIcon } from '@app/components/Icons';
import BacklogCard from './BacklogCard';

const BacklogsList = ({ backlog }) => (
  <div className="h-screen overflow-y-auto p-2">
    <div className="mx-2 bg-neutral-50">
      <h2 className="ml-2 text-lg">Backlog</h2>
    </div>
    {/* start: Backlog list */}
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
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    {/* end: Backlog list */}

    {/* start: Button to add a new task */}
    <div className="transition-shadow duration-150 border border-dashed border-primary-200 hover:shadow-xl">
      <Tooltip title="Add task">
        <Button size="large" type="text" block>
          <div className="flex justify-center">
            <PlusIcon />
          </div>
        </Button>
      </Tooltip>
    </div>
    {/* end: Button to add a new task */}
  </div>
);
export default BacklogsList;
