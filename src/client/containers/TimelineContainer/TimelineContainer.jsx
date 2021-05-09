import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  agendaTasksSelector,
  isUserProjectMemberSelector,
  isUserProjectOwnerSelector,
} from '@app/selectors';
import { TaskModalContainer } from '@app/containers/modals';

import {
  openTaskAction,
  editTaskAction,
  deleteTaskAction,
  loadPrevTasksAction,
  loadNextTasksAction,
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
    dispatch(openTaskAction(query.id, taskId));
  }

  /**
   * Opening modal to edit task.
   * @param {Object} task Task to be edited
   */
  function editTask(task) {
    dispatch(openTaskAction(query.id, task._id, true));
  }

  /**
   * Function to delete a task.
   * @param {String} projectId ID of the project.
   * @param {String} taskId ID of the task.
   */
  function deleteTask(projectId, taskId) {
    dispatch(deleteTaskAction(projectId, taskId));
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

  return (
    <>
      <div className="w-full bg-white min-h-screen">
        <div className="relative mx-auto max-w-6xl">
          <TimelineContainerHeader
            date={new Date()}
            createNewTask={createNewTask}
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
                  {/* <div className="flex justify-start"> */}
                  <div>
                    <TimelineHeader date={new Date(item.dateKey)} />
                    <Timeline
                      tasks={item.tasks}
                      canUserUpdateTask={canUserUpdateTask}
                      editTask={editTask}
                      deleteTask={deleteTask}
                      openTask={openTask}
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
      <TaskModalContainer />
      {/* end: Create task modal */}
    </>
  );
};

export default TimelineContainer;
