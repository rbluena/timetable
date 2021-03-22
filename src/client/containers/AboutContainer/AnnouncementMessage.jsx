import { Badge, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const AnnouncementMessage = () => {
  function deleteGroupHandler() {}
  return (
    <div className="pt-3 text-sm font-light">
      <div className="flex items-center">
        <span className="font-semibold italic">to:teachers </span>
        &nbsp;
        <Badge color="magenta" dot />
      </div>
      <div className="pt-1">
        These are some messages for{' '}
        <span className="lowercase text-secondary-400 font-semibold">
          @Teachers-group
        </span>{' '}
        to be appeared when someone write something about{' '}
        <span className="lowercase text-primary-400 font-semibold">
          #Physics
        </span>
        .
      </div>
      <div className="flex py-1 items-end">
        <span className="text-xs text-neutral-400 font-bold">
          Rabii - Mar 21
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
          <Button
            type="primary"
            size="small"
            // className="ml-auto"
            ghost
            onClick={() => deleteGroupHandler('group._id')}
          >
            <EditOutlined />
          </Button>
          &nbsp;
          <Button
            type="danger"
            size="small"
            ghost
            // className="ml-auto"
            onClick={() => deleteGroupHandler('group._id')}
          >
            <DeleteOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementMessage;
