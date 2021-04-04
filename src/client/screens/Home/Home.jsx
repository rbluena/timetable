/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSelector } from 'react-redux';
import { ProjectList } from '@app/components';
import { projectsSelector } from '@app/selectors';
import NewProjectLink from './NewProjectLink';
import ProjectCard from './ProjectCard';

const Home = () => {
  const { result, projects } = useSelector(projectsSelector);

  return (
    <div className="w-full">
      <h2 className="text-3xl font-light text-center text-primary-400 py-8">
        Projects
      </h2>

      <ProjectList>
        <NewProjectLink />

        {result &&
          result.length > 0 &&
          result.map((projectKey) => (
            <ProjectCard key={projectKey} project={projects[projectKey]} />
          ))}
      </ProjectList>
    </div>
  );
};

export default Home;
