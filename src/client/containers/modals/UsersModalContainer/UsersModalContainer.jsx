import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { inviteUserAction, removeInvitationAction } from '@app/actions';
import UsersComponent from './UsersComponent';
import InviteForm from './InviteForm';

const UsersModalContainer = ({ isOpen, closeModal, group }) => {
  const dispatch = useDispatch();

  function inviteUser(data) {
    dispatch(inviteUserAction(group.project, group._id, data));
  }

  function removeInvitation(id) {
    dispatch(removeInvitationAction(group.project, group._id, id));
  }

  return (
    <Modal
      visible={isOpen}
      title={group.name}
      footer={false}
      className="z-50"
      onCancel={closeModal}
    >
      <InviteForm inviteUser={inviteUser} />
      <UsersComponent
        memberIds={group.members || {}}
        members={group.members || []}
        invitees={group.invitees || []}
        removeInvitation={removeInvitation}
      />
    </Modal>
  );
};

UsersModalContainer.defaultProps = {
  group: {},
};

UsersModalContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  group: PropTypes.objectOf(PropTypes.any),
  isOpen: PropTypes.bool.isRequired,
};

export default UsersModalContainer;
