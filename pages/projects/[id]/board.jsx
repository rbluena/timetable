import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { useEffectOnce } from 'react-use';
import { getCookieToken } from '@app/utils';
import { getBoardTasksAction } from '@app/actions';
import { signInUserSuccess } from '@app/reducers/authReducer';
import { setCurrentProject } from '@app/reducers/projectsReducer';
import { getNormalizedProject } from '@app/actions/schema';
import {
  getProjectService,
  getProjectStatusesService,
  // getTasksByStatusService,
  getProjectTasksService,
} from '@app/services';

import { LayoutManager, Head } from '@app/components';
import AccessProject from '@app/screens/AccessProject';

const ViewProject = dynamic(
  () => import('@app/screens/ViewProject').then((mod) => mod),
  { ssr: false }
);

/**
 * Getting server side props.
 */
export async function getServerSideProps({ params, req }) {
  let project = null;
  let statuses = null;
  let backlogData = null;
  let backlogMeta = null;
  let passwordRequired = false;

  const { id } = params;
  const token = getCookieToken(req);

  try {
    ({ data: project } = await getProjectService(id));
    ({ data: statuses } = await getProjectStatusesService(id));
    ({ data: backlogData, meta: backlogMeta } = await getProjectTasksService(
      id,
      {
        status: 'null',
      }
    ));

    if (!project) {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    // TODO: LOG ERROR TO SENTRY
    if (error.status === 403 && !error.protectedProjectAccess) {
      // Render password page.
      passwordRequired = true;
    } else {
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {
      passwordRequired,
      project,
      statuses,
      backlogData,
      backlogMeta,
      token: token || null,
    },
  };
}

export default function Board({
  passwordRequired,
  project,
  statuses,
  backlogData,
  backlogMeta,
  token,
}) {
  const dispatch = useDispatch();

  useEffectOnce(() => {
    // If user is signed in then set the token.
    if (token && token.length) {
      dispatch({ type: signInUserSuccess, payload: token });
    }

    // If project found then set the project
    if (project) {
      const normalizedProject = getNormalizedProject(project);

      dispatch({
        type: setCurrentProject,
        payload: normalizedProject,
      });
    }

    // If no error from the server
    if (statuses && backlogData) {
      dispatch(getBoardTasksAction(statuses, backlogData, backlogMeta));
    }
  });

  if (passwordRequired) {
    return (
      <LayoutManager>
        <AccessProject />
      </LayoutManager>
    );
  }

  return (
    <LayoutManager showSidebar>
      <Head title={project && project.title} />
      <ViewProject />
    </LayoutManager>
  );
}

Board.defaultProps = {
  backlogMeta: {},
  backlogData: undefined,
  statuses: undefined,
  token: undefined,
};

Board.propTypes = {
  passwordRequired: PropTypes.bool.isRequired,
  token: PropTypes.string,
  project: PropTypes.objectOf(PropTypes.any).isRequired,
  backlogMeta: PropTypes.objectOf(PropTypes.any),
  backlogData: PropTypes.arrayOf(PropTypes.any),
  statuses: PropTypes.arrayOf(PropTypes),
};
