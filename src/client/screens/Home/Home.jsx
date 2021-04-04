/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSelector, useDispatch } from 'react-redux';
import { deleteProjectAction } from '@app/actions';
import { projectsSelector } from '@app/selectors';
import { ProjectList } from '@app/components';
import NewProjectLink from './NewProjectLink';
import ProjectCard from './ProjectCard';

const Home = () => {
  const { projects } = useSelector(projectsSelector);
  const dispatch = useDispatch();

  /**
   * Deleting project
   * @param {String} projectId
   */
  function deleteProject(projectId) {
    dispatch(deleteProjectAction(projectId));
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl font-light text-center text-primary-400 py-8">
        Projects
      </h2>

      <ProjectList>
        <NewProjectLink />

        {projects &&
          projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              deleteProject={deleteProject}
            />
          ))}
      </ProjectList>
    </div>
  );
};

export default Home;
