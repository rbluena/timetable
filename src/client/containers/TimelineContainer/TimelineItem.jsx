import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Timeline, Typography, Avatar, Tooltip, Tag } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import { getColor } from '@app/utils';

const { Title, Paragraph } = Typography;

const TimelineItem = ({ task }) => {
  const taskCategoryColor = task.category && getColor(task.category.colorName);

  return (
    <Timeline.Item color="blue" className="max-w-md">
      <div
        className="p-3 rounded shadow-md hover:shadow-lg"
        style={{
          backgroundColor: taskCategoryColor ? taskCategoryColor.bgColor : '',
          border: '1px solid',
          borderColor: taskCategoryColor ? taskCategoryColor.color : '',
        }}
      >
        <div className="">
          <p className="text-primary-500 text-sm font-bold p-0 m-0">
            {task.schedule
              ? `${format(new Date(task.schedule.start), 'HH:mm')} - ${format(
                  new Date(task.schedule.end),
                  'HH:mm'
                )}`
              : ``}
          </p>
          <Title
            level={4}
            style={{
              color: taskCategoryColor ? taskCategoryColor.color : '',
            }}
          >
            {task.title}
          </Title>
        </div>

        <Paragraph>{task.description}</Paragraph>

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
      </div>
    </Timeline.Item>
  );
};

TimelineItem.defaultProps = {
  canUserUpdateTask: false,
};

TimelineItem.propTypes = {
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  canUserUpdateTask: PropTypes.bool,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TimelineItem;
