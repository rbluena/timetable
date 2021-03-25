import PropTypes from 'prop-types';
import Link from 'next/link';
import { Tag } from 'antd';

const ProjectCard = ({ project }) => (
  <div className="transition-shadow duration-150 m-2 w-64 bg-white shadow hover:shadow-xl">
    <Link href={`/projects/${project._id}`}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="flex flex-col items-center justify-center p-6">
        <div className="h-20 w-20 rounded-full border-2 mb-4 border-primary-500 flex items-center justify-center text-xl text-primary-500  font-light">
          {project.code}
        </div>
        <h2 className="mx-auto font-bold text-md text-center text-neutral-400">
          {project.title}
        </h2>
        <p className="text-neutral-500 mt-4 font-bold">
          {project.owner.accountName}
        </p>
      </a>
    </Link>
    <div className="p-2">
      {project.subscription ? (
        <Tag color="gold" size="large">
          {project.subscription.subscribedTo}
        </Tag>
      ) : (
        <Tag color="default" size="large">
          BASIC
        </Tag>
      )}
    </div>
  </div>
);

ProjectCard.propTypes = {
  project: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default ProjectCard;
