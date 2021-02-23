import React from 'react';
import { Button, Tooltip } from 'antd';
import { PlusIcon } from '@app/components/Icons';
import Timeline from './Timeline';
import TimelineHeader from './TimelineHeader';

const TimelineContainer = () => (
  <div className="w-full">
    <div className="relative bg-white mx-auto max-w-6xl shadow-sm rounded p-4">
      <div className="fixed right-4 md:right-12 top-16">
        <Tooltip title="Add task">
          <Button
            type="primary"
            shape="circle"
            className="flex justify-center items-center"
            size="large"
            title="Add task"
          >
            <PlusIcon size="sm" className="inline-block" />
          </Button>
        </Tooltip>
      </div>
      <div className="divide-y divide-primary-100">
        <div className="py-4 max-w-md pl-4">
          <TimelineHeader date="Tuesday 23" />
          <Timeline />
        </div>
        <div className="py-4 max-w-md pl-4">
          <TimelineHeader date="Thursday 24" />
          <Timeline />
        </div>
        <div className="py-4 max-w-md pl-4">
          <TimelineHeader date="Monday 27" />
          <Timeline />
        </div>
      </div>
    </div>
  </div>
);

export default TimelineContainer;
