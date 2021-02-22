/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import TaskCard from './TaskCard';

// const hourBlocks = [
//   {
//     time: '12:00 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '12:30 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '01:00 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '01:30 am',
//     title: 'Title of the card',
//     description:
//       'Description of the card. We will be doing all these thing together.',
//     hasData: true,
//   },
//   {
//     time: '02:00 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '02:30 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '03:00 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '03:30 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '04:00 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '04:30 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '05:00 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '05:30 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '06:00 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '06:30 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '07:00 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '07:30 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '08:00 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '08:30 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '09:00 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '09:30 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '10:00 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '11:30 am',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '12:00 pm',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '12:30 pm',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '07:00 pm',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '07:30 pm',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '08:00 pm',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '08:30 pm',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '09:00 pm',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '09:30 pm',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '09:00 pm',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '09:30 pm',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '10:00 pm',
//     start: '10:00 pm',
//     end: '10:00 pm',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//     hasData: true,
//   },
//   {
//     time: '10:30 pm',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '11:00 pm',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
//   {
//     time: '11:30 pm',
//     title: 'Title of the card',
//     description: 'Description of the card.',
//   },
// ];

const hourBlocks = [
  { time: '12:00 am' },
  { time: '01:00 am' },
  { time: '02:00 am' },
  { time: '03:00 am' },
  { time: '04:00 am' },
  { time: '05:00 am' },
  { time: '06:00 am' },
  { time: '07:00 am' },
  { time: '08:00 am' },
  { time: '09:00 am' },
  { time: '10:00 am' },
  { time: '11:00 am' },
  { time: '12:00 pm' },
  { time: '07:00 pm' },
  { time: '08:00 pm' },
  { time: '03:00 pm' },
  { time: '04:00 pm' },
  { time: '05:00 pm' },
  { time: '06:00 pm' },
  { time: '07:00 pm' },
  { time: '08:00 pm' },
  { time: '09:00 pm' },
  { time: '10:00 pm' },
  { time: '11:00 pm' },
];

const minuteBlocks = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

const Column = () => (
  <div className="w-44 relative">
    <div className="text-neutral-600 font-bold text-center text-lg">Mon 12</div>
    <div className=" text-center">
      {/* start: Columns times and minutes */}
      {hourBlocks.map(() => (
        <>
          <div
            className="border-t border-primary-100"
            style={{ height: '7px' }}
          />
          {minuteBlocks.map((minuteBlock) => (
            <div
              className={`${
                minuteBlock === 30
                  ? 'border-t border-neutral-100'
                  : 'border-t border-neutral-50'
              } `}
              style={{ height: '7px' }}
            />
          ))}
        </>
      ))}
      {/* start: Columns times and minutes */}

      {/* start: List of blocked times */}
      <TaskCard />
      <TaskCard />
      {/* end: List of blocked times */}
    </div>
  </div>
);

export default Column;
