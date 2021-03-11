import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { upgradeProjectService } from '@app/services';
import { updateProjectSuccess } from '@app/reducers/projectsReducer';
import { LayoutManager } from '@app/components';
import SubscriptionScreen from '@app/screens/Subscription';

export default function Payment({ projectData }) {
  const dispatch = useDispatch();

  if (projectData) {
    dispatch({
      type: updateProjectSuccess,
      payload: projectData,
    });
  }

  return (
    <LayoutManager>
      <SubscriptionScreen />
    </LayoutManager>
  );
}

Payment.defaultProps = {
  projectData: undefined,
};

Payment.propTypes = {
  projectData: PropTypes.objectOf(PropTypes.any),
};

export const getServerSideProps = async ({ params, query }) => {
  let projectData = null;

  try {
    const { id: projectId } = params;

    const {
      checkout_session_completed: checkoutSessionCompleted,
      session_id: stripeSessionId,
      price_id: stripePriceId,
    } = query;

    if (checkoutSessionCompleted && stripeSessionId && projectId) {
      const { data } = await upgradeProjectService(projectId, {
        stripeSessionId,
        stripePriceId,
      });
      projectData = data;
    }
  } catch (error) {
    console.log(error);
    // TODO: Report to sentry
  }

  return {
    props: { project: projectData },
  };
};
