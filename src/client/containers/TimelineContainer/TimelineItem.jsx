import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Timeline, Typography, Avatar, Tooltip, Tag, Button } from 'antd';
import { DeleteFilled, TeamOutlined, EditOutlined } from '@ant-design/icons';
// import { TimeTicker } from '@app/components';

const { Title, Paragraph } = Typography;

const TimelineItem = ({ task, editTask, deleteTask }) => (
  <Timeline.Item color="blue">
    <div className="py-1">
      <p className="text-primary-500 text-sm font-bold p-0 m-0">
        {task.schedule
          ? `${format(new Date(task.schedule.start), 'HH:mm')} - ${format(
              new Date(task.schedule.end),
              'HH:mm'
            )}`
          : ``}
      </p>
      <Title level={5}>{task.title}</Title>
    </div>

    <Paragraph type="secondary">{task.description}</Paragraph>

    {task.category && (
      <Tag color={task.category.colorName}>{task.category.name}</Tag>
    )}

    <div className="py-2">
      <Avatar.Group
        size="small"
        maxCount={4}
        maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
      >
        {/* start: user assignees */}
        {task.userAssignees &&
          task.userAssignees.length > 0 &&
          task.userAssignees.map((user) => {
            if (
              user.image &&
              user.image.thumbnail &&
              user.image.thumbnail.length
            ) {
              return (
                <Tooltip key={user._id} title={user.fullName}>
                  <Avatar src={user.image.thumbnail} />
                </Tooltip>
              );
            }
            return (
              <Tooltip key={user._id} title={user.fullName}>
                <Avatar style={{ backgroundColor: '#f56a00' }}>
                  {user && user.fullName ? user.fullName[0] : user.email[0]}
                </Avatar>
              </Tooltip>
            );
          })}
        {/* end: User assignees */}

        {/* Groups assigned */}
        {task.groupAssignees &&
          task.groupAssignees.length > 0 &&
          task.groupAssignees.map((group) => (
            <Tooltip
              key={group._id}
              title={group && group.name}
              placement="top"
            >
              <Avatar size="small">
                <TeamOutlined />
              </Avatar>
            </Tooltip>
          ))}
        {/* end: Groups assigned */}
      </Avatar.Group>
    </div>

    {/* <TimeTicker /> */}

    <div className="flex justify-between items-center pt-4">
      <div className="p-0">
        <Button
          className="items-end"
          type="primary"
          size="small"
          ghost
          icon={<EditOutlined />}
          onClick={(evt) => {
            evt.stopPropagation();
            editTask(task);
          }}
        >
          {/* Edit */}
        </Button>
        &nbsp;
        <Button
          type="primary"
          className="items-end"
          size="small"
          icon={<DeleteFilled />}
          danger
          onClick={(evt) => {
            evt.stopPropagation();
            deleteTask(task.project, task._id);
          }}
        >
          {/* Delete */}
        </Button>
      </div>
    </div>
  </Timeline.Item>
);

TimelineItem.propTypes = {
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TimelineItem;
