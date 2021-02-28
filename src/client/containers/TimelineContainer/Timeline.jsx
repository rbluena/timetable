import { Timeline } from 'antd';
import TimelineItem from './TimelineItem';

const TimelineComponent = ({ tasks }) => (
  <Timeline>
    {tasks &&
      tasks.length > 0 &&
      tasks.map((task) => <TimelineItem key={task._id} task={task} />)}
  </Timeline>
);

export default TimelineComponent;
