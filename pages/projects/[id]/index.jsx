import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useEffectOnce } from 'react-use';
import { createProjectSuccess } from '@app/reducers/projectsReducer';
import { getProjectService } from '@app/services';
import { LayoutManager } from '@app/components';
import ViewProject from '@app/screens/ViewProject';

export async function getServerSideProps({ params }) {
  let project = null;
  const { id } = params;

  try {
    ({ data: project } = await getProjectService(id));

    // if (!project.isAuthorizedToView) {
    //   return {
    //     notFound: true,
    //   };
    // }
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: { project },
  };
}

export default function Project({ project }) {
  const dispatch = useDispatch();

  useEffectOnce(() => {
    dispatch({
      type: createProjectSuccess,
      payload: project,
    });
  });

  return (
    <LayoutManager showSidebar>
      <ViewProject />
    </LayoutManager>
  );
}

Project.defaultProps = {
  project: undefined,
};

Project.propTypes = {
  project: PropTypes.objectOf(PropTypes.any),
};
