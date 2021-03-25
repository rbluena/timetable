import { useSelector } from 'react-redux';
import { LeftSidebar } from '@app/components';
import { authenticatedUserSelector } from '@app/selectors';

const LeftSidebarContainer = () => {
  const user = useSelector(authenticatedUserSelector);

  return <LeftSidebar user={user || {}} />;
};

export default LeftSidebarContainer;
