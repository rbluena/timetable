import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import BoardColumn from './BoardColumn';

const BoardColumns = ({
  canUserUpdateTask,
  isUserOwner,
  columns,
  openTaskDrawer,
  categories,
  createNewColumn,
  updateColumn,
  deleteColumn,
}) => (
  // const { columnIds, columns } = board;

  <div className="flex max-w-full overflow-auto">
    {columns &&
      columns.length > 0 &&
      columns.map((columnData, index) => (
        <BoardColumn
          canUserUpdateTask={canUserUpdateTask}
          isUserOwner={isUserOwner}
          key={columnData._id}
          columnData={columnData}
          columnIndex={index}
          categories={categories}
          openTaskDrawer={openTaskDrawer}
          updateColumn={updateColumn}
          deleteColumn={deleteColumn}
        />
      ))}

    {isUserOwner && (
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
    )}
  </div>
);
BoardColumns.defaultProps = {
  canUserUpdateTask: false,
  categories: {},
  isUserOwner: false,
};

BoardColumns.propTypes = {
  canUserUpdateTask: PropTypes.bool,
  createNewColumn: PropTypes.func.isRequired,
  updateColumn: PropTypes.func.isRequired,
  deleteColumn: PropTypes.func.isRequired,
  categories: PropTypes.objectOf(PropTypes.any),
  isUserOwner: PropTypes.bool,
};

export default BoardColumns;
