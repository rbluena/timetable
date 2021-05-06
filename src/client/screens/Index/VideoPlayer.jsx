import { Modal } from 'antd';
import PropTypes from 'prop-types';

const VideoPlayer = ({ isOpen, closeModal }) => (
  <Modal visible={isOpen} onCancel={closeModal} footer={false}>
    <iframe
      title="Video"
      frameBorder="0"
      className="w-full"
      height="300px"
      src="https://biteable.com/watch/embed/2965129/c75d9692f1a6f3aaf3a23568c820dd07"
      allowFullScreen="true"
      allow="autoplay"
    >
      {' '}
    </iframe>{' '}
  </Modal>
);

VideoPlayer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default VideoPlayer;
