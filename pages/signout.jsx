import { useDispatch } from 'react-redux';
import { signUserOutAction } from '@app/actions';
import { useEffectOnce } from 'react-use';

const Signout = () => {
  const dispatch = useDispatch();

  useEffectOnce(() => {
    dispatch(signUserOutAction());
  });

  return null;
};

export default Signout;
