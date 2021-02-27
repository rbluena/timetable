import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setHours, setMinutes } from 'date-fns';
import {
  openModalAction,
  addNewTaskAction,
  updateTaskAction,
} from '@app/actions';
import TimeColumn from './TimeColumn';
import Column from './Column';

const CalendarBody = ({ calendarDates }) => {
  const dispatch = useDispatch();

  function createTask(data) {
    data.title = 'New task';
    data.date = setHours(data.date, data.startHour);
    data.date = setMinutes(data.date, data.startMinutes);
    data.schedule = {
      startTime: `${data.startHour}:${data.startMinutes}`,
      endTime: `${data.startHour}:${data.startMinutes}`,
    };
    data.startTime = `${data.startHour}:${data.startMinutes}`;
    data.endTime = `${data.startHour}:${data.startMinutes}`;
    data._id = 'random_string';
    data.new = true;

    dispatch(addNewTaskAction(data));
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
                createTask={createTask}
                date={date.date}
                tasks={date.tasks}
              />
            );
          })}
      </div>
    </div>
  );
};

CalendarBody.propTypes = {
  calendarDates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CalendarBody;
