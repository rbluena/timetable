import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Button, Tag, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import {
  addProjectGroupAction,
  updateProjectGroupAction,
  deleteProjectGroupAction,
} from '@app/actions';

import Members from './Members';

const { Title, Text } = Typography;

const GroupsComponent = ({
  updateProject,
  title,
  groupsKeys,
  groups,
  projectId,
}) => {
  const [showGroupInput, setShowGroupInput] = useState(false);
  const dispatch = useDispatch();

  function addGroupHandler(data) {
    dispatch(addProjectGroupAction(projectId, data));
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

  return (
    <div className="py-6">
      <Title
        level={4}
        type="secondary"
        editable={{
          onChange: (value) => updateProject('settings.groups.name', value),
        }}
      >
        {title}
      </Title>

      {/* start: Rendering a new group. */}
      <div className="pl-4">
        {groupsKeys &&
          groupsKeys.length > 0 &&
          groupsKeys.map((key) => {
            const group = groups[key];

            return (
              <div key={key} className="py-3 max-w-sm">
                <Title
                  level={5}
                  className=" text-primary-400"
                  editable={{
                    onChange: (value) =>
                      updateGroup(group._id, { name: value }),
                  }}
                >
                  {group.name}
                </Title>
                <Text
                  type="secondary"
                  editable={{
                    onChange: (value) =>
                      updateGroup(group._id, { description: value }),
                  }}
                >
                  {group.description ? group.description : 'Add description'}
                </Text>

                <div>
                  <Members users={[]} />
                </div>

                <div className="py-2 flex flex-row">
                  <Button size="small" type="primary" ghost>
                    View
                  </Button>
                  <Button
                    type="text"
                    size="small"
                    ghost
                    danger
                    className="ml-auto"
                    onClick={() => deleteGroupHandler(group._id)}
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
      {/* end: Rendering a new group. */}

      {/* start: Adding a new group */}
      <div className="py-4">
        {showGroupInput && (
          <Input
            size="sm"
            placeholder="Group name"
            onBlur={(evt) => addGroupHandler({ name: evt.target.value })}
            onPressEnter={(evt) => addGroupHandler({ name: evt.target.value })}
            style={{ width: 200 }}
          />
        )}
        {!showGroupInput && (
          <Tag onClick={showGroupInputHandler}>New group</Tag>
        )}
      </div>
      {/* end: Adding a new group */}
    </div>
  );
};

GroupsComponent.defaultProps = {
  groups: undefined,
  groupsKeys: undefined,
};

GroupsComponent.propTypes = {
  groups: PropTypes.objectOf(PropTypes.any),
  updateProject: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  groupsKeys: PropTypes.arrayOf(PropTypes.string),
};

export default GroupsComponent;