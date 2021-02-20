import { useRouter } from 'next/router';
import { Header, ToggleSwitch } from '@app/components';
import Content from './Content';

const CanvasContainer = () => {
  const router = useRouter();
  const { pathname } = router;
  const id = 389898983;

  let view = 'about';
  let showTimer = false;

  if (pathname === '/projects/[id]/timeline') {
    view = 'timeline';
  }

  if (pathname === '/projects/[id]/board') {
    view = 'board';
    showTimer = true;
  }

  if (pathname === '/projects/[id]/calendar') {
    view = 'calendar';
    showTimer = true;
  }

  function changeProjectView(evt) {
    const { value } = evt.target;

    if (value === 'about') {
      router.push(`/projects/${id}`);
    } else {
      router.push(`/projects/${id}/${value}`);
    }
  }

  return (
    <div className="w-full">
      <Header showTimer={showTimer} heading="BSc and Mathematics" />

      {/* START: CONTENT */}
      <Content view={view} />
      {/* END: CONTENT */}

      {/* start: FOOTER */}
      <div className="mx-2 bottom-1 flex flex-wrap justify-between fixed">
        <ToggleSwitch
          options={[
            { label: 'About', value: 'about' },
            { label: 'Timeline', value: 'timeline' },
            { label: 'Calendar', value: 'calendar' },
            { label: 'Board', value: 'board' },
          ]}
          value={view || 'about'}
          onChange={changeProjectView}
        />
      </div>
      {/* END: FOOTER */}
    </div>
  );
};

export default CanvasContainer;
