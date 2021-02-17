import PropTypes from 'prop-types';

const ProjectList = ({ children }) => (
  <div className="flex flex-wrap justify-center max-w-4xl mx-auto p-2">
    {children}
  </div>
);

ProjectList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProjectList;
