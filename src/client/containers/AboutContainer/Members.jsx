import PropTypes from 'prop-types';
import { Avatar, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { projectMembersSelector } from '@app/selectors';

const Members = ({ userIds }) => {
  const users = useSelector(projectMembersSelector);

  return (
    <div className="flex flex-wrap items-center">
      <Avatar.Group
        size="small"
        maxCount={5}
        maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
      >
        {userIds &&
          userIds.length > 0 &&
          userIds.map((userId) => {
            const user = users[userId] || {};

            if (
              user.image &&
              user.image.thumbnail &&
              user.image.thumbnail.length
            ) {
              return (
                <Tooltip title={user.fullName} placement="top">
                  <Avatar src={user.image.thumbnail} />
                </Tooltip>
              );
            }

            return (
              <Tooltip title={user.fullName} placement="top">
                <Avatar style={{ backgroundColor: '#f56a00' }}>
                  {user.fullName
                    ? user.fullName[0]
                    : user.email[0].toUpperCase()}
                </Avatar>
              </Tooltip>
            );
          })}
      </Avatar.Group>
    </div>
  );
};

Members.propTypes = {
  userIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Members;
