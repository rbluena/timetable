import { Draggable } from 'react-beautiful-dnd';
import { Tag } from 'antd';

const BacklogCard = ({ index, draggableId, task }) => (
  <Draggable draggableId={draggableId} index={index}>
    {(provided) => (
      <div
        className="bg-white p-2 shadow rounded m-1 my-2 relative"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <h2 className=" font-light">{task.text}</h2>

        <div className="flex items-start">
          <Tag color="processing">Kitchen</Tag>
          <div className="ml-auto text-xs font-bold text-neutral-400 block mt-1">
            Mar 21
          </div>
        </div>
      </div>
    )}
  </Draggable>
);

export default BacklogCard;
