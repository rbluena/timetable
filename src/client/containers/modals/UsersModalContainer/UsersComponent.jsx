import PropTypes from 'prop-types';
import { MinusCircleOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { List, Avatar, Button, Tooltip } from 'antd';

const UsersComponent = ({
  members,
  invitees,
  removeUserFromGroup,
  isUserOwner,
}) => (
  <>
    {isUserOwner && invitees && invitees.length > 0 && (
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
              onClick={() => removeUserFromGroup(data._id, 'invite')}
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
      dataSource={members}
      renderItem={(user) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={user.image && user.image.thumbnail} />}
            title={user.fullName ? user.fullName : user.userName}
            description="Member"
          />
          {/* <CheckCircleTwoTone /> */}
          {isUserOwner && (
            <Button
              type="text"
              danger
              onClick={() => removeUserFromGroup(user._id, 'member')}
            >
              <Tooltip title="Remove">
                <MinusCircleOutlined size="large" />
              </Tooltip>
            </Button>
          )}
        </List.Item>
      )}
    />
  </>
);

UsersComponent.defaultProps = {
  isUserOwner: false,
};

UsersComponent.propTypes = {
  isUserOwner: PropTypes.bool,
  members: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  invitees: PropTypes.arrayOf(PropTypes.any).isRequired,
  removeUserFromGroup: PropTypes.func.isRequired,
};

export default UsersComponent;
