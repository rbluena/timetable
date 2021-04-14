/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { Timeline } from 'antd';
import TimelineItem from './TimelineItem';

const TimelineComponent = ({ tasks, openTaskDrawer }) => (
  <div className="py-1">
    <Timeline>
      {tasks &&
        tasks.length > 0 &&
        tasks.map((task) => (
          <a key={task._id} onClick={() => openTaskDrawer(task._id)}>
            <TimelineItem
              key={task._id}
              task={task}
              // editTask={(id) => editTask(id)}
              // delete={(id) => deleteTask(id)}
            />
          </a>
        ))}
    </Timeline>
  </div>
);

TimelineComponent.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.any).isRequired,
  openTaskDrawer: PropTypes.func.isRequired,
};

export default TimelineComponent;
