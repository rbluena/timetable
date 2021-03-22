import { Mentions, Affix, Badge, Input } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import AnnouncementMessage from './AnnouncementMessage';

const AnnouncementsComponent = () => (
  <Affix className="">
    <div className="w-full md:w-72 md:ml-6 space-y-1">
      <div
        className="bg-white shadow mr-auto rounded-md p-4 my-6 md:pl-4  md:my-0 relative"
        style={{ height: '350px' }}
      >
        <h2 className="text-lg font-bold text-neutral-500 border-b border-primary-100 flex items-center">
          Notifications
          <div className="ml-auto">
            <Badge dot>
              <NotificationOutlined />
            </Badge>
          </div>
        </h2>
        <div
          className="overflow-y-auto py-2 divide-y divide-neutral-100 space-y-4"
          style={{ maxHeight: '280px' }}
        >
          <AnnouncementMessage />
          <AnnouncementMessage />
          <AnnouncementMessage />
        </div>
      </div>
      <div className="">
        <Input placeholder="to:" />
        <Mentions
          placeholder="Say something to members!"
          name="@rabii"
          style={{ height: '65px' }}
          className="shadow"
        />
      </div>
    </div>
  </Affix>
);

export default AnnouncementsComponent;
