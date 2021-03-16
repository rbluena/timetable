import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Radio } from 'antd';
import { Button } from '@app/components';

const freeDescription = [
  'Personal project.',
  'Only 1 user.',
  '0 user groups.',
  'Agenda view.',
  'Time tracker.',
  'Calendar view.',
  'No board view.',
];

const premiumDescription = [
  'Team project.',
  'Unlimited users.',
  'Unlimited user groups.',
  'Agenda view.',
  'Time tracker.',
  'Calendar view.',
  'Board view.',
];

const Price = ({
  weeklyPrice: weeklyStripePrice,
  monthlyPrice: monthlyStripePrice,
}) => {
  const [selectedPrice, setSelectedPrice] = useState('free');
  const [paymentOption, setPaymentOption] = useState('monthly');

  const router = useRouter();

  const freeActive =
    selectedPrice === 'free'
      ? 'bg-primary-400 text-white'
      : 'border-2 border-primary-400';
  const premiumPrice =
    selectedPrice === 'pro'
      ? 'bg-primary-400 text-white'
      : 'border-2 border-primary-400';

  function onProUpgradeSelected() {
    if (selectedPrice === 'pro' && monthlyStripePrice && weeklyStripePrice) {
      if (paymentOption === 'monthly') {
        localStorage.setItem(
          'subscription',
          JSON.stringify({
            selected: 'pro',
            priceId: monthlyStripePrice.id,
            cost: monthlyStripePrice.unit_amount,
            type: monthlyStripePrice.type,
            paymentOption,
            count: 1,
          })
        );
      } else {
        localStorage.setItem(
          'subscription',
          JSON.stringify({
            selected: 'pro',
            priceId: weeklyStripePrice.id,
            cost: weeklyStripePrice.unit_amount,
            type: weeklyStripePrice.type,
            paymentOption,
            count: 1,
          })
        );
      }

      router.push(`/projects/${445544}/payment`);
    }
  }

  return (
    <div className="pt-4">
      <div className="max-w-md mx-auto mb-12">
        <h2 className="text-3xl text-center text-primary-400 font-light">
          {paymentOption === 'monthly' ? 'Subscription' : 'Purchase'}
        </h2>
        {paymentOption === 'monthly' && (
          <p className="font-light text-neutral-400 text-center">
            This is monthly subscription per user per project. Each project is
            upgraded separately, and you are about to upgrade{' '}
            <span className="font-bold">Ashton Conference</span> project.
          </p>
        )}
        {paymentOption === 'weekly' && (
          <p className="font-light text-neutral-400 text-center">
            This is one-time payment for one week upgrade per user per project.
            Each project is upgraded separately, and you are about to upgrade{' '}
            <span className="font-bold">Ashton Conference</span> project.
          </p>
        )}
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mb-2">
          <Radio.Group
            defaultValue="monthly"
            value={paymentOption}
            buttonStyle="solid"
            onChange={(evt) => setPaymentOption(evt.target.value)}
          >
            <Radio.Button value="monthly">Monthly</Radio.Button>
            <Radio.Button value="weekly">Weekly</Radio.Button>
          </Radio.Group>
        </div>

        <div className="flex flex-wrap mx-auto">
          <div className="max-w-2xl flex-col justify-between md:mr-4">
            <button
              type="button"
              className={`${freeActive} p-4 h-24 w-full focus:outline-none rounded-md hover:bg-primary-400 hover:text-white mb-4`}
              onClick={() => setSelectedPrice('free')}
            >
              <div className="flex justify-between">
                <div className="text-lg font-bold">Free</div>
                <div className="text-lg font-bold">
                  <span>
                    {paymentOption === 'monthly' ? '$ 0 / Month' : '$ 0 / Week'}
                  </span>{' '}
                </div>
              </div>
            </button>
            <button
              type="button"
              className={`${premiumPrice} p-4 h-24 w-full focus:outline-none rounded-md hover:bg-primary-400 hover:text-white`}
              onClick={() => setSelectedPrice('pro')}
            >
              <div className="flex justify-between">
                <div className="text-lg font-bold">Pro</div>
                <div className="text-lg font-bold text-left">
                  <span>
                    {paymentOption === 'monthly'
                      ? `$ ${
                          monthlyStripePrice &&
                          (monthlyStripePrice.unit_amount / 100).toFixed(2)
                        } / Month`
                      : `$ ${
                          weeklyStripePrice &&
                          (weeklyStripePrice.unit_amount / 100).toFixed(2)
                        } / Week`}
                  </span>{' '}
                  <br /> Per User
                </div>
              </div>
            </button>
          </div>

          {/* start: price description */}
          <div className="bg-neutral-50 p-4" style={{ minWidth: '250px' }}>
            <div className={`${selectedPrice === 'free' ? '' : 'hidden'} pl-4`}>
              <ul>
                {freeDescription.map((item) => (
                  <li className="text-lg py-2 font-light">{item}</li>
                ))}
              </ul>
            </div>
            <div className={`${selectedPrice === 'pro' ? '' : 'hidden'} pl-4`}>
              <ul>
                {premiumDescription.map((item) => (
                  <li className="text-lg py-2 font-light">{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              {selectedPrice === 'free' ? (
                <Button variant="secondary" wide size="lg">
                  Free
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  wide
                  size="lg"
                  onClick={onProUpgradeSelected}
                >
                  Pro
                </Button>
              )}
            </div>
          </div>
          {/* end: price description */}
        </div>
      </div>
    </div>
  );
};

Price.defaultProps = {
  monthlyPrice: undefined,
  weeklyPrice: undefined,
};

Price.propTypes = {
  monthlyPrice: PropTypes.objectOf(PropTypes.any),
  weeklyPrice: PropTypes.objectOf(PropTypes.any),
};

export default Price;
