import CreatePage from '@app/screens/Create';
import { LayoutManager, Head } from '@app/components';

const Create = () => (
  <LayoutManager showSidebar>
    <Head title="Create Project" />
    <CreatePage />
  </LayoutManager>
);

export default Create;
