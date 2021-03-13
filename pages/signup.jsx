import { LayoutManager } from '@app/components';
import SignupScreen from '@app/screens/Signup';

const Signin = () => (
  <LayoutManager authenticated={false}>
    <SignupScreen />
  </LayoutManager>
);

export default Signin;
