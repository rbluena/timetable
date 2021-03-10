import PropTypes from 'prop-types';
import { LayoutManager } from '@app/components';
import SubscriptionScreen from '@app/screens/Subscription';
import Stripe from 'stripe';

export default function Subscribe({ prices }) {
  return (
    <LayoutManager>
      <SubscriptionScreen weeklyPrice={prices[0]} monthlyPrice={prices[1]} />
    </LayoutManager>
  );
}

Subscribe.defaultProps = {
  prices: {},
};

Subscribe.propTypes = {
  prices: PropTypes.objectOf(PropTypes.any),
};

export const getServerSideProps = async () => {
  let prices = null;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });

    prices = await stripe.prices.list({
      active: true,
      limit: 2,
      product: 'prod_J5CBh0QXYVVld1',
      expand: ['data.tiers'],
    });
  } catch (error) {
    console.log(error);
  }

  return {
    props: { prices: prices ? prices.data : {} },
  };
};
