import PropTypes from 'prop-types';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { decode } from 'html-entities';
import { format } from 'date-fns';

const AnnouncementMessage = ({ message, isUserOwner, deleteMessage }) => {
  const { recepient, creator, body, isCurrentUserAuthor } = message;

  return (
    <div className="pt-3 text-sm font-light">
      <div className="flex items-center">
        {!message.hasUserSeenIt ? (
          <span className="font-semibold italic">
            to:&nbsp;{recepient.name}{' '}
          </span>
        ) : (
          <span className="font-semibold">to:&nbsp;{recepient.name} </span>
        )}
        &nbsp;
        {/* {!message.hasUserSeenIt && <Badge color="magenta" dot />} */}
      </div>

      <div
        className="pt-1"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: decode(body) }}
      />

      <div className="flex py-1 items-end">
        <span className="text-xs text-neutral-400 font-normal">
          {creator.fullName ? creator.fullName : ''} -{' '}
          {format(new Date(message.createdAt), 'MMM dd')}
        </span>
        <div className="flex ml-auto pr-2">
          {/* <Button
            type="primary"
            size="small"
            // className="ml-auto"
            ghost
            onClick={() => deleteGroupHandler('group._id')}
          >
            <PushpinOutlined />
          </Button> */}
          &nbsp;
          {/* <Button
            type="primary"
            size="small"
            ghost
            onClick={() => deleteGroupHandler('group._id')}
          >
            <EditOutlined />
          </Button> */}
          &nbsp;
          {(isUserOwner || isCurrentUserAuthor) && (
            <Button
              type="danger"
              size="small"
              ghost
              onClick={() => deleteMessage(message._id)}
            >
              <DeleteOutlined />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

AnnouncementMessage.defaultProps = {
  isUserOwner: false,
};

AnnouncementMessage.propTypes = {
  isUserOwner: PropTypes.bool,
  message: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteMessage: PropTypes.func.isRequired,
};

export default AnnouncementMessage;
