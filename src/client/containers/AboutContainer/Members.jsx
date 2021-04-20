import PropTypes from 'prop-types';
import { Avatar, Tooltip } from 'antd';

const Members = ({ users }) => (
  <div className="flex flex-wrap items-center">
    <Avatar.Group
      size="small"
      maxCount={5}
      maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
    >
      {users &&
        users.length > 0 &&
        users.map((user) => {
          if (
            user.image &&
            user.image.thumbnail &&
            user.image.thumbnail.length
          ) {
            return (
              <Tooltip key={user._id} title={user.fullName} placement="top">
                <Avatar src={user.image.thumbnail} />
              </Tooltip>
            );
          }

          return (
            <Tooltip key={user._id} title={user.fullName} placement="top">
              <Avatar
                className="uppercase"
                style={{ backgroundColor: '#f56a00' }}
              >
                {user.fullName ? user.fullName[0] : user.email[0]}
              </Avatar>
            </Tooltip>
          );
        })}
    </Avatar.Group>
  </div>
);

Members.propTypes = {
  users: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default Members;
