import { LayoutManager } from '@app/components';
import ViewProject from '@app/screens/ViewProject';

export default function Board() {
  return (
    <LayoutManager showSidebar>
      <ViewProject />
    </LayoutManager>
  );
}
