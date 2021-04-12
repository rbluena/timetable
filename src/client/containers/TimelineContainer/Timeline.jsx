import { Timeline } from 'antd';
import TimelineItem from './TimelineItem';

const TimelineComponent = ({ tasks, openTask, editTask, deleteTask }) => (
  <div className="py-1">
    <Timeline>
      {tasks &&
        tasks.length > 0 &&
        tasks.map((task) => (
          <a href="#">
            <TimelineItem
              key={task._id}
              task={task}
              openTask={(id) => openTask(id)}
              // editTask={(id) => editTask(id)}
              // delete={(id) => deleteTask(id)}
            />
          </a>
        ))}
    </Timeline>
  </div>
);

export default TimelineComponent;
