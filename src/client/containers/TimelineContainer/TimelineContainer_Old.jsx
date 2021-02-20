import React from 'react';
import { Button, TimeTicker } from '@app/components';
import { PlayIcon } from '@app/components/Icons';

const data = [
  {
    date: new Date(),
    tasks: [
      {
        name: "Newton's law of motion.",
        timer: '00:00:00',
        startAt: '11:00 am',
        endAt: '12:45 pm',
        activities: 3,
        assets: 6,
      },
      {
        name: "Newton's law of motion.",
        timer: '00:00:00',
        startAt: '11:00 am',
        endAt: '12:45 pm',
        activities: 3,
        assets: 6,
      },
      {
        name: "Newton's law of motion.",
        timer: '00:00:00',
        startAt: '11:00 am',
        endAt: '12:45 pm',
        activities: 3,
        assets: 6,
      },
    ],
  },
  {
    date: new Date(),
    tasks: [
      {
        name: "Newton's law of motion.",
        timer: '00:00:00',
        startAt: '11:00 am',
        endAt: '12:45 pm',
        activities: 3,
        assets: 6,
      },
      {
        name: "Newton's law of motion.",
        timer: '00:00:00',
        startAt: '11:00 am',
        endAt: '12:45 pm',
        activities: 3,
        assets: 6,
      },
      {
        name: "Newton's law of motion.",
        timer: '00:00:00',
        startAt: '11:00 am',
        endAt: '12:45 pm',
        activities: 3,
        assets: 6,
      },
    ],
  },
  {
    date: new Date(),
    tasks: [
      {
        name: "Newton's law of motion.",
        timer: '00:00:00',
        startAt: '11:00 am',
        endAt: '12:45 pm',
        activities: 3,
        assets: 6,
      },
      {
        name: "Newton's law of motion.",
        timer: '00:00:00',
        startAt: '11:00 am',
        endAt: '12:45 pm',
        activities: 3,
        assets: 6,
      },
      {
        name: "Newton's law of motion.",
        timer: '00:00:00',
        startAt: '11:00 am',
        endAt: '12:45 pm',
        activities: 3,
        assets: 6,
      },
    ],
  },
];

const TimelineContainer = () => (
  <div className="flex w-full bg-white max-w-6xl mx-auto">
    <Button variant="primary" className="fixed">
      Today
    </Button>
    <div className="max-w-2xl w-full pl-16">
      {data.map((item) => (
        <div className="pl-4 divide-y divide-neutral-100 pb-8">
          <h2 className="text-xl font-extrabold mb-4">
            <span className="text-success-400 ">TUESDAY</span> - 23
          </h2>

          <div className="">
            {item.tasks.map((task) => (
              <div className="py-4">
                <header className="pb-3">
                  <div className="flex flex-wrap justify-between">
                    <p className="text-lg font-bold">
                      Newton&apos;s law of motion
                    </p>
                    <TimeTicker />
                  </div>
                  <p className="text-lg font-light">11:00am - 12:45pm</p>
                </header>
                <footer className="flex flex-wrap">
                  {/* start: assets */}
                  <div>
                    <span className="text-success-800">Assets</span>
                    &nbsp;
                    <span className="text-neutral-500">3</span>
                  </div>
                  {/* end: assets */}
                  &nbsp; &nbsp;
                  {/* start: activities */}
                  <div>
                    <span className="text-success-800">Activities</span>
                    &nbsp;
                    <span className="text-neutral-500">3</span>
                  </div>
                  {/* end: activities */}
                  &nbsp; &nbsp;
                  {/* start: assignees */}
                  <div>
                    <span className="text-success-800">Assignees</span>
                    &nbsp;
                    <span className="text-neutral-500">1</span>
                  </div>
                  {/* end: assignee */}
                </footer>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TimelineContainer;
