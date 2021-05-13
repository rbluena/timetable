import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { get, upperFirst } from 'lodash';

import { Button, Radio, Tooltip } from 'antd';
import {
  BarsOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
} from '@ant-design/icons';

import {
  projectCategoriesSelector,
  isUserProjectMemberSelector,
  isUserProjectOwnerSelector,
} from '@app/selectors';

import { deleteTaskAction, unAssignTaskStatusAction } from '@app/actions';

import View from './View';
import Editing from './Editing';

const Task = ({ isOpen, closeModal, onSubmit, task, assignees }) => {
  const [toggleTab, setToggleTab] = useState('description');
  const projectCategories = useSelector(projectCategoriesSelector);
  const isUserProjectMember = useSelector(isUserProjectMemberSelector);
  const isUserProjectOwner = useSelector(isUserProjectOwnerSelector);
  const dispatch = useDispatch();
  const { query } = useRouter();

  const { users, groups } = assignees;

  const reporter = get(task, 'reporter');
  const categoryId = get(task, 'category');
  const taskCategory = categoryId ? projectCategories[categoryId] : undefined;

  const canUserUpdateTask = isUserProjectMember || isUserProjectOwner;

  function switchingTabs(value) {
    setToggleTab(value);
  }

  /**
   * Cancel button was pressed.
   */
  function cancelEditing() {
    if (!task.new) {
      setToggleTab('description');
    } else {
      closeModal();
    }
  }

  /**
   * Deleting task from server
   */
  function deleteTask() {
    if (canUserUpdateTask) {
      dispatch(deleteTaskAction(query.id, task._id));
      dispatch(
        unAssignTaskStatusAction(task._id, task.status ? task.status._id : null)
      );
      closeModal();
    }
  }

  useEffect(() => {
    // Opening editing form.
    if ((task && task.new) || (task && task.editing)) {
      setToggleTab('editing');
    } else {
      setToggleTab('description');
    }
  }, [task]);

  return (
    <div
      className={`transform transition-all duration-250 bg-white w-full max-w-lg right-0 md:mr-4  top-1 fixed rounded shadow-lg border border-neutral-50 overflow-x-hidden ${
        isOpen
          ? 'opacity-100 translate-x-0'
          : 'invisible opacity-0  translate-x-5'
      }`}
      style={{ height: 'calc(100vh - 20px)', zIndex: 100 }}
    >
      <div className="h-full">
        {/* start: Modal header. */}
        <div className="border-b border-primary-100 bg-neutral-50 w-full flex items-center py-2 px-4">
          <div className="text-neutral-500">
            <h2 className="text-base p-0 m-0">Task</h2>
            <p className="text-xs p-0 m-0 uppercase">{upperFirst(toggleTab)}</p>
          </div>
          <Button
            type="danger"
            ghost
            icon={<CloseOutlined />}
            className="ml-auto"
            onClick={closeModal}
          />
        </div>
        {/* end; Modal header. */}

        {/* start: Content */}
        {toggleTab === 'description' && (
          <View reporter={reporter} task={task} taskCategory={taskCategory} />
        )}

        {toggleTab === 'editing' && (
          <Editing
            task={task}
            categories={projectCategories}
            users={users}
            groups={groups}
            cancelEditing={cancelEditing}
            onSubmit={onSubmit}
          />
        )}

        {/* start: Footer */}
        {toggleTab !== 'editing' && (
          <div className="fixed bottom-0 bg-neutral-50 border-t border-primary-100 w-full p-2 px-4">
            <div className="flex items-center ">
              {/* start: Footer left icons. */}
              <div>
                <Radio.Group
                  defaultValue="description"
                  value={toggleTab}
                  onChange={(evt) => switchingTabs(evt.target.value)}
                  optionType="button"
                  buttonStyle="solid"
                >
                  <Tooltip title="Task details">
                    <Radio.Button value="description">
                      <FileOutlined />
                    </Radio.Button>
                  </Tooltip>
                  <Tooltip title="Checklist">
                    <Radio.Button value="checklist">
                      <BarsOutlined />
                    </Radio.Button>
                  </Tooltip>
                  {/* <Tooltip title="Comments">
                    <Radio.Button value="comments">
                      <CommentOutlined />
                    </Radio.Button>
                  </Tooltip> */}
                </Radio.Group>
              </div>
              {/* end: Left footer icons. */}

              {/* start: Edit and Delete icons. */}
              {canUserUpdateTask && (
                <div className="ml-auto">
                  <Tooltip title="Edit task">
                    <Button
                      type="primary"
                      ghost
                      icon={<EditOutlined />}
                      onClick={() => setToggleTab('editing')}
                    />
                  </Tooltip>
                  &nbsp;
                  <Tooltip title="Delete task">
                    <Button
                      type="danger"
                      ghost
                      icon={<DeleteOutlined />}
                      onClick={deleteTask}
                    />
                  </Tooltip>
                </div>
              )}
              {/* end: Edit and Delete icons. */}
            </div>
          </div>
        )}
        {/* end: Footer */}
      </div>
    </div>
  );
};

Task.defaultProps = {
  assignees: {},
  task: undefined,
};

Task.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  assignees: PropTypes.objectOf(PropTypes.any),
  task: PropTypes.objectOf(PropTypes.any),
};

export default Task;
