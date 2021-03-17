import PropTypes from 'prop-types';
import Link from 'next/link';

const ProjectCard = ({ project }) => (
  <div className="transition-shadow duration-150 m-2 w-64 bg-white shadow hover:shadow-xl">
    <Link href={`/projects/${project._id}`}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="flex flex-col items-center justify-center p-8">
        <div className="h-20 w-20 rounded-full border-2 mb-4 border-primary-500 flex items-center justify-center text-xl text-primary-500  font-light">
          {project.code}
        </div>
        <h2 className="mx-auto font-bold text-md text-center text-neutral-400">
          {project.title}
        </h2>
        <p className="text-neutral-500 mt-4 font-bold">Account Name</p>
      </a>
    </Link>
  </div>
);

ProjectCard.propTypes = {
  project: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default ProjectCard;
