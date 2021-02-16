import { useState } from 'react';
import { Header, ToggleSwitch } from '@app/components';

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
        </div>
      </div>
    </div>
  );
};

export default CanvasContainer;
