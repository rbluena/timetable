import React from 'react';
import Link from 'next/link';
import { Button } from '@app/components';

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

    {/* start: Organizers */}
    <div className="py-6">
      <div className="text-2xl">
        <span className="text-success-600">Organizers</span>&nbsp;
        <span className="text-neutral-500 font-bold">0</span>
      </div>
      <Button
        variant="text-button"
        className="text-success-600 hover:underline"
      >
        +&nbsp;Add
      </Button>
    </div>
    {/* end: Organizers */}

    {/* start: Member */}
    <div className="py-6">
      <div className="text-2xl">
        <span className="text-success-600">Members</span>&nbsp;
        <span className="text-neutral-500 font-bold">0</span>
      </div>
      <Button
        variant="text-button"
        className="text-success-600 hover:underline"
      >
        +&nbsp;Add
      </Button>
    </div>
    {/* end: Member */}

    <Link href="/projects/3939943/edit">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className=" absolute top-2 right-2 rounded px-4 py-2 font-bold bg-secondary-600 text-white p-1 hover:bg-primary-500">
        Edit
      </a>
    </Link>
  </div>
);

export default AboutContainer;
