import { LayoutManager } from '@app/components';
import dynamic from 'next/dynamic';

const ViewProject = dynamic(
  () => import('@app/screens/ViewProject').then((mod) => mod),
  { ssr: false }
);

export default function Board() {
  return (
    <LayoutManager showSidebar>
      <ViewProject />
    </LayoutManager>
  );
}
