import { Mentions, Affix } from 'antd';
import AnnouncementMessage from './AnnouncementMessage';

const AnnouncementsComponent = () => (
  <Affix className="ml-auto">
    <div
      className="bg-white shadow mr-auto rounded-md p-4 my-6 md:pl-8 md:ml-4 w-full md:w-72 md:my-0"
      style={{ height: '350px' }}
    >
      <h2 className="text-lg font-bold text-neutral-500 border-b border-primary-100">
        Notifications
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
    <div className="p-2 px-4 md:pr-0">
      <Mentions
        placeholder="Say something to members!"
        name="@rabii"
        style={{ height: '65px' }}
        className="shadow"
      />
    </div>
  </Affix>
);

export default AnnouncementsComponent;
