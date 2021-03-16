import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Header } from '@app/components';
import Upgrade from './Upgrade';
import Payment from './Payment';

const Subscription = ({ weeklyPrice, monthlyPrice }) => {
  const router = useRouter();

  return (
    <div className="w-full">
      <Header />
      <div className="bg-white mx-auto max-w-6xl mt-4 shadow-sm rounded p-4">
        {router.pathname === '/projects/[id]/payment' && (
          <Payment weeklyPrice={weeklyPrice} monthlyPrice={monthlyPrice} />
        )}

        {router.pathname === '/projects/[id]/subscribe' && (
          <Upgrade weeklyPrice={weeklyPrice} monthlyPrice={monthlyPrice} />
        )}
      </div>
    </div>
  );
};

Subscription.propTypes = {
  weeklyPrice: PropTypes.objectOf(PropTypes.any).isRequired,
  monthlyPrice: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Subscription;
