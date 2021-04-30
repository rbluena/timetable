import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@app/components/Icons';
import { Button } from 'antd';
// import { Button } from '@app/components';

const Drawer = ({ children, isOpen }) => (
  <aside
    className={`transition-all duration-300 ease-in-out transform max-w-sm overflow-y-auto bg-white ${
      isOpen ? '' : 'translate-x-full'
    } text-neutral-900 fixed right-0 top-0 shadow-2xl min-h-screen max-h-screen w-full md:w-96`}
    style={{ zIndex: 1000 }}
  >
    {children}
  </aside>
);

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

Drawer.Header = ({ children, onClose }) => (
  <div className="flex p-4">
    {children}
    <Button
      type="primary"
      size="small"
      className="ml-auto"
      onClick={onClose}
      ghost
    >
      <CloseIcon size="xs" />
    </Button>
  </div>
);

Drawer.Header.defaultProps = {
  children: null,
};

Drawer.Header.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

Drawer.Content = ({ children }) => <div className="h-full">{children}</div>;

Drawer.Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Drawer;
