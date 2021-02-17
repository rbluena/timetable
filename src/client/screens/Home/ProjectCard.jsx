import PropTypes from 'prop-types';
import Link from 'next/link';

const ProjectCard = ({ title, code, type }) => (
  <div className="transition-shadow duration-150 p-4 shadow-md m-2 w-72 bg-white hover:shadow-xl py-8">
    <Link href="/projects/948885">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="flex flex-col items-center justify-center">
        <div className="h-20 w-20 rounded-full border-2 mb-4 border-primary-500 flex items-center justify-center text-xl text-primary-500  font-light">
          {code}
        </div>
        <h2 className="mx-auto font-bold text-md">{title}</h2>
        <p className="text-neutral-500 mt-4">{type}</p>
      </a>
    </Link>
  </div>
);

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ProjectCard;
