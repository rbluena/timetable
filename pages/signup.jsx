import { getCookieToken } from '@app/utils';
import { LayoutManager, Head } from '@app/components';
import SignupScreen from '@app/screens/Signup';

const Signup = () => (
  <LayoutManager authenticated={false}>
    <Head title="Asteyo | Sign Up" />
    <SignupScreen />
  </LayoutManager>
);

export default Signup;

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
