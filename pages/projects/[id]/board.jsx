import PropTypes from 'prop-types'
import { LayoutManager } from '@app/components';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { getCookieToken } from '@app/utils';
import { signInUserSuccess } from '@app/reducers/authReducer';
import { setCurrentProject } from '@app/reducers/projectsReducer';
import { setProjectStatuses } from '@app/reducers/statusesReducer';
import { getProjectBacklogSuccess } from '@app/reducers/tasksReducer';
import {
  getNormalizedProject,
  getNormalizedStatues,
  getNormalizedBacklog,
} from '@app/actions/schema';

import {
  getProjectService,
  getProjectStatusesService,
  // getTasksByStatusService,
  getProjectTasksService,
} from '@app/services';

import { useEffectOnce } from 'react-use';

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

  const { id } = params;
  const token = getCookieToken(req);

  try {
    ({ data: project } = await getProjectService(id));
    ({ data: statuses } = await getProjectStatusesService(id));
    ({ data: backlogData, meta: backlogMeta } = await getProjectTasksService(
      id,
      {
        status: null,
      }
    ));
    // ({ data: boardsTasks } = await getTasksByStatusService(id));
  } catch (error) {
    // console.log(error);
  }

  return {
    props: {
      project,
      statuses,
      backlogData,
      backlogMeta,
      token: token || null,
    },
  };
}

export default function Board({
  project,
  statuses,
  backlogData,
  backlogMeta,
  token,
}) {
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

    if (statuses) {
      const normalizedStatuses = getNormalizedStatues(statuses);

        dispatch({
          type: setProjectStatuses,
          payload: normalizedStatuses,
        });
      }

      if (backlogData) {
        const normalizedBacklog = getNormalizedBacklog(backlogData);

        dispatch({
          type: getProjectBacklogSuccess,
          payload: {backlogData: normalizedBacklog, backlogMeta } ,
        });
      }
    });

    return (
      <LayoutManager showSidebar>
        <ViewProject />
      </LayoutManager>
    );
  }


  Board.defaultProps = {
    token: undefined,
    backlogMeta: {},
    backlogData: [],
    statuses: []
  }

  Board.propTypes = {
    token: PropTypes.string,
    project: PropTypes.objectOf(PropTypes.any).isRequired,
    backlogMeta: PropTypes.objectOf(PropTypes.any),
    backlogData: PropTypes.arrayOf(PropTypes.any),
    statuses: PropTypes.arrayOf(PropTypes)

  }
