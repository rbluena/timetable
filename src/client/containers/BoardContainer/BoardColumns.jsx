import BoardColumn from './BoardColumn';

const BoardColumns = ({ board }) => (
  <div className="p-4 overflow-x-auto flex">
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
  </div>
);

export default BoardColumns;
