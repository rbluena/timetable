import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useEffectOnce } from 'react-use';
import { signInUserSuccess } from '@app/reducers/authReducer';
import { getCookieToken } from '@app/utils';
import { LayoutManager, Head } from '@app/components';
import ProjectScreen from '@app/screens/Home';

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

export default function Projects({ token }) {
  const dispatch = useDispatch();

  useEffectOnce(() => {
    if (token && token.length) {
      dispatch({ type: signInUserSuccess, payload: token });
    }
  });

  return (
    <LayoutManager showSidebar>
      <Head title="Projects" />
      <ProjectScreen />
    </LayoutManager>
  );
}

Projects.defaultProps = {
  token: undefined,
};

Projects.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string]),
};
