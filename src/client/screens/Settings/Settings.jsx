import { Header } from '@app/components';
import Upgrade from './Upgrade';

const Settings = () => (
  <div className="w-full">
    <Header />
    <div className="bg-white mx-auto max-w-6xl mt-4 shadow-sm rounded p-4">
      <Upgrade />
    </div>
  </div>
);

export default Settings;
