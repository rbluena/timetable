import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { get } from 'lodash';

import { Button, Radio, Tooltip } from 'antd';
import {
  BarsOutlined,
  CloseOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
} from '@ant-design/icons';

import { projectCategoriesSelector } from '@app/selectors';
import { deleteTaskAction } from '@app/actions';

import View from './View';
import Editing from './Editing';

const Task = ({ isOpen, closeModal, onSubmit, task, assignees }) => {
  const [toggleTab, setToggleTab] = useState('view');
  const projectCategories = useSelector(projectCategoriesSelector);
  const dispatch = useDispatch();
  const { query } = useRouter();

  const { users, groups } = assignees;

  const reporter = get(task, 'reporter');
  const categoryId = get(task, 'category');
  const taskCategory = categoryId ? projectCategories[categoryId] : undefined;

  function switchingTabs(value) {
    setToggleTab(value);
  }

  /**
   * Cancel button was pressed.
   */
  function cancelEditing() {
    if (!task.new) {
      setToggleTab('view');
    } else {
      closeModal();
    }
  }

  /**
   * Deleting task from server
   */
  function deleteTask() {
    dispatch(deleteTaskAction(query.id, task._id));
    closeModal();
  }

  useEffect(() => {
    // Opening editing form.
    if ((task && task.new) || (task && task.editing)) {
      setToggleTab('editing');
    } else {
      setToggleTab('view');
    }
  }, [task]);

  return (
    <div
      className={`transform transition-all duration-250 bg-white w-full max-w-lg right-0 md:mr-4  top-1 fixed rounded shadow-lg border border-neutral-50 overflow-x-hidden ${
        isOpen
          ? 'opacity-100 translate-x-0'
          : 'invisible opacity-0  translate-x-5'
      }`}
      style={{ height: 'calc(100vh - 20px)', zIndex: '1000' }}
    >
      <div className="h-full">
        {/* start: Modal heading. */}
        <div className="bg-neutral-50 border-b border-primary-100 w-full flex items-start py-1 px-4">
          <h2 className="text-lg text-neutral-500">Task</h2>
          <Button
            type="danger"
            ghost
            icon={<CloseOutlined />}
            size="small"
            className="ml-auto"
            onClick={closeModal}
          />
        </div>
        {/* end; Modal heading. */}

        {/* start: Content */}
        {toggleTab === 'view' && (
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
          <div className="fixed bottom-0 bg-neutral-50 border-t border-primary-100 w-full p-4">
            <div className="flex items-center ">
              {/* start: Footer left icons. */}
              <div>
                <Radio.Group
                  defaultValue="view"
                  value={toggleTab}
                  onChange={(evt) => switchingTabs(evt.target.value)}
                  optionType="button"
                  buttonStyle="solid"
                >
                  <Tooltip title="Task details">
                    <Radio.Button value="view">
                      <FileOutlined />
                    </Radio.Button>
                  </Tooltip>
                  <Tooltip title="Todo">
                    <Radio.Button value="todo">
                      <BarsOutlined />
                    </Radio.Button>
                  </Tooltip>
                  <Tooltip title="Comments">
                    <Radio.Button value="comments">
                      <CommentOutlined />
                    </Radio.Button>
                  </Tooltip>
                </Radio.Group>
              </div>
              {/* end: Left footer icons. */}

              {/* start: Edit and Delete icons. */}
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
