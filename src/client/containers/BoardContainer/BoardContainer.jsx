import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  openModalAction,
  addNewTaskAction,
  createNewStatusAction,
  updateStatusAction,
  deleteStatusAction,
  assigningTaskStatusAction,
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

const BoardContainer = () => {
  const dispatch = useDispatch();
  const { title, description, _id: projectId } = useSelector(projectSelector);
  const { backlogIds, tasks } = useSelector(backlogSelector);
  const categories = useSelector(taskCategoriesSelector);
  const board = useSelector(boardSelector);
  const { userAssignees, groupAssignees } = useSelector(taskAssigneesSelector);

  /**
   * Moving task card from one position to another
   * inside the same column or different column.
   * @param {Object}
   */
  function handleDragEnd({ draggableId, source, destination }) {
    if (!destination || source.droppableId === destination.droppableId) return;

    dispatch(assigningTaskStatusAction(draggableId, source, destination));
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
      <div className="flex h-screen">
        <div className="px-1 py-4">
          <h2 className=" text-xl m-0 p-0 text-neutral-400 text-center">
            Backlog
          </h2>

          <BacklogsList
            openNewTaskModal={openNewTaskModal}
            tasks={tasks}
            backlogIds={backlogIds}
            categories={categories}
            groupAssignees={groupAssignees}
            userAssignees={userAssignees}
          />
        </div>

        <div className="bg-white w-full p-2 pl-5 shadow-md">
          <div>
            <h2 className=" text-xl m-0 p-0">{title}</h2>
            <p className=" text-neutral-400">{description}</p>
          </div>

          <div className="">
            {/* <Header /> */}
            <BoardColumns
              board={board}
              tasks={tasks}
              createNewColumn={createNewColumn}
              categories={categories}
              groupAssignees={groupAssignees}
              userAssignees={userAssignees}
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
