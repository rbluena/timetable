import { useState } from 'react';
import { useRouter } from 'next/router';
import { InputNumber, Button } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from 'next-stripe/client';

const Payment = () => {
  const [numberOfUsers, setNumberOfUsers] = useState(1);
  const paymentInfo = process.browser
    ? JSON.parse(localStorage.getItem('subscription'))
    : {};

  const router = useRouter();

  console.log(router);

  async function checkoutProcessing() {
    try {
      const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY);

      const session = await createCheckoutSession({
        payment_method_types: ['card'],
        line_items: [
          {
            price: paymentInfo.priceId,
            quantity: numberOfUsers,
          },
        ],
        mode: paymentInfo.type === 'one_time' ? 'payment' : 'subscription',
        success_url: `${window.location.href}/?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: window.location.href,
      });

      if (stripe) {
        const response = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="pt-4">
      <div className="max-w-md mx-auto">
        {paymentInfo.paymentOption === 'weekly' && (
          <p className="text-lg font-light text-neutral-400 text-center">
            You are upgrading{' '}
            <span className="font-bold">Ashton Conference</span> project to pro
            for one week.
          </p>
        )}
        {paymentInfo.paymentOption === 'monthly' && (
          <p className="text-lg font-light text-neutral-400 text-center">
            You are upgrading{' '}
            <span className="font-bold">Ashton Conference</span> project to pro
            monthly basis.
          </p>
        )}
      </div>

      <div className="max-w-xs mx-auto text-center">
        <div className="py-4">
          <InputNumber
            defaultValue={1}
            min={1}
            value={numberOfUsers}
            onChange={(value) => setNumberOfUsers(value)}
            size="small"
            style={{ width: '45px' }}
          />
          &nbsp;&nbsp;
          <span className="text-neutral-400 font-bold">Number of users:</span>
        </div>

        <div className="">
          <div className="text-lg text-tertiary-500 font-bold py-4">
            Price is{' '}
            <span className="font-bold">
              $ {(paymentInfo.cost / 100).toFixed(2)}
            </span>{' '}
            / {paymentInfo.paymentOption === 'weekly' ? 'week' : 'month'} per
            user
          </div>

          <div className="py-4">
            <p className="text-lg text-primary-300">
              Total cost is{' '}
              {(
                paymentInfo.count *
                (paymentInfo.cost / 100).toFixed(2) *
                numberOfUsers
              ).toFixed(2)}
            </p>
          </div>
          <Button
            size="large"
            type="primary"
            ghost
            onClick={() => checkoutProcessing()}
          >
            Process the checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
