import PropTypes from 'prop-types';
import { useEffectOnce } from 'react-use';
import { LayoutManager, Head, Footer } from '@app/components';
import { useDispatch } from 'react-redux';
import { signInUserSuccess } from '@app/reducers/authReducer';
import { getCookieToken } from '@app/utils';
import IndexScreen from '@app/screens/Index';

export async function getServerSideProps({ req }) {
  const token = getCookieToken(req) || null;

  return {
    props: { token },
  };
}

const Index = ({ token }) => {
  const dispatch = useDispatch();

  useEffectOnce(() => {
    if (token && token.length) {
      dispatch({ type: signInUserSuccess, payload: token });
    }
  });

  return (
    <LayoutManager showSidebar>
      <Head title="Asteyo | Home" />
      <IndexScreen />
      <Footer />
    </LayoutManager>
  );
};

Index.defaultProps = {
  token: undefined,
};

Index.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string]),
};

export default Index;
