import PropTypes from 'prop-types';
import { MinusCircleOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { List, Avatar, Button, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { projectMembersSelector } from '@app/selectors';

const UsersComponent = ({ memberIds, invitees, removeInvitation }) => {
  const members = useSelector(projectMembersSelector);

  return (
    <>
      {invitees && invitees.length > 0 && (
        <List
          dataSource={invitees}
          renderItem={(data) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={data.image && data.image.thumbnail} />}
                title={data.email}
                description="Invitation"
              />
              <Button
                type="text"
                danger
                onClick={() => removeInvitation(data._id)}
              >
                <Tooltip title="Remove">
                  <MinusCircleOutlined size="large" />
                </Tooltip>
              </Button>
            </List.Item>
          )}
        />
      )}
      <List
        dataSource={memberIds}
        renderItem={(memberId) => {
          const user = members[memberId] || {};

          return (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={user.image && user.image.thumbnail} />}
                title={user.fullName}
                description="Member"
              />
              <CheckCircleTwoTone />
              <Button
                type="text"
                danger
                onClick={() => removeInvitation(memberId)}
              >
                <Tooltip title="Remove">
                  <MinusCircleOutlined size="large" />
                </Tooltip>
              </Button>
            </List.Item>
          );
        }}
      />
    </>
  );
};

UsersComponent.propTypes = {
  members: PropTypes.arrayOf(PropTypes.any).isRequired,
  invitees: PropTypes.arrayOf(PropTypes.any).isRequired,
  removeInvitation: PropTypes.func.isRequired,
};

export default UsersComponent;
