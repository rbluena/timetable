import React from 'react';
import { Button, Link, Text } from '@app/components';
import ProjectScheduledList from './ProjectScheduledList';
import TimelineHeader from './TimelineHeader';

const TimelineContainer = () => (
  <div className="w-full">
    {/* <Link href="#today" type="button" variant="primary" className="fixed">
      Today
    </Link> */}

    <div className="max-w-4xl mx-auto bg-white shadow-sm p-2 divide-y divide-neutral-100">
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
