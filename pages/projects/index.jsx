import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useEffectOnce } from 'react-use';
import { getNormalizedProjects } from '@app/actions/schema';
import { getUserProjectsService } from '@app/services';
import { signInUserSuccess } from '@app/reducers/authReducer';
import { retrieveUserProjectsSuccess } from '@app/reducers/projectsReducer';
import { getCookieToken } from '@app/utils';
import { LayoutManager, Head } from '@app/components';
import ProjectsScreen from '@app/screens/Home';

export async function getServerSideProps({ req }) {
  const token = getCookieToken(req);
  let projects = null;

  try {
    if (!token) {
      return {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      };
    }

    ({ data: projects } = await getUserProjectsService(token));
  } catch (error) {
    if (error.status === 403) {
      // return {
      //   redirect: {
      //     destination: '/signin',
      //     permanent: false,
      //   },
      // };
    }
  }

  return {
    props: { token, projects },
  };
}

export default function Projects({ token, projects }) {
  const dispatch = useDispatch();

  useEffectOnce(() => {
    if (token && token.length) {
      dispatch({ type: signInUserSuccess, payload: token });
    }

    if (projects) {
      const normalizedProjects = getNormalizedProjects(projects.data);

      dispatch({
        type: retrieveUserProjectsSuccess,
        payload: { ...normalizedProjects, meta: projects.meta },
      });
    }
  });

  return (
    <LayoutManager showSidebar>
      <Head title="Projects" />
      <ProjectsScreen />
    </LayoutManager>
  );
}

Projects.defaultProps = {
  token: undefined,
  projects: undefined,
};

Projects.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string]),
  projects: PropTypes.oneOfType(),
};
