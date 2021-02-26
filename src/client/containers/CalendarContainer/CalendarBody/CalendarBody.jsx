import { useDispatch } from 'react-redux';
import { setHours, setMinutes } from 'date-fns';
import {
  openModalAction,
  setEditingTaskAction,
  updateTaskAction,
} from '@app/actions';
import TimeColumn from './TimeColumn';
import Column from './Column';

const CalendarBody = ({ calendarDates }) => {
  const dispatch = useDispatch();

  function openEditTaskModal(data) {
    data.date = setHours(data.date, data.startHour);
    data.date = setMinutes(data.date, data.startMinutes);
    dispatch(setEditingTaskAction(data));
    dispatch(openModalAction('task'));
  }

  /**
   *
   */
  function updateTask(task) {
    delete task.dimension;
    delete task.position;

    dispatch(updateTaskAction(task._id, task));
  }

  return (
    <div className="flex  pt-10">
      {/* start: Time columns */}
      <TimeColumn />
      {/* start: Time columns */}

      <div className="border-l border-neutral-100 divide-x divide-neutral-100 flex calendar-bound">
        {calendarDates &&
          calendarDates.length > 0 &&
          calendarDates.map((date) => {
            const key = `${date}`;

            return (
              <Column
                key={key}
                updateTask={updateTask}
                openEditTaskModal={openEditTaskModal}
                date={date.date}
                tasks={date.tasks}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CalendarBody;
