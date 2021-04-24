import { Modal } from 'antd';
import ReactPlayer from 'react-player/youtube';
import PropTypes from 'prop-types';

const VideoPlayer = ({ isOpen, closeModal }) => (
  <Modal visible={isOpen} onCancel={closeModal} footer={false} width="940px">
    <div className="w-full">
      <ReactPlayer
        width="100%"
        stopOnUnmount
        url="https://youtu.be/gwUz3E9AW0w"
        controls={false}
      />
    </div>
  </Modal>
);

VideoPlayer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default VideoPlayer;
