import { acceptGroupInvitationService } from '@app/services';
import { getCookieToken } from '@app/utils';

export async function getServerSideProps({ params, query, req }) {
  try {
    const { id: projectId } = params;
    const { email, group_id: groupId } = query;

    const token = getCookieToken(req);

    if (!token) {
      return {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      };
    }

    const { data, meta } = await acceptGroupInvitationService(
      projectId,
      groupId,
      email,
      token
    );

    if (!meta.isUserExist) {
      return {
        redirect: {
          destination: '/signout',
          permanent: false,
        },
      };
    }

    if (data && meta.isUserExist) {
      return {
        redirect: {
          destination: `/projects/${data.project}`,
          permanent: false,
        },
      };
    }
  } catch (error) {
    if (error.status === 403) {
      return {
        redirect: {
          destination: '/signout',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
}
const adduser = () => null;

export default adduser;
