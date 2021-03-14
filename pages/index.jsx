import { LayoutManager, Head } from '@app/components';

const Index = () => (
  <LayoutManager authenticated={false}>
    <Head title="Asteyo | Home" />
    <h2>This is home page.</h2>
  </LayoutManager>
);

export default Index;
