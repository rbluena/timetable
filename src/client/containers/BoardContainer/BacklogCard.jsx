import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd';
import { Tag, Avatar, Tooltip } from 'antd';
import { format } from 'date-fns';


const BacklogCard = ({ index, draggableId, task, categories, userAssignees, groupAssignees }) => {
  const taskCategory = categories[task.category];
  const { userAssignees: userIds, groupAssignees: groupIds } = task;

  return (
  <Draggable draggableId={draggableId} index={index}>
    {(provided) => (
      <div
        className="bg-white p-2 shadow rounded m-1 my-2 relative cursor-pointer"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <p className="">{task.title}</p>
        {
          userIds && userIds.length > 0 &&
          userIds.map(userId => {
            const user = userAssignees[userId];

            return(
            <Avatar.Group size="small">
              <Tooltip title="Rabii Luena" placement="top">
                <Avatar src="" style={{ backgroundColor: '#f56a00' }}>
                  <span className="uppercase">{user.fullName ? user.fullName[0] : user.email[0]}</span>
                </Avatar>
              </Tooltip>
            </Avatar.Group>
            )})
        }

        {
          groupIds && groupIds.length > 0 && groupIds.map(groupId => {
            const group = groupAssignees[groupId];

            return(
              <span className="block font-bold text-xs py-1">{group.name}</span>
            )
          })
        }

        <div className="flex items-start">
        {
          taskCategory &&
          <Tag color={taskCategory.colorName}>{taskCategory.name}</Tag>
        }
          <div className="ml-auto text-xs font-bold text-neutral-400 block mt-1">
            {task.schedule && format(new Date(task.schedule.start), 'MMM dd')}
          </div>
        </div>
      </div>
    )}
  </Draggable>
)

}


BacklogCard.defaultProps = {
  backlog: {},
  categories: {},
  userAssignees: {},
  groupAssignees: {}
}

BacklogCard.propTypes = {
  index: PropTypes.number.isRequired,
  draggableId: PropTypes.string.isRequired,
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  backlog: PropTypes.objectOf(PropTypes.any),
  backlogIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.objectOf(PropTypes.any),
  userAssignees: PropTypes.objectOf(PropTypes.any),
  groupAssignees: PropTypes.objectOf(PropTypes.any)
}

export default BacklogCard;
