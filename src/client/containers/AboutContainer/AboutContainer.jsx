import React from 'react';
import { Button, ToggleSwitch, Text } from '@app/components';
import Organizers from './Organizers';
import Members from './Members';

const AboutContainer = () => (
  <div className="bg-white mx-auto max-w-4xl my-4 shadow-sm rounded p-4 pb-8 relative">
    <h2 className="text-2xl py-6 text-neutral-800 font-secondary">
      Title of the project{' '}
    </h2>

    <div className="flex flex-col md:flex-row md:flex-wrap">
      <div className="flex flex-col">
        <span className="font-bold text-lg text-success-600">Start</span>
        <span className="font-bold text-neutral-400">Feb 21, 2022</span>
      </div>
      <div className="flex flex-col ml-10">
        <span className="font-bold text-lg text-success-600">End</span>
        <span className="font-bold  text-neutral-400">Feb 21, 2022</span>
      </div>
    </div>

    <div className="text-lg text-neutral-800 py-6">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga laboriosam
      voluptas, eum aspernatur recusandae ipsam id, sint exercitationem totam
      quo magnam, magni delectus mollitia a dolorum. Reiciendis assumenda velit
      aut.
      <br />
    </div>

    <div className="py-2">
      <ToggleSwitch
        options={[
          { label: 'Private', value: 'private' },
          { label: 'Public', value: 'public' },
        ]}
        value="private"
      />
    </div>

    {/* start: Organizers */}
    <div className="py-6">
      <div className="text-xl font-bold mb-2">
        <span className="text-success-600">Organizers</span>&nbsp;
        <span className="text-neutral-500 font-bold">0</span>
      </div>
      {/*  */}
      <Organizers />
      {/*  */}
      <Button
        variant="text-button"
        className="text-success-600 hover:underline text-sm"
      >
        +&nbsp;Add
      </Button>
    </div>
    {/* end: Organizers */}

    {/* start: Member */}
    <div className="py-6">
      <div className="text-xl font-bold mb-2">
        <span className="text-success-600">Members</span>&nbsp;
        <span className="text-neutral-500 font-bold">0</span>
      </div>

      {/* start: members */}
      <Members />
      {/* end: members */}

      <Button
        variant="text-button"
        className="text-success-600 hover:underline text-sm"
      >
        +&nbsp;Add
      </Button>
    </div>
    {/* end: Member */}

    {/* start: Topics */}
    <div className="py-6">
      <div className="text-xl font-bold mb-2">
        <span className="text-success-600">Categories</span>&nbsp;
      </div>

      <ul className="flex">
        <li className="px-2">
          <Text weight="bold" variant="neutral" text="Physics" />
        </li>
        <li className="px-2">
          <Text weight="bold" variant="neutral" text="Chemistry" />
        </li>
        <li className="px-2">
          <Text weight="bold" variant="neutral" text="Mathematics" />
        </li>
        <li className="px-2">
          <Text weight="bold" variant="neutral" text="Geography" />
        </li>
      </ul>

      <Button
        variant="text-button"
        className="text-success-600 hover:underline text-sm"
      >
        +&nbsp;Add
      </Button>
    </div>
    {/* end: Member */}

    <button
      type="button"
      className=" absolute top-2 right-2 rounded px-4 py-2 font-bold bg-secondary-600 hover:bg-secondary-400 text-white p-1"
    >
      Edit
    </button>
  </div>
);

export default AboutContainer;
