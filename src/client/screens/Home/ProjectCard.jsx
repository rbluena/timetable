import PropTypes from 'prop-types';
import Link from 'next/link';
import {} from 'lodash';
import { Tag, Button, Tooltip } from 'antd';
import { DeleteOutlined, TeamOutlined } from '@ant-design/icons';

/**
 * Creating project.
 * @param {String} string
 */
function getCode(string = '') {
  const ignoreWords = ['of', 'for', 'and', 'the', 'in'];

  if (string && string.length) {
    return string
      .split(' ')
      .map((word) => (ignoreWords.includes(word.toLowerCase()) ? '' : word[0]))
      .join('')
      .slice(0, 4);
  }

  return string;
}

const ProjectCard = ({ project, deleteProject }) => (
  <div className="transition-shadow duration-150 m-2 w-64 bg-white shadow hover:shadow-xl relative flex-col items-end">
    <div className="flex justify-end m-0 p-0">
      {project.isUserOwner && (
        <Button
          className="absolute m-1"
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => deleteProject(project._id)}
        />
      )}
    </div>

    <Link href={`/projects/${project._id}`}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="flex flex-col items-center justify-center p-4">
        <div className="h-20 w-20 rounded-full border mb-2 border-primary-500 flex items-center justify-center text-xl text-primary-500 uppercase font-light">
          {getCode(project.title)}
        </div>
        <h2 className="mx-auto text-md font-normal text-center text-neutral-400">
          {project.title}
        </h2>
        <p className="text-neutral-500 font-bold">
          {project.owner.accountName}
        </p>
      </a>
    </Link>
    <div className="p-2 flex justify-between items-center self-stretch">
      {project.subscription ? (
        <Tag color="gold">{project.subscription.subscribedTo}</Tag>
      ) : (
        <Tag color="default">BASIC</Tag>
      )}
      <Tooltip title="Members">
        <span className="text-neutral-400 font-bold">
          <TeamOutlined />
          {project.team.length}
        </span>
      </Tooltip>
    </div>
  </div>
);

ProjectCard.propTypes = {
  project: PropTypes.objectOf(PropTypes.shape).isRequired,
  deleteProject: PropTypes.func.isRequired,
};

export default ProjectCard;
