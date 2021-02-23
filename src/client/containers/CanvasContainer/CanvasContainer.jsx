import { useRouter } from 'next/router';
import { Header } from '@app/components';
import { Radio } from 'antd';
import Content from './Content';

const CanvasContainer = () => {
  const router = useRouter();
  const { pathname } = router;
  const id = 389898983;

  let view = 'about';
  let showTimer = false;

  if (pathname === '/projects/[id]/agenda') {
    view = 'agenda';
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
      <div className="mx-2 bottom-2 flex flex-wrap justify-between fixed">
        <Radio.Group
          defaultValue="about"
          value={view}
          buttonStyle="solid"
          onChange={changeProjectView}
        >
          <Radio.Button value="about">About</Radio.Button>
          <Radio.Button value="agenda">Agenda</Radio.Button>
          <Radio.Button value="calendar">Calendar</Radio.Button>
          <Radio.Button value="board">Board</Radio.Button>
        </Radio.Group>
      </div>
      {/* END: FOOTER */}
    </div>
  );
};

export default CanvasContainer;
