import { Typography, Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();

  function addGroup(data) {
    dispatch(addProjectGroupAction(projectId, data));
  }

  function updateGroup(groupId, data) {
    dispatch(updateProjectGroupAction(projectId, groupId, data));
  }

  function deleteGroup(groupId) {
    dispatch(deleteProjectGroupAction(projectId, groupId));
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
              <div key={key}>
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
                  {group.description}
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
