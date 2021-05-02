import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { Tag, Avatar, Tooltip, Button } from 'antd';
import {
  TeamOutlined,
  ClockCircleTwoTone,
  ExpandAltOutlined,
} from '@ant-design/icons';
import { format } from 'date-fns';

const TaskCard = ({
  canUserUpdateTask,
  index,
  draggableId,
  task,
  categories,
  openTaskDrawer,
}) => {
  const taskCategory = categories[task.category];
  const { userAssignees, groupAssignees } = task;

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          isDragDisabled={!canUserUpdateTask}
          className="bg-white p-2 shadow-sm rounded-sm m-1 my-2 relative cursor-pointer"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // style={{ width: '256px' }}
        >
          <div className="flex">
            <p className="font-normal">{task.title}</p>
            <Button
              className="ml-auto"
              size="small"
              onClick={() => openTaskDrawer(task._id)}
            >
              <ExpandAltOutlined />
            </Button>
          </div>

          {taskCategory && (
            <Tag color={taskCategory.colorName}>{taskCategory.name}</Tag>
          )}

          <div className="flex items-end">
            <span className="text-xs font-bold text-neutral-400 inline-block my-1 px-1 bg-neutral-100 border border-primary-100">
              <ClockCircleTwoTone />
              &nbsp;
              {task.date && format(new Date(task.date), 'MMM dd')}
            </span>

            <div className="ml-auto">
              <Avatar.Group size="small" maxCount={4}>
                {/* start: user assignees */}
                {userAssignees &&
                  userAssignees.length > 0 &&
                  userAssignees.map((user) => {
                    if (
                      user.image &&
                      user.image.thumbnail &&
                      user.image.thumbnail.length
                    ) {
                      return (
                        <Tooltip title={user.fullName}>
                          <Avatar src={user.image.thumbnail} />
                        </Tooltip>
                      );
                    }
                    return (
                      <Tooltip title={user.fullName}>
                        <Avatar style={{ backgroundColor: '#f56a00' }}>
                          {user && user.fullName
                            ? user.fullName[0]
                            : user.email[0]}
                        </Avatar>
                      </Tooltip>
                    );
                  })}
                {/* end: User assignees */}

                {/* Groups assigned */}
                {groupAssignees &&
                  groupAssignees.length > 0 &&
                  groupAssignees.map((group) => (
                    <Tooltip title={group && group.name} placement="top">
                      <Avatar size="small">
                        <TeamOutlined />
                      </Avatar>
                    </Tooltip>
                  ))}
                {/* end: Groups assigned */}
              </Avatar.Group>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

TaskCard.defaultProps = {
  canUserUpdateTask: false,
  backlog: {},
  categories: {},
  userAssignees: {},
  groupAssignees: {},
};

TaskCard.propTypes = {
  canUserUpdateTask: PropTypes.bool,
  index: PropTypes.number.isRequired,
  draggableId: PropTypes.string.isRequired,
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  backlog: PropTypes.objectOf(PropTypes.any),
  backlogIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.objectOf(PropTypes.any),
  userAssignees: PropTypes.objectOf(PropTypes.any),
  groupAssignees: PropTypes.objectOf(PropTypes.any),
};

export default TaskCard;
