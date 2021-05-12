import PropTypes from 'prop-types';
import { Typography, Tag, Avatar } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { Editor } from '@app/components';

const { Title, Paragraph } = Typography;

const View = ({ task, taskCategory, reporter }) => (
  <div
    className="overflow-y-auto px-6 pt-3"
    style={{ height: 'calc(100vh - 135px)' }}
  >
    <div className="flex flex-col justify-between min-h-full">
      <div>
        <span className="text-neutral-400 text-xs mb-1 inline-block">
          {task && task.date && format(new Date(task.date), 'EEE dd, MMM yyyy')}
        </span>
        <Title level={3}>{task && task.title}</Title>

        {/* start: Task category */}
        <div>
          {taskCategory && (
            <Tag color={taskCategory.colorName}>{taskCategory.name}</Tag>
          )}
        </div>
        {/* end: Task category */}

        {/* start: Task's description. */}
        {task && <Editor defaultValue={task.description} readOnly />}
        {/* End: Task's description . */}
      </div>

      {/* start: Assignees */}
      <div className="pb-2">
        <div className="">
          <Paragraph>
            <span className="inline-block text-primary-500 font-bold">
              Assignees:
            </span>
          </Paragraph>

          {/* start: Assignees */}
          <ul className="space-y-2">
            {task &&
              task.groupAssignees &&
              task.groupAssignees.length > 0 &&
              task.groupAssignees.map((group) => (
                <li key={group._id} className="flex items-center">
                  <Avatar size="small">
                    <TeamOutlined />
                  </Avatar>
                  <span className="text-sm font-normal inline-block pl-3">
                    {group.name}
                  </span>
                </li>
              ))}

            {task &&
              task.userAssignees &&
              task.userAssignees.length > 0 &&
              task.userAssignees.map((user) => (
                <li key={user._id} className="flex items-center">
                  <Avatar
                    src={user.image && user.image.thumbnail}
                    size="small"
                    style={{ backgroundColor: '#f56a00' }}
                  >
                    <span className="uppercase">
                      {user && user.fullName
                        ? user.fullName[0]
                        : user && user.username[0]}
                    </span>
                  </Avatar>
                  <span className="font-normal inline-block pl-3">
                    {user.fullName
                      ? user.fullName.split(' ')[0]
                      : user.username}
                  </span>
                </li>
              ))}
          </ul>
          {/* end: Assignees */}
        </div>
        {/* end: Assignees */}

        {/* start: Reporter */}
        {reporter && (
          <div>
            <Paragraph>
              <span className="inline-block text-primary-500 font-bold">
                Reporter:
              </span>
            </Paragraph>

            <div className="flex items-center">
              <Avatar
                src={reporter.image && reporter.image.thumbnail}
                size="small"
                style={{ backgroundColor: '#f56a00' }}
              >
                <span className="uppercase">
                  {reporter && reporter.fullName
                    ? reporter.fullName[0]
                    : reporter.username[0]}
                </span>
              </Avatar>
              <span className="font-normal inline-block pl-3">
                {reporter.fullName
                  ? reporter.fullName.split(' ')[0]
                  : reporter.username}
              </span>
            </div>
          </div>
        )}
        {/* end: Reporter */}
      </div>
    </div>
  </div>
);

View.defaultProps = {
  task: undefined,
  taskCategory: undefined,
  reporter: undefined,
};

View.propTypes = {
  task: PropTypes.objectOf(PropTypes.any),
  taskCategory: PropTypes.objectOf(PropTypes.any),
  reporter: PropTypes.objectOf(PropTypes.any),
};

export default View;
