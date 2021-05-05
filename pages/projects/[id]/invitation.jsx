import { get } from 'lodash';
import { message } from 'antd';
import { acceptGroupInvitationService } from '@app/services';
import { getCookieToken, deleteCookieToken } from '@app/utils';
import LayoutManager from '@app/components/LayoutManager';
import AcceptInvitationScreen from '@app/screens/AcceptInvitation';

export async function getServerSideProps({ params, query, req }) {
  let data = null;
  let respError = null;

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

    ({ data } = await acceptGroupInvitationService(
      projectId,
      groupId,
      email,
      token
    ));

    // Successfully user joined the group.
    if (data) {
      return {
        redirect: {
          destination: `/projects/${data.project}`,
          permanent: false,
        },
      };
    }
  } catch (error) {
    respError = error;

    if (respError.status === 403) {
      return {
        redirect: {
          destination: '/signout',
          permanent: false,
        },
      };
    }
    respError = get(error, 'errors.details');
  }

  return {
    props: {
      error: respError,
      data,
    },
  };
}
const adduser = ({ error, data }) => {
  console.log(error);
  console.log(data);

  if (error) {
    message.error(error);
  }

  return (
    <LayoutManager showSidebar>
      <AcceptInvitationScreen />
    </LayoutManager>
  );
};

export default adduser;
