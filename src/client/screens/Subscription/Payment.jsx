import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { InputNumber, Button, message } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from 'next-stripe/client';
import { Spin } from '@app/components';

const Payment = () => {
  const [numberOfUsers, setNumberOfUsers] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const paymentInfo = process.browser
    ? JSON.parse(localStorage.getItem('subscription'))
    : {};

  const router = useRouter();
  const { query } = router;

  /**
   * Processing the checkout
   */
  async function checkoutProcessing() {
    try {
      setIsLoading(true);

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
        success_url: `${window.location.href}/?session_id={CHECKOUT_SESSION_ID}&checkout_session_completed=true`,
        cancel_url: `${window.location.href}/?checkout_session_completed=false`,
      });

      if (stripe) {
        await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      }

      setIsLoading(false);
    } catch (errors) {
      message.error(errors.message);
      setIsLoading(false);
    }
  }

  if (query.checkout_session_completed) {
    return (
      <div className="py-6">
        <h2 className="text-2xl text-center text-tertiary-400">
          Thank you for the upgrade.
        </h2>
        <br />
        {paymentInfo.paymentOption === 'weekly' ? (
          <p className="text-base text-neutral-400 text-center">
            You have successfully upgraded{' '}
            <span className="font-bold">Ashton Conference</span> to{' '}
            <span className="font-bold">pro</span> for one week. <br />
            Please continue enjoying our service.
          </p>
        ) : (
          <p className="text-base text-neutral-400 text-center">
            You have successfully upgraded{' '}
            <span className="font-bold">Ashton Conference</span> to{' '}
            <span className="font-bold">pro</span> in monthly subscription.{' '}
            <br />
            Please continue enjoying our service.
          </p>
        )}

        <div className="text-center py-8">
          <Link href="/projects/445544/">
            <Button size="large" type="primary" ghost>
              View project
            </Button>
          </Link>
        </div>
      </div>
    );
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
            monthly subscription.
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
            <p className="text-lg text-primary-400 font-bold">
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
            {isLoading && (
              <>
                <Spin />
                &nbsp;
              </>
            )}
            Process the checkout
          </Button>
        </div>
        <p className="text-sm text-neutral-500 py-4">
          * Use your registered email address on stripe checkout form.
        </p>
      </div>
    </div>
  );
};

export default Payment;
