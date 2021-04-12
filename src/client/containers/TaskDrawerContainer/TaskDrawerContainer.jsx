import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Avatar, Tag, Radio } from 'antd';
import { format } from 'date-fns';
import { isEmpty, get } from 'lodash';
import {
  TeamOutlined,
  CommentOutlined,
  // BarsOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import {
  globalStateSelector,
  getOpenedTaskSelector,
  projectCategoriesSelector,
} from '@app/selectors';
import { setOpenedTaskAction, closeDrawerAction } from '@app/actions';
import { Drawer } from '@app/components';
// import TaskComments from './TaskComments';

// import { setOpenedTaskAction, closeDrawerAction } from '@app/actions';

const { Title } = Typography;

const TaskDrawerContainer = () => {
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [toggleTab, setToggleTab] = useState('description');
  const { drawer } = useSelector(globalStateSelector);
  const task = useSelector(getOpenedTaskSelector);
  const projectCategories = useSelector(projectCategoriesSelector);
  const dispatch = useDispatch();
  const isOpen = drawer === 'task';

  /**
   *
   */
  function onClose() {
    dispatch(closeDrawerAction());
    dispatch(setOpenedTaskAction(null));
  }

  function switchingTabs(value) {
    if (value === 'comments' && !commentsLoaded) {
      // TODO: LOAD TASK COMMENTS
      setCommentsLoaded(true);
    }

    setToggleTab(value);
  }

  const reporter = get(task, 'reporter');
  const categoryId = get(task, 'category');
  const taskCategory = categoryId ? projectCategories[categoryId] : undefined;

  if (!isEmpty(task)) {
    return (
      <Drawer isOpen={isOpen}>
        {/* start: Header */}
        <Drawer.Header onClose={onClose}>
          <div className="pl-2">
            <Title level={5} className="p-0 m-0">
              {task.title}
            </Title>
            <div className="mb-2 border-b border-neutral-200">
              <span className="text-neutral-500 font-semibold">
                {task.date && format(new Date(task.date), 'EEE, MMM dd')}
              </span>
              {task.schedule && (
                <span className="text-sm italic text-neutral-400">
                  &nbsp;&nbsp;
                  {format(new Date(task.schedule.start), 'HH:mm')}&nbsp;-&nbsp;
                  {format(new Date(task.schedule.end), 'HH:mm')}
                </span>
              )}
            </div>

            {/* start: Tabs */}
            <Radio.Group
              defaultValue="description"
              value={toggleTab}
              optionType="button"
              onChange={(evt) => switchingTabs(evt.target.value)}
              // buttonStyle="solid"
            >
              <Radio.Button value="description">
                <FileTextOutlined />
              </Radio.Button>
              <Radio.Button value="comments">
                <CommentOutlined />
              </Radio.Button>
              {/* <Radio.Button value="todo">
                <BarsOutlined />
              </Radio.Button> */}
            </Radio.Group>
            {/* end: Tabs */}
          </div>
        </Drawer.Header>
        {/* end: Header */}

        {/* start: Content */}
        <Drawer.Content>
          {toggleTab === 'description' && (
            <div className="px-4 pl-6 flex-col justify-between h-full">
              {/* <TimeTicker /> */}
              {taskCategory && (
                <Tag color={taskCategory.colorName}>{taskCategory.name}</Tag>
              )}
              {/* start: Description */}
              <div>
                <p className="font-normal text-neutral-900 py-4">
                  {task.description}
                </p>
              </div>
              {/* end: Description */}
              <div>
                {/* start: Assignees */}
                <div className="border-b border-primary-100 mb-2">
                  <p className="text-primary-400 mb-1 font-bold">Assignees:</p>
                  <ul>
                    {task.groupAssignees &&
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
                  </ul>
                  {task.userAssignees && task.userAssignees.length > 0 && (
                    <ul>
                      {task.userAssignees.map((user) => (
                        <li key={user._id} className="flex items-center">
                          <Avatar
                            src={user.image && user.image.thumbnail}
                            size="small"
                            style={{ backgroundColor: '#f56a00' }}
                          >
                            <span className="uppercase">
                              {user && user.fullName
                                ? user.fullName[0]
                                : user && user.email[0]}
                            </span>
                          </Avatar>
                          <span className="font-normal inline-block pl-3">
                            {user.fullName ? user.fullName : user.email}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* end: End of assignees */}

                {/* start:  reporter */}
                <div>
                  {task.reporter && (
                    <div>
                      <p className=" text-primary-400 font-bold mb-1 p-0">
                        Reporter:
                      </p>
                      <div className="flex items-center">
                        <Avatar
                          src={reporter.image && reporter.image.thumbnail}
                          size="small"
                          style={{ backgroundColor: '#f56a00' }}
                        >
                          <span className="uppercase">
                            {reporter && reporter.fullName
                              ? reporter.fullName[0]
                              : reporter && reporter.email[0]}
                          </span>
                        </Avatar>
                        <span className="font-normal inline-block pl-3">
                          {reporter.fullName
                            ? reporter.fullName
                            : reporter.email}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                {/* end:  reporter */}
              </div>
            </div>
          )}

          {toggleTab === 'comments' && (
            {/** <TaskComments comments={[]} /> */
          )}
        </Drawer.Content>
        {/* end: Content */}
      </Drawer>
    );
  }

  return null;
};

export default TaskDrawerContainer;
