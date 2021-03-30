import { useState } from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { Typography, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
// import TaskCard from './TaskCard';
const { Title } = Typography;

const BoardColumn = ({ columnIndex, column, updateColumn, deleteColumn }) => {
  const [editingColumn, setEditingColumn] = useState(false);
  const { name, tasks } = column;
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
    <Droppable key={columnIndex} droppableId={column._id}>
      {(provided) => (
        <div
          className=""
          style={{ minWidth: '280px', height: 'calc(100vh - 92px)' }}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className="bg-neutral-50 p-1 h-full mx-1 shadow-sm border border-neutral-100 rounded-sm overflow-y-auto">
            {/* start: column header  */}
            <div className="flex items-start">
              <Title
                level={5}
                type="secondary"
                editable={{
                  editing: isEditingColumn,
                  onChange: changeColumnTitle,
                  onStart: () => setEditingColumn(true),
                }}
              >
                <span className="uppercase font-medium text-base">{name}</span>
              </Title>
              <Button
                type="text"
                size="small"
                danger
                onClick={deleteBoardColumn}
              >
                {/* <EllipsisOutlined /> */}
                <DeleteOutlined />
              </Button>
              <div className="ml-auto font-bold italic text-neutral-500">
                {tasks.length}
              </div>
            </div>
            {/* end: column header  */}
          </div>

          {/* start: rendering tasks */}
          {/* <div>
            {tasks &&
              tasks.length > 0 &&
              tasks.map((item, index) => (
                <TaskCard
                  index={index}
                  draggableId={`${item._id}`}
                  task={item}
                />
              ))}
          </div> */}
          {/* end: rendering tasks */}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

BoardColumn.propTypes = {
  columnIndex: PropTypes.string.isRequired,
  column: PropTypes.objectOf(PropTypes.any).isRequired,
  updateColumn: PropTypes.func.isRequired,
  deleteColumn: PropTypes.func.isRequired,
};
export default BoardColumn;
