import React, { useEffect } from 'react';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { verifyUserService } from '@app/services';
import { LayoutManager, Head } from '@app/components';
import { setNotificationAction } from '@app/actions';
import VerificationPage from '@app/screens/VerificationPage';

export async function getServerSideProps({ params }) {
  let verified = false;
  const error = null;
  try {
    const { token: verificationToken } = params;

    if (!verificationToken) {
      return {
        notFound: true,
      };
    }

    const response = await verifyUserService(verificationToken);

    if (response) {
      verified = true;
    }
  } catch (err) {
    // error = err;
  }

  return {
    props: {
      verified,
      error,
    },
  };
}

const Verification = ({ verified, error }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (verified) {
      dispatch(
        setNotificationAction({
          type: 'success',
          message:
            'Your account has been verified. You can continue with login.',
        })
      );
    }

    if (error) {
      dispatch(
        setNotificationAction({
          type: 'error',
          message:
            'Verification failed. Please request new verification token.',
        })
      );
    }
  }, [error, verified, dispatch]);

  if (process.browser && verified) {
    Router.push('/signin');
    return null;
  }

  return (
    <LayoutManager authenticated={false}>
      <Head title="Verify" />
      {/* <Header /> */}
      <VerificationPage />
      {/* <Footer /> */}
    </LayoutManager>
  );
};

Verification.defaultProps = {
  error: {},
};

Verification.propTypes = {
  verified: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.any)]),
};

export default Verification;
