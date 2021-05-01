import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  agendaTasksSelector,
  isUserProjectMemberSelector,
  isUserProjectOwnerSelector,
} from '@app/selectors';
import { CreateTaskModalContainer } from '@app/containers/modals';

import {
  openModalAction,
  setOpenedTaskAction,
  openDrawerAction,
  addNewTaskAction,
  loadPrevTasksAction,
  loadNextTasksAction,
  setEditingTaskAction,
  deleteTaskAction,
} from '@app/actions';

import { Button } from 'antd';
import Timeline from './Timeline';
import TimelineContainerHeader from './TimelineContainerHeader';
import TimelineHeader from './TimelineHeader';

const TimelineContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const mappedTasks = useSelector(agendaTasksSelector);
  const isUserProjectMember = useSelector(isUserProjectMemberSelector);
  const isUserProjectOwner = useSelector(isUserProjectOwnerSelector);
  const dispatch = useDispatch();
  const { query } = useRouter();

  const canUserUpdateTask = isUserProjectMember || isUserProjectOwner;

  /**
   * Opening drawer to view task details.
   * @param {String} id Task ID
   */
  function openTaskDrawer(id) {
    dispatch(setOpenedTaskAction(id, query.id));
    dispatch(openDrawerAction('task'));
  }

  function openNewTaskModal(data = {}) {
    data.title = 'New task';
    data.new = true;
    data._id = 'new:reandom_string';

    dispatch(addNewTaskAction(data));
    dispatch(openModalAction('task'));
  }

  /**
   * Load previous tasks based on date
   */
  function loadPrev() {
    setIsLoading(true);
    const date = mappedTasks.length ? mappedTasks[0].dateKey : Date.now();
    dispatch(loadPrevTasksAction(date));
    setIsLoading(false);
  }

  /**
   * Load next tasks based on date
   */
  function loadNext() {
    setIsLoading(true);
    const date = mappedTasks.length
      ? mappedTasks[mappedTasks.length - 1].dateKey
      : Date.now();
    dispatch(loadNextTasksAction(date));
    setIsLoading(false);
  }

  function editTask(task) {
    dispatch(setEditingTaskAction(task));
    dispatch(openModalAction('task'));
  }

  function deleteTask(projectId, taskId) {
    dispatch(deleteTaskAction(projectId, taskId));
  }

  return (
    <>
      <div className="w-full bg-white min-h-screen">
        <div className="relative mx-auto max-w-6xl">
          <TimelineContainerHeader
            date={new Date()}
            openNewTaskModal={openNewTaskModal}
            isUserProjectMember={isUserProjectMember}
          />

          <div className="p-2">
            <Button
              type="primary"
              size="small"
              loading={isLoading}
              onClick={() => loadPrev()}
              className="my-4"
            >
              Oldest
            </Button>

            {/* start: Rendering tasks */}
            {mappedTasks &&
              mappedTasks.length > 0 &&
              mappedTasks.map((item) => (
                <div className="" key={item.dateKey}>
                  <div className="flex justify-start">
                    <TimelineHeader date={new Date(item.dateKey)} />
                    <Timeline
                      tasks={item.tasks}
                      canUserUpdateTask={canUserUpdateTask}
                      editTask={editTask}
                      deleteTask={deleteTask}
                      openTaskDrawer={openTaskDrawer}
                    />
                  </div>
                </div>
              ))}
            {/* end; Rendering tasks. */}

            <Button
              type="primary"
              size="small"
              className="mb-10"
              loading={isLoading}
              onClick={() => loadNext()}
            >
              Newest
            </Button>
          </div>
        </div>
      </div>

      {/* start: Create task modal */}
      <CreateTaskModalContainer />
      {/* end: Create task modal */}
    </>
  );
};

export default TimelineContainer;
