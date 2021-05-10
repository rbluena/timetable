import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Timeline, Typography, Avatar, Tooltip, Tag } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import { getColor } from '@app/utils';

const { Title } = Typography;

const TimelineItem = ({ task }) => {
  const taskCategoryColor = task.category && getColor(task.category.colorName);

  return (
    <Timeline.Item color="blue" className="max-w-md">
      <p className="inline-block font-bold p-0 m-0 mb-2 pt-1 text-primary-500">
        {task.schedule
          ? `${format(new Date(task.schedule.start), 'HH:mm')} - ${format(
              new Date(task.schedule.end),
              'HH:mm'
            )}`
          : ``}
      </p>
      <div
        className="p-2 rounded shadow hover:shadow-lg"
        style={{
          backgroundColor: taskCategoryColor ? taskCategoryColor.bgColor : '',
          borderLeft: '2px solid',
          borderLeftColor: taskCategoryColor ? taskCategoryColor.color : '',
        }}
      >
        <div className="">
          <Title
            level={5}
            style={{
              color: taskCategoryColor ? taskCategoryColor.color : '',
            }}
          >
            {task.title}
          </Title>
        </div>

        {/* <Paragraph>{task.description}</Paragraph> */}

        {task.category && (
          <Tag color={task.category.colorName}>{task.category.name}</Tag>
        )}

        <div className="pt-4">
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

TimelineItem.defaultProps = {};

TimelineItem.propTypes = {
  task: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TimelineItem;
