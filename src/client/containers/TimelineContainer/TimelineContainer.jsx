import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calendarTasksSelector } from '@app/selectors';
import { groupTasksBasedOnDate } from '@app/utils';
import { CreateTaskModalContainer } from '@app/containers/modals';
import { TaskDetailsDrawer } from '@app/containers/drawers';
import { Button, Tooltip } from 'antd';
import { openModalAction } from '@app/actions';
import { PlusIcon } from '@app/components/Icons';
import Timeline from './Timeline';
import TimelineHeader from './TimelineHeader';

const TimelineContainer = () => {
  const tasks = useSelector(calendarTasksSelector);
  const dispatch = useDispatch();
  const mappedTasks = groupTasksBasedOnDate(tasks);

  return (
    <>
      <div className="w-full">
        <div className="relative mx-auto max-w-6xl">
          <div className="fixed right-4 md:right-12 top-16">
            {/* start: Add task button */}
            <Tooltip title="Add task">
              <Button
                type="primary"
                shape="circle"
                className="flex justify-center items-center"
                size="large"
                title="Add task"
                onClick={() => dispatch(openModalAction('task'))}
              >
                <PlusIcon size="sm" className="inline-block" />
              </Button>
            </Tooltip>
            {/* start: End task button */}
          </div>

          <div className="divide-y divide-primary-100">
            {mappedTasks &&
              mappedTasks.length > 0 &&
              mappedTasks.map((item) => (
                <div
                  key={JSON.stringify(item.date)}
                  className="pl-4 shadow-sm rounded p-4 bg-white mb-4"
                >
                  <div className="max-w-lg">
                    <TimelineHeader date={item.date} />
                    <Timeline tasks={item.tasks} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* start: Create task modal */}
      <CreateTaskModalContainer />
      <TaskDetailsDrawer />
      {/* end: Create task modal */}
    </>
  );
};

export default TimelineContainer;
