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
import { LayoutManager, Head } from '@app/components';
import AccessProject from '@app/screens/AccessProject';

const ViewProject = dynamic(
  () => import('@app/screens/ViewProject').then((mod) => mod),
  { ssr: false }
);

export async function getServerSideProps({ params, req }) {
  let project = null;
  let data = null;
  let meta = null;
  let token;
  let passwordRequired = false;

  try {
    const { id } = params;
    token = getCookieToken(req);

    ({ data: project } = await getProjectService(id));
    ({ data, meta } = await getProjectTasksService(id, {
      from: subDays(new Date(), 2),
    }));

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
      data,
      meta,
      token: token || null,
    },
  };
}

export default function Agenda({
  passwordRequired,
  data,
  meta,
  token,
  project,
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

    if (data && meta) {
      dispatch(getAgendaTasksAction(data, meta));
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

Agenda.defaultProps = {
  data: [],
  meta: undefined,
  token: undefined,
};

Agenda.propTypes = {
  passwordRequired: PropTypes.bool.isRequired,
  token: PropTypes.string,
  project: PropTypes.objectOf(PropTypes.any).isRequired,
  meta: PropTypes.objectOf(PropTypes.any),
  data: PropTypes.arrayOf(PropTypes.any),
};
