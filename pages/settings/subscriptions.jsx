import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useEffectOnce } from 'react-use';
import { signInUserSuccess } from '@app/reducers/authReducer';
import { LayoutManager } from '@app/components';
import { getCookieToken } from '@app/utils';
import SettingsPage from '@app/screens/Settings';

export async function getServerSideProps({ req }) {
  const token = getCookieToken(req);

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { token },
  };
}

export default function Settings({ token }) {
  const dispatch = useDispatch();

  useEffectOnce(() => {
    if (token && token.length) {
      dispatch({ type: signInUserSuccess, payload: token });
    }
  });

  return (
    <LayoutManager showSidebar>
      <SettingsPage />
    </LayoutManager>
  );
}
