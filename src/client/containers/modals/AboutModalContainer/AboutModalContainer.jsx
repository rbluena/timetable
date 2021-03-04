import { Modal, Button } from 'antd';
import MembersContent from './MembersContent';
import CategoriesContent from './CategoriesContent';
import OrganizersContent from './OrganizersContent';

const AboutModalContainer = ({ modal, closeModal }) => {
  let title = '';
  let isOpen = false;

  if (modal === 'organizers') {
    title = 'Organizers';
    isOpen = true;
  }

  if (modal === 'members') {
    title = 'Members';
    isOpen = true;
  }

  if (modal === 'categories') {
    title = 'Categories';
    isOpen = true;
  }

  function onSubmit() {}

  function handleCancel() {
    closeModal();
  }

  return (
    <Modal
      visible={isOpen}
      title={title}
      onOk={handleCancel}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      {modal === 'members' && <MembersContent />}
      {modal === 'categories' && <CategoriesContent />}
      {modal === 'organizers' && <OrganizersContent />}
    </Modal>
  );
};

export default AboutModalContainer;
