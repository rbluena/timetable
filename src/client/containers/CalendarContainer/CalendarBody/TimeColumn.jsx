import React from 'react';

const hourBlocks = [
  { label: '00:00' },
  { label: '01:00' },
  { label: '02:00' },
  { label: '03:00' },
  { label: '04:00' },
  { label: '05:00' },
  { label: '06:00' },
  { label: '07:00' },
  { label: '08:00' },
  { label: '09:00' },
  { label: '10:00' },
  { label: '11:00' },
  { label: '12:00' },
  { label: '13:00' },
  { label: '14:00' },
  { label: '15:00' },
  { label: '16:00' },
  { label: '17:00' },
  { label: '18:00' },
  { label: '19:00' },
  { label: '20:00' },
  { label: '21:00' },
  { label: '22:00' },
  { label: '23:00' },
];
const minuteBlocks = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

const TimeColumn = () => (
  <div className="" style={{ width: 65 }}>
    <div className="text-neutral-600 text-center h-8">GMT&nbsp;+3</div>
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
