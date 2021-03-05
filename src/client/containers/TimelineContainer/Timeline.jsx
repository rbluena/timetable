import { Timeline } from 'antd';
import TimelineItem from './TimelineItem';

const TimelineComponent = ({ tasks, openTask, editTask, deleteTask }) => (
  <Timeline>
    {tasks &&
      tasks.length > 0 &&
      tasks.map((task) => (
        <TimelineItem
          key={task._id}
          task={task}
          openTask={(id) => openTask(id)}
          editTask={(id) => editTask(id)}
          delete={(id) => deleteTask(id)}
        />
      ))}
  </Timeline>
);

export default TimelineComponent;
