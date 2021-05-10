// import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import moment from 'moment';

const TimelineHeader = ({ createNewTask, isUserProjectMember }) => (
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
    {isUserProjectMember && (
      <Tooltip title="Add task">
        <Button
          type="primary"
          shape="circle"
          size="large"
          className="flex justify-center items-center"
          title="Add task"
          onClick={() => createNewTask()}
          icon={<PlusOutlined />}
        >
          {/* <PlusIcon size="sm" className="inline-block" /> */}
        </Button>
      </Tooltip>
    )}
    {/* End: Add task button */}
  </div>
);

TimelineHeader.defaultProps = {
  isUserProjectMember: false,
};

TimelineHeader.propTypes = {
  createNewTask: PropTypes.func.isRequired,
  isUserProjectMember: PropTypes.bool,
};

export default TimelineHeader;
