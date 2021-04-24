import { useDispatch } from 'react-redux';
import { signUserOutAction } from '@app/actions';
import { useEffectOnce } from 'react-use';
import { Head } from '@app/components';

const Signout = () => {
  const dispatch = useDispatch();

  useEffectOnce(() => {
    dispatch(signUserOutAction());
  });

  return (
    <>
      <Head title="Signing out..." />
    </>
  );
};

export default Signout;
