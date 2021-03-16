import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useEffectOnce } from 'react-use';
import { signInUserSuccess } from '@app/reducers/authReducer';
import { getCookieToken } from '@app/utils';
import { setCurrentProject } from '@app/reducers/projectsReducer';
import { getProjectService } from '@app/services';
import { LayoutManager } from '@app/components';
import ViewProject from '@app/screens/ViewProject';
import { getNormalizedProject } from '@app/actions/schema';

export async function getServerSideProps({ params, req }) {
  let project = null;
  const { id } = params;
  const token = getCookieToken(req);

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
    props: { project, token: token || null },
  };
}

export default function Project({ project, token }) {
  const dispatch = useDispatch();

  useEffectOnce(() => {
    if (token && token.length) {
      dispatch({ type: signInUserSuccess, payload: token });
    }

    if (project) {
      const normalizedProject = getNormalizedProject(project);
      dispatch({
        type: setCurrentProject,
        payload: normalizedProject,
      });
    }
  });

  return (
    <LayoutManager>
      <ViewProject />
    </LayoutManager>
  );
}

Project.defaultProps = {
  project: undefined,
  token: undefined,
};

Project.propTypes = {
  project: PropTypes.objectOf(PropTypes.any),
  token: PropTypes.string,
};
