import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { Button } from 'antd';
import { CloseOutlined, UnorderedListOutlined } from '@ant-design/icons';
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
import CreateTaskButton from './CreateTaskButton';
// import Header from './Header';

const BoardContainer = () => {
  const dispatch = useDispatch();
  const [toggleBacklog, setToggleBacklog] = useState(false);
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

    dispatch(
      assigningTaskStatusAction(projectId, draggableId, source, destination)
    );
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
      <div className="bg-white flex h-screen">
        {/* start: Backlog container */}
        <div
          className=" transition-all px-1 h-full relative bg-neutral-50 shadow border-r border-primary-300"
          style={{
            width: '280px',
            minWidth: '280px',
            marginLeft: toggleBacklog ? '' : '-280px',
          }}
        >
          <div className="flex items-center p-2">
            <h2 className=" text-xl m-0 p-0 text-neutral-400 text-center">
              Backlog
            </h2>
            <Button
              type="text"
              className="ml-auto"
              onClick={() => setToggleBacklog(!toggleBacklog)}
            >
              <CloseOutlined />
            </Button>
          </div>
          <CreateTaskButton openNewTaskModal={openNewTaskModal} />

          <BacklogsList
            tasks={tasks}
            backlogIds={backlogIds}
            categories={categories}
            groupAssignees={groupAssignees}
            userAssignees={userAssignees}
          />
        </div>
        {/* end: Backlog container */}

        {/* start: Board container */}
        <div
          className=" transition-all p-2"
          style={{
            position: 'fixed',
            overflow: 'hidden',
            width: 'calc(100% - 4rem)',
            marginLeft: toggleBacklog ? '280px' : '',
          }}
        >
          {/* start: Board header */}
          <div className="py-1 my-1 border-b border-primary-100 flex w-full">
            <Button
              type="primary"
              className="mt-2"
              ghost
              onClick={() => setToggleBacklog(!toggleBacklog)}
            >
              <UnorderedListOutlined />
            </Button>
            &nbsp;&nbsp;
            <div>
              <h2 className=" text-lg m-0 p-0">{title}</h2>
              <p className=" text-xs text-neutral-400">{description}</p>
            </div>
          </div>
          {/* end: Board header */}

          {/* start:  Board columns */}
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
          {/* end: Board columns */}
        </div>
        {/* end: Board Container */}
      </div>
    </DragDropContext>
  );
};

export default BoardContainer;
