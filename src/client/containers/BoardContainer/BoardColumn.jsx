import { useState } from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { Typography, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TaskCard from './TaskCard';

const { Title } = Typography;

const BoardColumn = ({
  tasks,
  columnIndex,
  column,
  categories,
  userAssignees,
  groupAssignees,
  updateColumn,
  deleteColumn,
}) => {
  const [editingColumn, setEditingColumn] = useState(false);
  const { name, tasks: taskIds } = column;
  const isEditingColumn = !name || name.length === 0 || editingColumn;

  function changeColumnTitle(value) {
    if (!value.length) return;

    updateColumn(column._id, { name: value });
    setEditingColumn(false);
  }

  function deleteBoardColumn() {
    deleteColumn(column._id);
  }

  return (
    <div
      className="bg-neutral-50 p-1 mx-1 shadow-sm border border-neutral-100 rounded-sm overflow-hidden"
      style={{
        minWidth: '300px',
        width: '300px',
        height: 'calc(100vh - 92px)',
      }}
    >
      {/* start: column header  */}
      <div className="">
        <div className="flex items-start p-2">
          <Title
            level={5}
            type="secondary"
            editable={{
              editing: isEditingColumn,
              onChange: changeColumnTitle,
              onStart: () => setEditingColumn(true),
            }}
          >
            {isEditingColumn ? (
              name
            ) : (
              <span className="uppercase font-normal text-base">{name}</span>
            )}
          </Title>
          <Button type="text" size="small" danger onClick={deleteBoardColumn}>
            {/* <EllipsisOutlined /> */}
            <DeleteOutlined />
          </Button>
          <div className="ml-auto font-bold italic text-neutral-500">
            {taskIds.length}
          </div>
        </div>
      </div>
      {/* end: column header  */}

      {/* start: Droppable section */}
      <Droppable key={columnIndex} droppableId={column._id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="overflow-y-auto h-full"
          >
            {/* start: rendering tasks */}
            {taskIds &&
              taskIds.length > 0 &&
              taskIds.map((taskId, index) => {
                const task = tasks[taskId];

                return (
                  <TaskCard
                    key={taskId}
                    index={index}
                    draggableId={`${taskId}`}
                    task={task}
                    categories={categories}
                    userAssignees={userAssignees}
                    groupAssignees={groupAssignees}
                  />
                );
              })}
            {provided.placeholder}
            {/* end: rendering tasks */}
          </div>
        )}
      </Droppable>
      {/* end: Droppable section */}
    </div>
  );
};

BoardColumn.defaultProps = {
  tasks: {},
  categories: {},
  userAssignees: {},
  groupAssignees: {},
};

BoardColumn.propTypes = {
  columnIndex: PropTypes.string.isRequired,
  column: PropTypes.objectOf(PropTypes.any).isRequired,
  updateColumn: PropTypes.func.isRequired,
  deleteColumn: PropTypes.func.isRequired,
  openNewTaskModal: PropTypes.func.isRequired,
  backlogIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  tasks: PropTypes.objectOf(PropTypes.any),
  categories: PropTypes.objectOf(PropTypes.any),
  userAssignees: PropTypes.objectOf(PropTypes.any),
  groupAssignees: PropTypes.objectOf(PropTypes.any),
};
export default BoardColumn;
