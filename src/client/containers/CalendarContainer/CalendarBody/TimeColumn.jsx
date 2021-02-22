import React from 'react';

const hourBlocks = [
  { label: '12:00 am' },
  { label: '01:00 am' },
  { label: '02:00 am' },
  { label: '03:00 am' },
  { label: '04:00 am' },
  { label: '05:00 am' },
  { label: '06:00 am' },
  { label: '07:00 am' },
  { label: '08:00 am' },
  { label: '09:00 am' },
  { label: '10:00 am' },
  { label: '11:00 am' },
  { label: '12:00 pm' },
  { label: '07:00 pm' },
  { label: '08:00 pm' },
  { label: '03:00 pm' },
  { label: '04:00 pm' },
  { label: '05:00 pm' },
  { label: '06:00 pm' },
  { label: '07:00 pm' },
  { label: '08:00 pm' },
  { label: '09:00 pm' },
  { label: '10:00 pm' },
  { label: '11:00 pm' },
];
const minuteBlocks = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

const TimeColumn = () => (
  <div className="" style={{ width: 65 }}>
    <div className="text-neutral-600 font-bold text-lg">GMT&nbsp;+3</div>
    <div>
      {hourBlocks.map((time) => (
        <div className="">
          <div
            className="border-t border-neutral-100 text-sm uppercase"
            style={{ height: '7px' }}
          >
            {time.label}
          </div>
          {minuteBlocks.map(() => (
            <div className="" style={{ height: '7px' }} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default TimeColumn;
