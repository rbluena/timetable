import { Modal, Button } from 'antd';

export default ({ modal, closeModal }) => {
  let title = '';

  if (modal === 'organizers') {
    title = 'Organizers';
  }

  if (modal === 'members') {
    title = 'Members';
  }

  if (modal === 'categories') {
    title = 'Categories';
  }

  function onSubmit() {}

  function handleCancel() {
    closeModal();
  }

  return (
    <Modal
      visible={modal !== null}
      title={title}
      onOk={handleCancel}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          // loading={loading}
          onClick={onSubmit}
        >
          Submit
        </Button>,
      ]}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};
