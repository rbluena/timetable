import PropTypes from 'prop-types';
import { Avatar, Tooltip } from 'antd';
// import { AvatarList } from '@app/components';

const Members = ({ users }) => (
  <div className="flex flex-wrap items-center">
    <Avatar.Group
      // size="small"
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
              <Tooltip title={user.name} placement="top">
                <Avatar src={user.image.thumbnail} />
              </Tooltip>
            );
          }

          return (
            <Tooltip title={user.name} placement="top">
              <Avatar style={{ backgroundColor: '#f56a00' }}>
                {user.name[0]}
              </Avatar>
            </Tooltip>
          );
        })}
    </Avatar.Group>
  </div>
);

Members.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Members;
