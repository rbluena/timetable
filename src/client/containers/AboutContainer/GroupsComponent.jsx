import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Button, Tag, Form, Input } from 'antd';
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

  function deleteGroup(groupId) {
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

      <div className="pl-4">
        {groupsKeys &&
          groupsKeys.length &&
          groupsKeys.map((key) => {
            const group = groups[key];

            return (
              <div key={key} className="py-3">
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

                <div className="py-2">
                  <Button size="small" type="primary" ghost>
                    View
                  </Button>
                </div>
              </div>
            );
          })}
      </div>

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
    </div>
  );
};

GroupsComponent.defaultProps = {
  groups: undefined,
};

GroupsComponent.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.string),
};

export default GroupsComponent;
