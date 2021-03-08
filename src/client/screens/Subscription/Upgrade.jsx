import { useState } from 'react';
import { useRouter } from 'next/router';
import { Radio, InputNumber } from 'antd';
import { Button } from '@app/components';

const freeDescription = [
  'Personal project.',
  'Only 1 user.',
  'Agenda view.',
  'Timer.',
  'Calendar view.',
  'No board view.',
];

const premiumDescription = [
  'Team project.',
  'Unlimited users.',
  'Agenda view.',
  'Timer.',
  'Calendar view.',
  'Board view.',
];

const COSTS = {
  daily: 0.1,
  monthly: 2,
};

const Price = () => {
  const [selectedPrice, setSelectedPrice] = useState('free');
  const [paymentOption, setPaymentOption] = useState('monthly');
  const [numberOfMonths, setNumberOfMonths] = useState(1);
  const [numberOfDays, setNumberOfDays] = useState(1);

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
    if (selectedPrice === 'pro') {
      if (paymentOption === 'monthly') {
        localStorage.setItem(
          'paymentOptions',
          JSON.stringify({
            selected: 'pro',
            paymentOption,
            count: numberOfMonths,
          })
        );
      } else {
        localStorage.setItem(
          'paymentOptions',
          JSON.stringify({
            selected: 'pro',
            paymentOption,
            count: numberOfDays,
          })
        );
      }

      router.push(`/projects/${445544}/payment`);
    }
  }

  return (
    <div className="pt-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl text-center text-primary-400">Subscription</h2>
        <p className="text-lg font-light text-neutral-400 text-center">
          You are about to upgrade Ashton Conference project.
        </p>
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
            <Radio.Button value="daily">Daily</Radio.Button>
          </Radio.Group>
        </div>

        <div className="py-2">
          {selectedPrice === 'pro' && paymentOption === 'monthly' && (
            <InputNumber
              min={1}
              max={12}
              defaultValue={1}
              onChange={(value) => setNumberOfMonths(value)}
            />
          )}

          {selectedPrice === 'pro' && paymentOption === 'daily' && (
            <InputNumber
              min={1}
              max={15}
              defaultValue={1}
              onChange={(value) => setNumberOfDays(value)}
            />
          )}
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
                    {paymentOption === 'monthly' ? '$ 0 / Month' : '$ 0 / Day'}
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
                      ? `$ ${(COSTS.monthly * numberOfMonths).toFixed(
                          2
                        )} / Month`
                      : `$ ${(COSTS.daily * numberOfDays).toFixed(2)} / Day`}
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

export default Price;
