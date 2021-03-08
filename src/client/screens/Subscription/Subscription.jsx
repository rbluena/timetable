import { useRouter } from 'next/router';
import { Header } from '@app/components';
import Upgrade from './Upgrade';
// import Payment from './Payment';
import Payment from './Payment';

const Settings = () => {
  const router = useRouter();

  return (
    <div className="w-full">
      <Header />
      <div className="bg-white mx-auto max-w-6xl mt-4 shadow-sm rounded p-4">
        {router.pathname === '/projects/[id]/payment' && <Payment />}

        {router.pathname === '/projects/[id]/subscribe' && <Upgrade />}
      </div>
    </div>
  );
};

export default Settings;
