import { LayoutManager } from '@app/components';
import SigninScreen from '@app/screens/Signin';

const Signin = () => (
  <LayoutManager authenticated={false}>
    <SigninScreen />
  </LayoutManager>
);

export default Signin;
