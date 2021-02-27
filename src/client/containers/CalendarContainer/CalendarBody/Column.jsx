/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { format, isSameDay } from 'date-fns';
import TaskCard from './TaskCard';

const hourBlocks = [
  { hour: '00', minutes: '00' },
  { hour: '01', minutes: '00' },
  { hour: '02', minutes: '00' },
  { hour: '03', minutes: '00' },
  { hour: '04', minutes: '00' },
  { hour: '05', minutes: '00' },
  { hour: '06', minutes: '00' },
  { hour: '07', minutes: '00' },
  { hour: '08', minutes: '00' },
  { hour: '09', minutes: '00' },
  { hour: '10', minutes: '00' },
  { hour: '11', minutes: '00' },
  { hour: '12', minutes: '00' },
  { hour: '13', minutes: '00' },
  { hour: '14', minutes: '00' },
  { hour: '15', minutes: '00' },
  { hour: '16', minutes: '00' },
  { hour: '17', minutes: '00' },
  { hour: '18', minutes: '00' },
  { hour: '19', minutes: '00' },
  { hour: '20', minutes: '00' },
  { hour: '21', minutes: '00' },
  { hour: '22', minutes: '00' },
  { hour: '23', minutes: '00' },
];

const minuteBlocks = [
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
];

const Column = ({ updateTask, createTask, date, tasks }) => {
  const today = new Date();
  const isTheSameDate = isSameDay(today, date);

  function cardClicked() {}

  return (
    <div className="w-44 relative">
      <div className="font-bold text-center flex justify-center">
        <div
          className={`flex items-center justify-center rounded-full w-10 h-10 p-4 ${
            isTheSameDate ? 'bg-primary-500 text-white' : 'text-neutral-600 '
          }`}
        >
          {format(date, 'E dd')}
        </div>
      </div>
      <div className=" text-center">
        {hourBlocks.map((timeBlock) => (
          <>
            <div
              key={timeBlock}
              className=" cursor-default border-t border-primary-100"
              style={{ height: '7px' }}
              role="button"
              onClick={() =>
                createTask({
                  date,
                  startHour: timeBlock.hour,
                  startMinutes: timeBlock.minutes,
                })
              }
            />
            {minuteBlocks.map((minuteBlock) => {
              const key = `${timeBlock}-${minuteBlock}`;

              return (
                <div
                  key={key}
                  className={` cursor-default ${
                    minuteBlock === '30'
                      ? 'border-t border-neutral-100'
                      : 'border-t border-neutral-50'
                  } `}
                  style={{ height: '7px' }}
                  role="button"
                  onClick={() =>
                    createTask({
                      date,
                      startHour: timeBlock.hour,
                      startMinutes: minuteBlock,
                    })
                  }
                />
              );
            })}
          </>
        ))}
        {/* start: Columns times and minutes */}

        {/* start: List of blocked times */}
        {tasks.length > 0 &&
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              cardClicked={cardClicked}
              task={task}
              updateTask={updateTask}
            />
          ))}
        {/* end: List of blocked times */}
      </div>
    </div>
  );
};

Column.propTypes = {
  updateTask: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  date: PropTypes.objectOf(PropTypes.objectOf(PropTypes.object)).isRequired,
};

export default Column;
