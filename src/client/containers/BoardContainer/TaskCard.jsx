import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { Tag, Avatar, Tooltip, Button } from 'antd';
import {
  UsergroupAddOutlined,
  ClockCircleTwoTone,
  ExpandAltOutlined,
} from '@ant-design/icons';
import { format } from 'date-fns';

const BacklogCard = ({
  index,
  draggableId,
  task,
  categories,
  userAssignees,
  groupAssignees,
}) => {
  const taskCategory = categories[task.category];
  const { userAssignees: userIds, groupAssignees: groupIds } = task;

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          className="bg-white p-2 shadow-sm rounded-sm m-1 my-2 relative cursor-pointer"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex">
            <p className="font-normal">{task.title}</p>
            <Button className="ml-auto" size="small">
              <ExpandAltOutlined />
            </Button>
          </div>

          {taskCategory && (
            <Tag color={taskCategory.colorName}>{taskCategory.name}</Tag>
          )}

          <div className="flex items-end">
            <span className="text-xs font-bold text-neutral-400 inline-block my-1 p-1 bg-neutral-100 border border-primary-100">
              <ClockCircleTwoTone />
              &nbsp;
              {task.schedule && format(new Date(task.schedule.start), 'MMM dd')}
            </span>

            <div className="ml-auto">
              <Avatar.Group size="small" maxCount={4}>
                {userIds &&
                  userIds.length > 0 &&
                  userIds.map((userId) => {
                    const user = userAssignees[userId];

                    return (
                      <Tooltip title={user.fullName || ''} placement="top">
                        <Avatar src="" style={{ backgroundColor: '#f56a00' }}>
                          <span className="uppercase">
                            {user && user.fullName
                              ? user.fullName[0]
                              : user && user.email[0]}
                          </span>
                        </Avatar>
                      </Tooltip>
                    );
                  })}

                {/* Groups assigned */}
                {groupIds &&
                  groupIds.length > 0 &&
                  groupIds.map((groupId) => {
                    const group = groupAssignees[groupId];

                    return (
                      <Tooltip title={group.name} placement="top">
                        <Avatar size="small">
                          <UsergroupAddOutlined />
                        </Avatar>
                      </Tooltip>
                    );
                  })}
                {/* end: Groups assigned */}
              </Avatar.Group>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

BacklogCard.defaultProps = {
  backlog: {},
  categories: {},
  userAssignees: {},
  groupAssignees: {},
};

BacklogCard.propTypes = {
  index: PropTypes.number.isRequired,
  draggableId: PropTypes.string.isRequired,
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  backlog: PropTypes.objectOf(PropTypes.any),
  backlogIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.objectOf(PropTypes.any),
  userAssignees: PropTypes.objectOf(PropTypes.any),
  groupAssignees: PropTypes.objectOf(PropTypes.any),
};

export default BacklogCard;
