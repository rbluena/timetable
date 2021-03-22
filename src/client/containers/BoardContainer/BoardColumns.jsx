import { PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import BoardColumn from './BoardColumn';

const BoardColumns = ({ board }) => (
  <div className="p-4 overflow-x-auto flex pr-4">
    {board.result.map((columnId) => {
      const columnData = board.columns[columnId];

      return (
        <BoardColumn
          columnTitle="Applies"
          columnIndex={columnId}
          tasks={columnData.tasks}
        />
      );
    })}

    <div className="mx-1 bg-neutral-50 h-10">
      <Tooltip title="Add column">
        <Button size="large" type="text" icon={<PlusOutlined size="large" />} />
      </Tooltip>
    </div>
  </div>
);

export default BoardColumns;
