import { useRouter } from 'next/router';
import { Tabs } from 'antd';
import { AuthHeader } from '@app/components';
import Profile from './Profile';

const { TabPane } = Tabs;

const Settings = () => {
  const router = useRouter();

  function tabChangeHandler(value) {
    router.push(value);
  }

  return (
    <div className="w-full">
      <AuthHeader />
      <div className="mx-auto max-w-6xl shadow-sm bg-white rounded p-4 pl-6">
        <Tabs
          defaultActiveKey={router.pathname}
          activeKey={router.pathname}
          size="large"
          onChange={tabChangeHandler}
        >
          <TabPane tab="Profile" key="/settings">
            {router.pathname === '/settings' && <Profile />}
          </TabPane>
          <TabPane tab="Subscriptions" key="/settings/subscriptions">
            {router.pathname === '/settings/subscriptions' && (
              <h2>Subscriptions</h2>
            )}
          </TabPane>
          <TabPane tab="Team" key="/settings/team">
            {router.pathname === '/settings/team' && <h2>Team</h2>}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
