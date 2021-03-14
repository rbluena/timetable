/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { AuthHeader, ProjectList } from '@app/components';
import { projectsStateSelector } from '@app/selectors';
import { PlusIcon } from '@app/components/Icons';
import ProjectCard from './ProjectCard';

const Home = () => {
  const { data } = useSelector(projectsStateSelector);

  const keys = Object.keys(data);

  return (
    <div className="w-full">
      <AuthHeader />
      <div>
        <h2 className="text-3xl text-center text-primary-300 py-8">Projects</h2>

        <ProjectList>
          {keys &&
            keys.length > 0 &&
            keys.map((key) => {
              const project = data[key];

              return <ProjectCard key={project._id} project={project} />;
            })}
        </ProjectList>

        {/* start: create new project button */}
        <Link href="/projects/create">
          <a className="fixed top-16 right-4 md:right-8 rounded-full bg-primary-400 text-white p-2 hover:bg-primary-500">
            <PlusIcon />
          </a>
        </Link>
        {/* end: create new project button. */}
      </div>

      {/* start: new project */}
      {/* <Link href="/projects/create">
      <a className="absolute rounded-full bg-primary-500 text-white  w-28 h-28">
        <PlusIcon />
      </a>
    </Link> */}
      {/* end: new project */}
    </div>
  );
};

export default Home;
