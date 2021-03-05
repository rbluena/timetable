import { Timeline, Button, Typography, Avatar, Tooltip, Tag } from 'antd';
import PropTypes from 'prop-types';

const { Title } = Typography;

const TimelineItem = ({ task, openTask, editTask, deleteTask }) => (
  <Timeline.Item color="blue">
    <div className="py-2 flex flex-wrap">
      <p className="text-primary-500 text-sm font-bold p-0 m-0">
        {task.startTime} - {task.endTime}
      </p>
      &nbsp; &nbsp;
      {task.category && (
        <Tag color={task.category.colorName}>{task.category.name}</Tag>
      )}
    </div>

    <Title level={5}>{task.title}</Title>

    {/* <Paragraph type="secondary">{task.description}</Paragraph> */}
    <div className="py-2">
      {task.assignees && task.assignees.length > 0 && (
        <Avatar.Group
          size="small"
          maxCount={3}
          maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
        >
          {task.assignees.map((user) => {
            if (
              user.image &&
              user.image.thumbnail &&
              user.image.thumbnail.length
            ) {
              return (
                <Tooltip title={user.name} placement="top">
                  <Avatar src={user.image.thumbnail} />
                </Tooltip>
              );
            }
            return (
              <Tooltip title={user.name} placement="top">
                <Avatar style={{ backgroundColor: '#f56a00' }}>
                  {user.name[0]}
                </Avatar>
              </Tooltip>
            );
          })}
        </Avatar.Group>
      )}
    </div>

    {/* <TimeTicker /> */}

    <div className="flex justify-between items-center pt-4">
      <Button
        type="primary"
        size="small"
        ghost
        onClick={() => openTask(task._id)}
      >
        Details
      </Button>
      &nbsp;
      <div className="p-0">
        <Button
          className="items-end"
          size="small"
          onClick={() => editTask(task)}
        >
          Edit
        </Button>
        &nbsp;
        <Button
          type="primary"
          className="items-end"
          size="small"
          danger
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  </Timeline.Item>
);

TimelineItem.propTypes = {
  openTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  task: PropTypes.objectOf(PropTypes).isRequired,
};

export default TimelineItem;
