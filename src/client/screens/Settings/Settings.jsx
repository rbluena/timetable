import { useRouter } from 'next/router';
import { Tabs } from 'antd';
import Profile from './Profile';
import Subscriptions from './Subscriptions';

const { TabPane } = Tabs;

const Settings = () => {
  const router = useRouter();

  function tabChangeHandler(value) {
    router.push(value);
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl shadow-sm bg-white rounded p-4 pl-6 min-h-screen">
        <Tabs
          defaultActiveKey={router.pathname}
          activeKey={router.pathname}
          size="large"
          onChange={tabChangeHandler}
        >
          <TabPane tab="Account" key="/settings">
            {router.pathname === '/settings' && <Profile />}
          </TabPane>
          <TabPane tab="Subscriptions" key="/settings/subscriptions">
            {router.pathname === '/settings/subscriptions' && <Subscriptions />}
          </TabPane>
          {/* <TabPane tab="Team" key="/settings/team">
            {router.pathname === '/settings/team' && <h2>Team</h2>}
          </TabPane>
          <TabPane tab="Releases" key="/settings/releases">
            {router.pathname === '/settings/releases' && <h2>Release Notes</h2>}
          </TabPane> */}
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
