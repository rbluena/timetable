import PropTypes from 'prop-types';
import { Avatar } from '@app/components';

function AvatarList({ size, images = [] }) {
  return (
    <div className="flex overflow-hidden">
      {images.map((item, idx) => (
        <Avatar
          initials={item.initials}
          src={item.src}
          size={size}
          className={`${idx !== 0 ? '-ml-4' : ''}`}
        />
      ))}
    </div>
  );
}

AvatarList.defaultProps = {
  size: 'md',
};

AvatarList.propTypes = {
  size: PropTypes.string,
};

export default AvatarList;
