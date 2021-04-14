// import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import { PlusIcon } from '@app/components/Icons';
// import moment from 'moment';

const TimelineHeader = ({ openNewTaskModal }) => (
  <div className="fixed top-4 text-center right-2 md:right-12">
    {/* start: date picker */}
    {/* <DatePicker
        defaultValue={moment(date)}
        format="MMM"
        size="large"
        className=" w-24 font-bold"
      /> */}
    {/* end: Date picker */}
    {/* <br />
      <br /> */}
    {/* start: Add task button */}
    <Tooltip title="Add task">
      <Button
        type="primary"
        shape="circle"
        className="flex justify-center items-center"
        title="Add task"
        onClick={() => openNewTaskModal()}
      >
        <PlusIcon size="sm" className="inline-block" />
      </Button>
    </Tooltip>
    {/* End: Add task button */}
  </div>
);

TimelineHeader.propTypes = {
  openNewTaskModal: PropTypes.func.isRequired,
};

export default TimelineHeader;
