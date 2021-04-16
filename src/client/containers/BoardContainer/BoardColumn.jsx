import { useState } from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { Typography, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TaskCard from './TaskCard';

const { Title } = Typography;

const BoardColumn = ({
  isUserOwner,
  columnData,
  openTaskDrawer,
  columnIndex,
  categories,
  updateColumn,
  deleteColumn,
}) => {
  const [editingColumn, setEditingColumn] = useState(false);
  const { name, tasks } = columnData;
  const isEditingColumn = !name || name.length === 0 || editingColumn;

  function changeColumnTitle(value) {
    if (!value.length) return;

    updateColumn(columnData._id, { name: value });
    setEditingColumn(false);
  }

  function deleteBoardColumn() {
    deleteColumn(columnData._id);
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
            editable={
              isUserOwner
                ? {
                    editing: isEditingColumn,
                    onChange: changeColumnTitle,
                    onStart: () => setEditingColumn(true),
                  }
                : false
            }
          >
            {isEditingColumn && isUserOwner ? (
              name
            ) : (
              <span className="uppercase font-normal text-base">{name}</span>
            )}
          </Title>

          {/* start: Button to delete column */}
          {isUserOwner && (
            <Button type="text" size="small" danger onClick={deleteBoardColumn}>
              {/* <EllipsisOutlined /> */}
              <DeleteOutlined />
            </Button>
          )}
          {/* end: Button to delete column */}
          <div className="ml-auto font-bold italic text-neutral-500">
            {tasks.length}
          </div>
        </div>
      </div>
      {/* end: column header  */}

      {/* start: Droppable section */}
      <Droppable key={columnIndex} droppableId={columnData._id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="overflow-y-auto h-full"
          >
            {/* start: rendering tasks */}
            {tasks &&
              tasks.length > 0 &&
              tasks.map((task, index) => (
                <TaskCard
                  key={task._id}
                  index={index}
                  openTaskDrawer={openTaskDrawer}
                  draggableId={task._id}
                  task={task}
                  categories={categories}
                />
              ))}
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
  columnData: {},
  categories: {},
  isUserOwner: false
};

BoardColumn.propTypes = {
  isUserOwner: PropTypes.bool,
  columnIndex: PropTypes.string.isRequired,
  categories: PropTypes.objectOf(PropTypes.any),
  columnData: PropTypes.objectOf(PropTypes.any),
  updateColumn: PropTypes.func.isRequired,
  deleteColumn: PropTypes.func.isRequired,
  openTaskDrawer: PropTypes.func.isRequired,
};
export default BoardColumn;
