import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useEffectOnce } from 'react-use';
import { signInUserSuccess } from '@app/reducers/authReducer';
import { getCookieToken } from '@app/utils';
import CreatePage from '@app/screens/Create';
import { LayoutManager, Head } from '@app/components';

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

const Create = ({ token }) => {
  const dispatch = useDispatch();

  useEffectOnce(() => {
    if (token && token.length) {
      dispatch({ type: signInUserSuccess, payload: token });
    }
  });

  return (
    <LayoutManager showSidebar>
      <Head title="Asteyo | Create project" />
      <CreatePage />
    </LayoutManager>
  );
};

Create.defaultProps = {
  token: undefined,
};

Create.propTypes = {
  token: PropTypes.string,
};

export default Create;
