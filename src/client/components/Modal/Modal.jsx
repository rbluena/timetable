import React from 'react';
import PropTypes from 'prop-types';
import ModalWrapper from 'react-modal';
import { Button } from '@app/components';
import { CloseIcon } from '@app/components/Icons';

const Modal = ({ children, onClose, isOpen, contentLabel }) => (
  <ModalWrapper
    className="w-full absolute z-100 flex items-center justify-center min-h-screen p-2"
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel={contentLabel}
    ariaHideApp={false}
    shouldFocusAfterRender
    shouldCloseOnOverlayClick
    shouldCloseOnEsc
    shouldReturnFocusAfterClose
    data={{ background: 'black' }}
  >
    <div
      className=" w-full md:max-w-lg inline-block align-bottom bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle"
      role="dialog"
      aria-modal={isOpen}
      aria-labelledby="modal-headline"
    >
      {children}
    </div>
  </ModalWrapper>
);

Modal.defaultProps = {
  isOpen: false,
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  contentLabel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
};

Modal.Header = ({ heading, onClose }) => (
  <div className="p-2 flex">
    {heading.length > 0 && <h2 className=" h-2 font-semibold">{heading}</h2>}
    <Button
      variant="primary"
      className="ml-auto"
      size="sm"
      outline
      onClick={onClose}
    >
      <CloseIcon size="sm" />
    </Button>
  </div>
);

Modal.Header.defaultProps = {
  heading: '',
};

Modal.Header.propTypes = {
  heading: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

Modal.Content = ({ children }) => <div className="px-4">{children}</div>;

Modal.Content.propTypes = {
  children: PropTypes.node.isRequired,
};

Modal.Footer = ({ children }) => (
  <div className="bg-gray-100 px-4 py-3 sm:px-6 flex">{children}</div>
);

Modal.Footer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
