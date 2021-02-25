/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { format, setHours } from 'date-fns';
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

const minuteBlocks = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

const Column = ({ openEditTaskModal, date }) => {
  function cardClicked() {}

  return (
    <div className="w-44 relative">
      <div className="text-neutral-600 font-bold text-center h-8">
        {format(date, 'MMM dd')}
      </div>
      <div className=" text-center">
        {/* start: Columns hours and' }, { minutes: 'mi'},n{ period: 'utes */}
        {hourBlocks.map((timeBlock) => (
          <>
            <div
              className=" cursor-default border-t border-primary-100"
              style={{ height: '7px' }}
              role="button"
              onClick={() =>
                openEditTaskModal({
                  date,
                  startHour: timeBlock.hour,
                  startMinutes: 0,
                })
              }
            />
            {minuteBlocks.map((minuteBlock) => (
              <div
                className={` cursor-default ${
                  minuteBlock === 30
                    ? 'border-t border-neutral-100'
                    : 'border-t border-neutral-50'
                } `}
                style={{ height: '7px' }}
                role="button"
                onClick={() =>
                  openEditTaskModal({
                    date,
                    startHour: timeBlock.hour,
                    startMinutes: minuteBlock,
                  })
                }
              />
            ))}
          </>
        ))}
        {/* start: Columns times and minutes */}

        {/* start: List of blocked times */}
        <TaskCard cardClicked={cardClicked} />
        <TaskCard cardClicked={cardClicked} />
        {/* end: List of blocked times */}
      </div>
    </div>
  );
};

export default Column;
