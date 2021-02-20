import React from 'react';
import ProjectScheduledList from './ProjectScheduledList';
import TimelineHeader from './TimelineHeader';

const TimelineContainer = () => (
  <div className="w-full">
    {/* <Link href="#today" type="button" variant="primary" className="fixed">
      Today
    </Link> */}

    <div className="divide-y divide-neutral-100 bg-white mx-auto max-w-6xl mt-4 shadow-sm rounded p-4">
      <div className="py-4">
        <TimelineHeader />
        <div className="pl-2">
          <ProjectScheduledList />
          <ProjectScheduledList />
          <ProjectScheduledList />
          <ProjectScheduledList />
        </div>
      </div>
      <div className="py-4">
        <TimelineHeader />
        <div className="pl-4">
          <ProjectScheduledList />
          <ProjectScheduledList />
          <ProjectScheduledList />
          <ProjectScheduledList />
        </div>
      </div>
    </div>
  </div>
);

export default TimelineContainer;
