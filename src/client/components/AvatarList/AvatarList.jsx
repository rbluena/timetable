import PropTypes from 'prop-types';
import { Avatar } from '@app/components';

function AvatarList({ size, images }) {
  return (
    <div className="flex overflow-hidden">
      {images.map((item, idx) => {
        const key = `avatar-${idx}`;

        return (
          <Avatar
            key={key}
            initials={item.initials}
            src={item.src}
            size={size}
            alt="avatar"
            className={`${idx !== 0 ? '-ml-4' : ''}`}
          />
        );
      })}
    </div>
  );
}

AvatarList.defaultProps = {
  size: 'md',
  images: [],
};

AvatarList.propTypes = {
  size: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.object),
};

export default AvatarList;
