import { format, isSameDay } from 'date-fns';
import { isEmpty } from 'lodash';
import { timeToPosition } from './positionMapper';

export const setCalendarPositionFromTime = (task) => {
  const startPos = timeToPosition[task.startTime];
  const endPos = timeToPosition[task.endTime];
  const height = endPos.y - startPos.y;

  const newTask = {
    ...task,
    position: { x: 0, y: startPos.y },
    dimension: { width: 165, height: height === 0 ? 21 : height },
  };

  return newTask;
};

/**
 *
 * @param {Array} dates Calendar dates
 * @param {Array} tasks Array of tasks
 */
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

export const groupTasksBasedOnDate = (tasks) => {
  if (isEmpty(tasks)) {
    return [];
  }

  const items = [];

  tasks.forEach((task) => {
    const dateKey = String(format(new Date(task.date), 'yyyy-MM-dd'));

    const foundItem = items.find((item) => item.dateKey === dateKey);

    if (foundItem) {
      foundItem.tasks.push(task);
    } else {
      items.push({ dateKey, tasks: [task] });
    }
  });

  const data = items.sort((a, b) => new Date(a.dateKey) - new Date(b.dateKey));

  return data;
};
