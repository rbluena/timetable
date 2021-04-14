import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { agendaTasksSelector } from '@app/selectors';
import { CreateTaskModalContainer } from '@app/containers/modals';

import {
  openModalAction,
  setOpenedTaskAction,
  openDrawerAction,
  addNewTaskAction,
  // setEditingTaskAction,
} from '@app/actions';

import Timeline from './Timeline';
import TimelineContainerHeader from './TimelineContainerHeader';
import TimelineHeader from './TimelineHeader';

const TimelineContainer = () => {
  const mappedTasks = useSelector(agendaTasksSelector);
  const dispatch = useDispatch();
  const { query } = useRouter();

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

  // function editTask(task) {
  //   dispatch(setEditingTaskAction(task));
  //   dispatch(openModalAction('task'));
  // }

  return (
    <>
      <div className="w-full bg-white">
        <div className="relative mx-auto max-w-6xl">
          <TimelineContainerHeader
            date={new Date()}
            openNewTaskModal={openNewTaskModal}
          />
          {/* <div className="fixed right-4 md:right-12 top-16"> */}

          <div className="p-4">
            {mappedTasks &&
              mappedTasks.length > 0 &&
              mappedTasks.map((item) => (
                <div
                  // className="pl-4 shadow-sm rounded p-4 bg-white mb-4"
                  key={JSON.stringify(item.date)}
                >
                  <div className="flex justify-start">
                    <TimelineHeader date={new Date(item.dateKey)} />
                    <Timeline
                      tasks={item.tasks}
                      openTaskDrawer={openTaskDrawer}
                    />
                  </div>
                </div>
              ))}
          </div>

          {/* <div className="divide-y divide-primary-100">
            {mappedTasks &&
              mappedTasks.length > 0 &&
              mappedTasks.map((item) => (
                <div
                  key={JSON.stringify(item.date)}
                  className="pl-4 shadow-sm rounded p-4 bg-white mb-4"
                >
                  <div className="max-w-lg">
                    <TimelineHeader date={item.date} />
                    <Timeline
                      tasks={item.tasks}
                      openTask={openTask}
                      editTask={editTask}
                      delete={deleteTask}
                    />
                  </div>
                </div>
              ))}
          </div> */}
        </div>
      </div>

      {/* start: Create task modal */}
      <CreateTaskModalContainer />
      {/* end: Create task modal */}
    </>
  );
};

export default TimelineContainer;
