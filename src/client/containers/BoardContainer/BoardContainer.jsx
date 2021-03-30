import { cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { Typography } from 'antd';
import {
  openModalAction,
  addNewTaskAction,
  createNewStatusAction,
  updateStatusAction,
  deleteStatusAction,
} from '@app/actions';

import {
  backlogSelector,
  taskCategoriesSelector,
  taskAssigneesSelector,
  projectSelector,
  boardSelector,
} from '@app/selectors';

import BoardColumns from './BoardColumns';
import BacklogsList from './BacklogsList';
// import Header from './Header';

const { Title } = Typography;

function reorder(columnsData, taskId, source, destination) {
  const columns = cloneDeep(columnsData);
  const sourceColumnTasks = columns[source.droppableId].tasks;
  const destinationColumTasks = columns[destination.droppableId].tasks;

  const task = sourceColumnTasks.find((item) => item._id === taskId);

  const newSourceTasks = sourceColumnTasks.filter(
    (item) => item._id !== taskId
  );

  const newDestTasks =
    source.droppableId === destination.droppableId
      ? destinationColumTasks.slice(destination.index, 1, task)
      : destinationColumTasks.splice(destination.index, 0, task);

  columns[source.droppableId].tasks = newSourceTasks;
  columns[destination.droppableId].tasks = newDestTasks;

  return columns;
}

const BoardContainer = () => {
  const dispatch = useDispatch();
  const { title, _id: projectId } = useSelector(projectSelector);
  const { backlogIds, backlog } = useSelector(backlogSelector);
  const categories = useSelector(taskCategoriesSelector);
  const board = useSelector(boardSelector);
  const { userAssignees, groupAssignees } = useSelector(taskAssigneesSelector);

  /**
   * Moving item from one position to another
   * inside the same column or different column.
   * @param {Object}
   */
  function handleDragEnd({ draggableId, destination, source }) {
    // if (!destination) return;
    // console.log(draggableId);
    // console.log(destination);
    // console.log(source);
  }

  function openNewTaskModal(data) {
    data.title = 'New task';
    data.new = true;
    data._id = 'new:reandom_string';

    dispatch(addNewTaskAction(data));
    dispatch(openModalAction('task'));
  }

  /**
   * Creating new column
   */
  function createNewColumn() {
    const data = { project: projectId };
    dispatch(createNewStatusAction(projectId, data));
  }

  /**
   * Updating column/status details
   * @param {Object} data
   */
  function updateColumn(columnId, data) {
    dispatch(updateStatusAction(projectId, columnId, data));
  }

  /**
   * Deleting column
   * @param {String} columnId
   */
  function deleteColumn(columnId) {
    dispatch(deleteStatusAction(projectId, columnId));
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex">
        <div className="md:w-2/12">
          <BacklogsList
            openNewTaskModal={openNewTaskModal}
            backlog={backlog}
            backlogIds={backlogIds}
            categories={categories}
            groupAssignees={groupAssignees}
            userAssignees={userAssignees}
          />
        </div>

        <div className="m-2 w-8/12">
          <Title level={5}>{title}</Title>

          <div className="bg-white shadow rounded p-2">
            {/* <Header /> */}
            <BoardColumns
              board={board}
              createNewColumn={createNewColumn}
              updateColumn={updateColumn}
              deleteColumn={deleteColumn}
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default BoardContainer;
