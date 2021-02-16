import { useState } from 'react';
import { Header, ToggleSwitch, AvatarList } from '@app/components';

const CanvasContainer = () => {
  const [toggle, setToggle] = useState('about');

  return (
    <div className="w-full h-screen">
      <Header />
      <div>
        <div className="absolute bottom-4 flex ml-4">
          <ToggleSwitch
            options={[
              { label: 'About', value: 'about' },
              { label: 'Timeline', value: 'timeline' },
              { label: 'Calendar', value: 'calendar' },
            ]}
            value={toggle}
            onChange={(evt) => setToggle(evt.target.value)}
          />

          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasContainer;
