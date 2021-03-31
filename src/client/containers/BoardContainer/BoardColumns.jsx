import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import BoardColumn from './BoardColumn';

const BoardColumns = ({
  board,
  tasks,
  categories,
  userAssignees,
  groupAssignees,
  createNewColumn,
  updateColumn,
  deleteColumn,
}) => {
  const { columnIds, columns } = board;

  return (
    <div className="p-4 overflow-x-auto flex pr-4 h-full">
      {columnIds &&
        columnIds.length > 0 &&
        columnIds.map((columnId, index) => {
          const column = columns[columnId];

          return (
            <BoardColumn
              column={column}
              tasks={tasks}
              columnIndex={index}
              categories={categories}
              userAssignees={userAssignees}
              groupAssignees={groupAssignees}
              updateColumn={updateColumn}
              deleteColumn={deleteColumn}
            />
          );
        })}

      <div className="mx-1 bg-neutral-50 h-10">
        <Tooltip title="Add column">
          <Button
            size="large"
            type="text"
            icon={<PlusOutlined size="large" />}
            onClick={createNewColumn}
          />
        </Tooltip>
      </div>
    </div>
  );
};

BoardColumns.propTypes = {
  board: PropTypes.objectOf(PropTypes.any).isRequired,
  createNewColumn: PropTypes.func.isRequired,
  updateColumn: PropTypes.func.isRequired,
  deleteColumn: PropTypes.func.isRequired,
};

export default BoardColumns;
