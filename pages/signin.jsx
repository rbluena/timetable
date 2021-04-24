import { getCookieToken } from '@app/utils';
import { LayoutManager, Head } from '@app/components';
import SigninScreen from '@app/screens/Signin';

const Signin = () => (
  <LayoutManager showSidebar>
    <Head title="Asteyo | Sign In" />
    <SigninScreen />
  </LayoutManager>
);

export default Signin;

export async function getServerSideProps({ req }) {
  const token = getCookieToken(req);

  if (token) {
    return {
      redirect: {
        destination: '/projects',
        permanent: false,
      },
    };
  }

  return { props: {} };
}
