import { Draggable } from 'react-beautiful-dnd';
import { Tag, Avatar, Tooltip } from 'antd';

const TaskCard = ({ index, draggableId, task }) => (
  <Draggable draggableId={draggableId} index={index}>
    {(provided, snapshot) => (
      <div
        className="bg-white p-2 shadow-sm rounded m-1 my-2 relative"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <p className="text-sm font-secondary">{task.text}</p>
        <Avatar.Group size="small">
          <Tooltip title="Rabii Luena" placement="top">
            <Avatar src="" style={{ backgroundColor: '#f56a00' }}>
              A
            </Avatar>
          </Tooltip>
        </Avatar.Group>

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

export default TaskCard;
