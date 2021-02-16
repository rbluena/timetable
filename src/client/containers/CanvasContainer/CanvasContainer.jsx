import { useRouter } from 'next/router';
import { Header, ToggleSwitch, AvatarList, Text } from '@app/components';
import Content from './Content';

const CanvasContainer = () => {
  const router = useRouter();
  const { pathname, query } = router;

  let view = 'about';

  if (pathname === '/projects/[id]/timeline') {
    view = 'timeline';
  }

  if (pathname === '/projects/[id]/board') {
    view = 'board';
  }

  if (pathname === '/projects/[id]/calendar') {
    view = 'calendar';
  }

  function changeProjectView(evt) {
    const { value } = evt.target;

    if (value === 'about') {
      router.push(`/projects/${query.id}`);
    } else {
      router.push(`/projects/${query.id}/${value}`);
    }
  }

  return (
    <div className="w-full h-screen">
      <Header showTimer heading="BSc and Mathematics" />

      {/* START: CONTENT */}
      <Content view={view} />
      {/* END: CONTENT */}

      {/* start: FOOTER */}
      <div className="absolute bottom-4 flex flex-wrap justify-between my-4">
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

        {/* start: Organizers section */}
        <div className="flex flex-wrap items-center ml-0 md:ml-8">
          <AvatarList
            images={[
              { initials: 'RL' },
              {
                src:
                  'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                alt: 'Rabii Luena',
              },
              { initials: 'AL' },
            ]}
            size="lg"
          />

          <div className="flex ml-4">
            <Text
              text="Organizers"
              variant="primary"
              type="subheading"
              className="font-bold"
            />
            &nbsp; &nbsp;
            <Text
              type="subheading"
              variant="neutral"
              text="3"
              className="font-bold"
            />
          </div>
        </div>
        {/* end: organizers section */}

        {/* start: Members section */}
        <div className="flex flex-wrap items-center ml-0 md:ml-8">
          <AvatarList
            images={[
              { initials: 'RL' },
              {
                src:
                  'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                alt: 'Rabii Luena',
              },
              { initials: 'AL' },
            ]}
            size="lg"
          />

          <div className="flex ml-4">
            <Text
              text="Members"
              variant="primary"
              type="subheading"
              className="font-bold"
            />
            &nbsp; &nbsp;
            <Text
              type="subheading"
              variant="neutral"
              text="3"
              className="font-bold"
            />
          </div>
        </div>
        {/* end: Members section */}
      </div>
      {/* END: FOOTER */}
    </div>
  );
};

export default CanvasContainer;
