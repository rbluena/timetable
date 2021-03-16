import PropTypes from 'prop-types';
import { MinusCircleOutlined } from '@ant-design/icons';
import { List, Avatar, Button, Tooltip } from 'antd';

const UsersComponent = ({ members, invitees, removeInvitation }) => (
  <>
    {invitees && invitees.length > 0 && (
      <List
        dataSource={invitees}
        renderItem={(data) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={data.image && data.image.thumbnail} />}
              title={data.email}
              description="Invited"
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
      dataSource={members}
      renderItem={(data) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={data.image.thumbnail} />}
            title={data.fullName}
            // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  </>
);

UsersComponent.propTypes = {
  members: PropTypes.arrayOf(PropTypes.any).isRequired,
  invitees: PropTypes.arrayOf(PropTypes.any).isRequired,
  removeInvitation: PropTypes.func.isRequired,
};

export default UsersComponent;
