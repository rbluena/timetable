import { useState } from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { Typography, Button, Dropdown, Menu } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  UserOutlined,
} from '@ant-design/icons';
import TaskCard from './TaskCard';

const { Title } = Typography;

const BoardColumn = ({
  canUserUpdateTask,
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

  const menu = (
    <Menu onClick={() => {}}>
      <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() => setEditingColumn(true)}
      >
        Rename
      </Menu.Item>
      <Menu.Item
        key="delete_1"
        icon={<DeleteOutlined />}
        onClick={() => deleteBoardColumn()}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

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
        <div className="flex items-start  p-1">
          <Title
            level={5}
            type="secondary"
            onClick={() => {
              if (isUserOwner) {
                setEditingColumn(true);
              }
            }}
            editable={
              isUserOwner && isEditingColumn
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
              <span className=" font-semibold text-sm inline-block">
                {name}
              </span>
            )}
          </Title>

          <div className="ml-auto">
            {/* {tasks.length} */}
            {/* start: Button to delete column */}
            {/* <EllipsisOutlined /> */}
            {isUserOwner && (
              <Dropdown.Button
                type="text"
                overlay={menu}
                trigger={['click']}
                icon={<MoreOutlined />}
              >
                {/* <Button
                  type="text"
                  size="small"
                  danger
                  onClick={deleteBoardColumn}
                >
                  <DeleteOutlined />
                </Button> */}
              </Dropdown.Button>
            )}
            {/* end: Button to delete column */}
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
                  canUserUpdateTask={canUserUpdateTask}
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
  canUserUpdateTask: false,
  columnData: {},
  categories: {},
  isUserOwner: false,
};

BoardColumn.propTypes = {
  canUserUpdateTask: PropTypes.bool,
  isUserOwner: PropTypes.bool,
  columnIndex: PropTypes.string.isRequired,
  categories: PropTypes.objectOf(PropTypes.any),
  columnData: PropTypes.objectOf(PropTypes.any),
  updateColumn: PropTypes.func.isRequired,
  deleteColumn: PropTypes.func.isRequired,
  openTaskDrawer: PropTypes.func.isRequired,
};
export default BoardColumn;
