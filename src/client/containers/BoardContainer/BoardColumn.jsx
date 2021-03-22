import { Droppable } from 'react-beautiful-dnd';
import { Typography } from 'antd';
import TaskCard from './TaskCard';

const { Title } = Typography;

const BoardColumn = ({ columnIndex, columnTitle, tasks }) => (
  <Droppable key={columnIndex} droppableId={columnIndex.toString()}>
    {(provided) => (
      <div
        className="bg-neutral-100 p-1 mx-3 shadow-sm border border-neutral-200 rounded-sm overflow-y-auto"
        style={{ minWidth: '280px', height: 'calc(100vh - 92px)' }}
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
        {/* start: column header  */}
        <div className="flex items-start">
          <Title level={5} type="secondary" editable>
            {columnTitle}
          </Title>
          <div className="ml-auto font-bold italic text-neutral-400">
            {tasks.length}
          </div>
          {/* end: column header  */}
        </div>

        {/* start: rendering tasks */}
        <div>
          {tasks &&
            tasks.length > 0 &&
            tasks.map((item, index) => (
              <TaskCard index={index} draggableId={`${item._id}`} task={item} />
            ))}
        </div>
        {/* end: rendering tasks */}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default BoardColumn;
