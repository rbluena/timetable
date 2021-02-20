import React from 'react';
import { Button, ToggleSwitch } from '@app/components';

const freeDescription = [
  'Unlimited personal projects.',
  'Up to 3 team based projects.',
  'Team up to 2 organizers per project.',
  'Team up to 5 members per project.',
  'Unlimited public projects.',
  'Unlimited templates.',
  'Calendar view.',
  'Board view.',
];

const premiumDescription = [
  'Unlimited personal projects.',
  'Unlimited team organizers.',
  'Unlimited members.',
  'Unlimited public projects.',
  'Unlimited private projects.',
  'Unlimited templates.',
  'Calendar view.',
  'Board view.',
];

const Price = () => {
  const [selectedPrice, setSelectedPrice] = React.useState('free');
  const [paymentOption, setPaymentOption] = React.useState('monthly');

  const freeActive =
    selectedPrice === 'free'
      ? 'bg-primary-500 text-white'
      : 'border-2 border-primary-500';
  const premiumPrice =
    selectedPrice === 'premium'
      ? 'bg-primary-500 text-white'
      : 'border-2 border-primary-500';

  return (
    <div className="pt-4">
      <h2 className="text-4xl text-center mb-12">Upgrade</h2>

      <div className="mx-auto max-w-3xl">
        <div className="mb-2">
          <ToggleSwitch
            options={[
              { label: 'Monthly', value: 'monthly' },
              { label: 'Yearly', value: 'yearly' },
            ]}
            value={paymentOption}
            onChange={(evt) => setPaymentOption(evt.target.value)}
          />
        </div>
        <div className="flex flex-wrap">
          <div className="max-w-2xl flex-col justify-between md:mr-4">
            <button
              type="button"
              className={`${freeActive} p-4 h-24 w-full focus:outline-none rounded-md hover:bg-primary-500 hover:text-white mb-4`}
              onClick={() => setSelectedPrice('free')}
            >
              <div className="flex justify-between">
                <div className="text-lg font-bold">Free</div>
                <div className="text-lg font-bold">
                  <span>
                    {paymentOption === 'monthly' ? '$ 0 / Month' : '$ 0 / Year'}
                  </span>{' '}
                </div>
              </div>
            </button>
            <button
              type="button"
              className={`${premiumPrice} p-4 h-24 w-full focus:outline-none rounded-md hover:bg-primary-500 hover:text-white`}
              onClick={() => setSelectedPrice('premium')}
            >
              <div className="flex justify-between">
                <div className="text-lg font-bold">Premium</div>
                <div className="text-lg font-bold">
                  <span>
                    {paymentOption === 'monthly'
                      ? '$ 5 / Month'
                      : '$ 50 / Year'}
                  </span>{' '}
                  <br /> per user
                </div>
              </div>
            </button>
          </div>
          {/* start: price description */}
          <div className="bg-neutral-50 p-4">
            <div className={`${selectedPrice === 'free' ? '' : 'hidden'} pl-4`}>
              <ul>
                {freeDescription.map((item) => (
                  <li className="text-lg py-2 font-light">{item}</li>
                ))}
              </ul>
            </div>
            <div
              className={`${selectedPrice === 'premium' ? '' : 'hidden'} pl-4`}
            >
              <ul>
                {premiumDescription.map((item) => (
                  <li className="text-lg py-2 font-light">{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <Button variant="secondary" wide size="lg">
                Select
              </Button>
            </div>
          </div>
          {/* end: price description */}
        </div>
      </div>
    </div>
  );
};

export default Price;
