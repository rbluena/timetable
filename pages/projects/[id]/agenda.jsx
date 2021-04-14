import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useEffectOnce } from 'react-use';
import dynamic from 'next/dynamic';
import { subDays } from 'date-fns';
import {
  getProjectService,
  // getProjectStatusesService,
  // getTasksByStatusService,
  getProjectTasksService,
} from '@app/services';
import { getCookieToken } from '@app/utils';
import { getAgendaTasksAction } from '@app/actions';
import { signInUserSuccess } from '@app/reducers/authReducer';
import { setCurrentProject } from '@app/reducers/projectsReducer';
import { getNormalizedProject } from '@app/actions/schema';
import { LayoutManager } from '@app/components';

const ViewProject = dynamic(
  () => import('@app/screens/ViewProject').then((mod) => mod),
  { ssr: false }
);

export async function getServerSideProps({ params, req }) {
  let project = null;
  let data = null;
  let meta = null;
  let token;

  try {
    const { id } = params;
    token = getCookieToken(req);

    ({ data: project } = await getProjectService(id));
    ({ data, meta } = await getProjectTasksService(id, {
      status: 'null',
      from: subDays(new Date(), 2),
    }));

    if (!project) {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    // TODO: LOG ERROR TO SENTRY
    // console.log(error);

    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
      data,
      meta,
      token: token || null,
    },
  };
}

export default function Agenda({ data, meta, token, project }) {
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

    if (data && meta) {
      dispatch(getAgendaTasksAction(data, meta));
    }
  });

  return (
    <LayoutManager showSidebar>
      <ViewProject />
    </LayoutManager>
  );
}

Agenda.defaultProps = {
  data: [],
  meta: undefined,
  token: undefined,
};

Agenda.propTypes = {
  token: PropTypes.string,
  project: PropTypes.objectOf(PropTypes.any).isRequired,
  meta: PropTypes.objectOf(PropTypes.any),
  data: PropTypes.arrayOf(PropTypes.any),
};
