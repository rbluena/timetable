import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { Button } from 'antd';
import { CloseOutlined, UnorderedListOutlined } from '@ant-design/icons';

import {
  editTaskAction,
  openTaskAction,
  createNewStatusAction,
  updateStatusAction,
  deleteStatusAction,
  assigningTaskStatusAction,
} from '@app/actions';

import {
  taskCategoriesSelector,
  projectSelector,
  boardSelector,
  boardDataSelector,
  isUserProjectMemberSelector,
  isUserProjectOwnerSelector,
} from '@app/selectors';

import BoardColumns from './BoardColumns';
import BacklogsList from './BacklogsList';
import CreateTaskButton from './CreateTaskButton';

const BoardContainer = () => {
  const dispatch = useDispatch();
  const [toggleBacklog, setToggleBacklog] = useState(false);
  const { title, _id: projectId, isUserOwner } = useSelector(projectSelector);
  const { backlog } = useSelector(boardDataSelector);
  const { columns } = useSelector(boardSelector);
  const isCurrentUserProjectMember = useSelector(isUserProjectMemberSelector);
  const categories = useSelector(taskCategoriesSelector);

  const isUserProjectMember = useSelector(isUserProjectMemberSelector);
  const isUserProjectOwner = useSelector(isUserProjectOwnerSelector);

  const canUserUpdateTask = isUserProjectMember || isUserProjectOwner;

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

  /**
   * Opening modal to create a new task
   * @param {Object} data Dummy data for the modal
   */
  function createNewTask(data = {}) {
    data._id = 'new:reandom_string'; // dummy id
    data.title = 'New task';
    data.new = true;

    dispatch(editTaskAction(data));
  }

  /**
   * Opening modal to view task.
   * @param {String} taskId An ID of the task
   */
  function openTask(taskId) {
    dispatch(openTaskAction(projectId, taskId));
  }

  /**
   * Creating new column.
   */
  function createNewColumn() {
    const data = { project: projectId };
    dispatch(createNewStatusAction(projectId, data));
  }

  /**
   * Updating column/status details.
   * @param {Object} data
   */
  function updateColumn(columnId, data) {
    dispatch(updateStatusAction(projectId, columnId, data));
  }

  /**
   * Deleting column.
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
          className="transition-all px-1 h-full relative bg-neutral-50 shadow border-r border-primary-300"
          style={{
            width: '280px',
            minWidth: '280px',
            marginLeft: toggleBacklog ? '' : '-280px',
          }}
        >
          <div className="flex items-center p-2">
            <h2 className="text-xl m-0 p-0 text-neutral-400 text-center">
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

          {isCurrentUserProjectMember && (
            <CreateTaskButton openNewTaskModal={createNewTask} />
          )}

          <BacklogsList
            backlog={backlog || []}
            categories={categories}
            openTask={openTask}
            canUserUpdateTask={canUserUpdateTask}
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
          <div className="py-1 my-1 border-b border-primary-100 flex items-center w-full">
            <Button
              type="primary"
              className="mt-2"
              ghost
              onClick={() => setToggleBacklog(!toggleBacklog)}
            >
              <UnorderedListOutlined />
            </Button>
            &nbsp;&nbsp;
            <div className="w-full ">
              <h2 className=" text-lg m-0 p-0 truncate">{title}</h2>
              {/* <p className=" text-xs text-neutral-400 truncate">
                {description}
              </p> */}
            </div>
          </div>
          {/* end: Board header */}

          {/* start:  Board columns */}
          <BoardColumns
            columns={columns}
            categories={categories}
            openTask={openTask}
            createNewColumn={createNewColumn}
            canUserUpdateTask={canUserUpdateTask}
            updateColumn={updateColumn}
            deleteColumn={deleteColumn}
            isUserOwner={isUserOwner}
          />
          {/* end: Board columns */}
        </div>
        {/* end: Board Container */}
      </div>
    </DragDropContext>
  );
};

export default BoardContainer;
