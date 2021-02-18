import { ToggleSwitch } from '@app/components';

const Content = () => (
  <div className="bg-white mx-auto max-w-4xl mt-4 shadow-sm rounded p-4">
    Creating something useful.
    <ToggleSwitch
      options={[
        { label: 'Public', value: 'public' },
        { label: 'Private', value: 'Private' },
      ]}
      value="public"
    />
  </div>
);

export default Content;
