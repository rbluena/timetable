import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { inviteUserAction, removeUserFromGroupAction } from '@app/actions';
import UsersComponent from './UsersComponent';
import InviteForm from './InviteForm';

const UsersModalContainer = ({ isOpen, closeModal, group, isUserOwner }) => {
  const dispatch = useDispatch();

  function inviteUser(data) {
    dispatch(inviteUserAction(group.project, group._id, data));
  }

  function removeUserFromGroup(id, type) {
    dispatch(removeUserFromGroupAction(group.project, group._id, id, type));
  }

  return (
    <Modal
      visible={isOpen}
      title={group.name}
      footer={false}
      className="z-50"
      onCancel={closeModal}
    >
      {isUserOwner && (
        <InviteForm inviteUser={inviteUser} projectId={group.project} />
      )}
      <UsersComponent
        members={group.members || []}
        invitees={group.invitees || []}
        isUserOwner={isUserOwner}
        removeUserFromGroup={removeUserFromGroup}
      />
    </Modal>
  );
};

UsersModalContainer.defaultProps = {
  group: {},
  isUserOwner: false,
};

UsersModalContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  group: PropTypes.objectOf(PropTypes.any),
  isOpen: PropTypes.bool.isRequired,
  isUserOwner: PropTypes.bool,
};

export default UsersModalContainer;
