/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { PlusIcon } from '@app/components/Icons';

const NewProjectLink = () => (
  <div className="transition-shadow duration-150 m-2 w-64 border border-dashed border-primary-200 hover:shadow-xl">
    <Link href="/projects/create">
      <a>
        <div className="flex flex-col h-full justify-center items-center p-8">
          <PlusIcon size="lg" />
          <p className="text-base font-normal">New project</p>
        </div>
      </a>
    </Link>
  </div>
);

export default NewProjectLink;
