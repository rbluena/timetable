import { Timeline, Button, Typography, Avatar, Tooltip } from 'antd';
import PropTypes from 'prop-types';
// import { TimeTicker } from '@app/components';

const { Paragraph, Title } = Typography;

const TimelineItem = ({ task }) => (
  <Timeline.Item color="blue">
    <p className="text-primary-500 text-sm font-bold p-0 m-0">
      {task.startTime} - {task.endTime}
    </p>
    <Title level={5}>{task.title}</Title>
    <Paragraph type="secondary">{task.description}</Paragraph>

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
      <Button type="primary" size="small" ghost>
        Details
      </Button>
      &nbsp;
      <div className="p-0">
        <Button className="flex items-end" size="small">
          Edit
        </Button>
        &nbsp;
        <Button type="primary" className="flex items-end" size="small" danger>
          Delete
        </Button>
      </div>
    </div>
  </Timeline.Item>
);

TimelineItem.propTypes = {
  task: PropTypes.objectOf(PropTypes).isRequired,
};

export default TimelineItem;
