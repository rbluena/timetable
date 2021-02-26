import { isSameDay } from 'date-fns';
import { isEmpty } from 'lodash';
import { timeToPosition } from './positionMapper';

export const getTimeFromPosition = (position) => {
  const time = pos;
};

export const setCalendarPositionFromTime = (task) => {
  const startPos = timeToPosition[task.startTime];
  const endPos = timeToPosition[task.endTime];
  const height = endPos.y - startPos.y;

  const newTask = {
    ...task,
    position: { x: 0, y: startPos.y },
    dimension: { width: 165, height },
  };

  return newTask;
};

export const mergingTasksBasedOnDate = (dates, tasks) => {
  if (isEmpty(tasks)) {
    return dates;
  }

  const tasksKeys = Object.keys(tasks);
  const mappedTasks = tasksKeys
    .map((key) => tasks[key])
    .map(setCalendarPositionFromTime);

  const mergedDates = dates.map((item) => {
    const thisDayTasks = mappedTasks.filter((task) =>
      isSameDay(item, task.date)
    );

    return {
      date: item,
      tasks: thisDayTasks || [],
    };
  });

  return mergedDates;
};
