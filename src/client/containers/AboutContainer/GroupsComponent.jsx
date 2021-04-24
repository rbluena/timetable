import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Button, Tag, Input, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import {
  DeleteOutlined,
  PlusCircleTwoTone,
  TeamOutlined,
} from '@ant-design/icons';
import {
  addProjectGroupAction,
  updateProjectGroupAction,
  deleteProjectGroupAction,
} from '@app/actions';

import Members from './Members';

const { Title, Text } = Typography;

const GroupsComponent = ({
  setModalGroupId,
  openGroupModal,
  updateProject,
  title,
  groups,
  projectId,
  isUserOwner,
}) => {
  const [showGroupInput, setShowGroupInput] = useState(false);
  const dispatch = useDispatch();

  function addGroupHandler(data) {
    if (data.name && data.name.length > 0) {
      const newData = { ...data };
      dispatch(addProjectGroupAction(projectId, newData));
    }
    setShowGroupInput(false);
  }

  function updateGroup(groupId, data) {
    dispatch(updateProjectGroupAction(projectId, groupId, data));
  }

  function deleteGroupHandler(groupId) {
    dispatch(deleteProjectGroupAction(projectId, groupId));
  }

  function showGroupInputHandler() {
    setShowGroupInput(true);
  }

  function openModal(groupId) {
    setModalGroupId(groupId);
    openGroupModal(true);
  }

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <Title
        level={5}
        type="danger"
        editable={
          isUserOwner
            ? {
                onChange: (value) =>
                  updateProject('settings.groups.name', value),
              }
            : false
        }
      >
        <span className="text-neutral-500">{title}</span>
      </Title>

      {/* start: Rendering a new group. */}
      <div className="pl-2 divide-y divide-neutral-200 border-t border-neutral-200">
        {groups &&
          groups.length > 0 &&
          groups.map((group) => (
            <div key={group._id} className="py-3">
              <Title
                level={5}
                className=" text-primary-400"
                editable={
                  isUserOwner
                    ? {
                        onChange: (value) =>
                          updateGroup(group._id, { name: value }),
                      }
                    : false
                }
              >
                {group.name}
              </Title>

              <Text
                type="secondary"
                editable={
                  isUserOwner
                    ? {
                        onChange: (value) =>
                          updateGroup(group._id, { description: value }),
                      }
                    : false
                }
              >
                {group.description ? (
                  group.description
                ) : (
                  <span className="text-xs text-neutral-400">
                    {isUserOwner ? 'Add description' : null}
                  </span>
                )}
              </Text>

              <div className="py-2">
                <Members users={group.members || []} />
              </div>

              <div className="py-1 flex flex-row bg-neutral-100">
                <Button
                  size="small"
                  type="link"
                  onClick={() => openModal(group._id)}
                >
                  <span>
                    <TeamOutlined />
                    &nbsp; Members
                  </span>
                </Button>

                {/* start: Button to delete group */}
                {isUserOwner && (
                  <Tooltip title="Delete group">
                    <Button
                      type="text"
                      size="small"
                      danger
                      className="ml-auto"
                      onClick={() => deleteGroupHandler(group._id)}
                    >
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>
                )}
                {/* end: Button to delete group */}
              </div>
            </div>
          ))}
      </div>
      {/* end: Rendering a new group. */}

      {/* start: Adding a new group */}
      {isUserOwner && (
        <div className="py-4">
          {showGroupInput && (
            <Input
              size="sm"
              placeholder="Group name"
              onBlur={(evt) => addGroupHandler({ name: evt.target.value })}
              onPressEnter={(evt) =>
                addGroupHandler({ name: evt.target.value })
              }
              style={{ width: 200 }}
            />
          )}
          {!showGroupInput && (
            <Tag onClick={showGroupInputHandler} icon={<PlusCircleTwoTone />}>
              New group
            </Tag>
          )}
        </div>
      )}
      {/* end: Adding a new group */}
    </div>
  );
};

GroupsComponent.defaultProps = {
  groups: undefined,
  isUserOwner: false,
};

GroupsComponent.propTypes = {
  groups: PropTypes.objectOf(PropTypes.any),
  updateProject: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  setModalGroupId: PropTypes.func.isRequired,
  openGroupModal: PropTypes.func.isRequired,
  isUserOwner: PropTypes.bool,
};

export default GroupsComponent;
